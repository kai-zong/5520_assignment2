import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import InputList from '../components/InputList';
import DateInput from '../components/DateInput';
import PressableButton from '../components/PressableButton';
import { addItem, updateItem } from '../firebaseSetup/firebaseHelper';
import { color } from '../reusables';
import Checkbox from 'expo-checkbox';

export default function AddEditPage({ navigation, route }) {
  const [activity, setActivity] = useState(route.params.item ? route.params.item.Activity : '');
  const [duration, setDuration] = useState(route.params.item ? route.params.item.Duration : '');
  const [activityDate, setActivityDate] = useState(route.params.item ? new Date(route.params.item.Date.seconds * 1000) : null);
  const [description, setDescription] = useState(route.params.item ? route.params.item.Description : '');
  const [calories, setCalories] = useState(route.params.item ? route.params.item.Calories : '');
  const [dietDate, setDietDate] = useState(route.params.item ? new Date(route.params.item.Date.seconds * 1000) : null);
  const [collectionName, setCollectionName] = useState('');
  const [open, setOpen] = useState(false);
  const [special, setSpecial] = useState(route.params.item ? route.params.item.Special : false);
  const [activityItems, setActivityItems] = useState([
    { label: 'Running', value: 'running' },
    { label: 'Cycling', value: 'cycling' },
    { label: 'Swimming', value: 'swimming' },
    { label: 'Walking', value: 'walking' },
    { label: 'Weights', value: 'weights' },
    { label: 'Yoga', value: 'yoga' },
    { label: 'Hiking', value: 'hiking' }
  ]);

  const header = route.params.header;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: header,
    });
  }, [navigation, header]);

  useEffect(() => {
    if (header.includes('Activity')) {
      setCollectionName('activities');
    } else if (header.includes('Food') || header.includes('Diet')) {
      setCollectionName('diet');
    }
  }, [header]);

  const handleNumericChange = (setter) => (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setter(numericValue);
  };

  const inputList = header.includes('Activity') ? [
    {
      label: 'Activity',
      component: (
        <DropDownPicker
          open={open}
          value={activity}
          items={activityItems}
          setOpen={setOpen}
          setValue={setActivity}
          setItems={setActivityItems}
          placeholder="Select an activity"
          containerStyle={{ height: 40 }}
          style={{ marginBottom: 10 }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
        />
      ),
    },
    {
      label: 'Duration (in minutes)',
      onChange: handleNumericChange(setDuration),
      value: duration,
      keyboardType: 'numeric',
    },
    {
      label: 'Date',
      component: (
        <DateInput
          value={activityDate}
          onChange={(date) => setActivityDate(date)}
          onFocus={() => setOpen(false)} // Close dropdown when date picker opens
        />
      ),
    },
    {
      label: 'Description',
      onChange: (text) => setDescription(text),
      value: description,
    },
  ] : [
    {
      label: 'Calories',
      onChange: handleNumericChange(setCalories),
      value: calories,
      keyboardType: 'numeric',
    },
    {
      label: 'Date',
      component: (
        <DateInput
          value={dietDate}
          onChange={(date) => setDietDate(date)}
          onFocus={() => setOpen(false)} // Close dropdown when date picker opens
        />
      ),
    },
    {
      label: 'Description',
      onChange: (text) => setDescription(text),
      value: description,
    },
  ];

  if (header.includes('Edit')) {
    inputList.push({
      label: 'This Item is marked as special. Select the box if you want to approve it',
      component: (
        <Checkbox
          value={special}
          onValueChange={setSpecial}
        />
      )
    });
  }

  const handleSubmit = async () => {
    let isSpecial;
    if (header.includes('Activity')) {
      if (!activity || !duration || !activityDate || !description) {
        Alert.alert('Error', 'Please fill out all fields.');
        return;
      }
      isSpecial = (activity === 'running' || activity === 'weights') && (parseInt(duration) >= 60);
    } else if (header.includes('Food') || header.includes('Diet')) {
      if (!calories || !dietDate || !description) {
        Alert.alert('Error', 'Please fill out all fields.');
        return;
      }
      isSpecial = parseInt(calories) >= 800;
    }

    const itemParams = header.includes('Activity') ? 
      { Activity: activity, Duration: duration, Date: activityDate, Description: description, Special: isSpecial } : 
      { Calories: calories, Date: dietDate, Description: description, Special: isSpecial };

    try {
      if (!route.params.item) {
        await addItem(collectionName, itemParams);
      } else {
        await updateItem(collectionName, { id: route.params.item.id, ...itemParams });
      }
      navigation.goBack(); // Navigate back to the previous screen
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <InputList inputs={inputList} />
      <View style={styles.buttonContainer}>
        <PressableButton bgcolor={color.green} pressedFunction={handleSubmit}>
          <Text>Submit</Text>
        </PressableButton>
        <PressableButton bgcolor={color.red} pressedFunction={() => navigation.goBack()}>
          <Text>Cancel</Text>
        </PressableButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
