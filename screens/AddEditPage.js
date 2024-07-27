import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import InputList from '../components/InputList';
import DateInput from '../components/DateInput';
import PressableButton from '../components/PressableButton';
import { addItem } from '../firebaseSetup/firebaseHelper';
import { color } from '../reusables';

export default function AddEditPage({ navigation, route }) {
  const [inputList, setInputList] = useState([]);
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [activityDate, setActivityDate] = useState(null);
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [dietDate, setDietDate] = useState(null);
  const [collectionName, setCollectionName] = useState('');
  const [itemParams, setItemParams] = useState({});
  const [open, setOpen] = useState(false);
  const [special , setSpecial] = useState(false);
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

    let inputs = [];

    const handleNumericChange = (setter) => (text) => {
      const numericValue = text.replace(/[^0-9]/g, '');
      setter(numericValue);
    };

    if (header === 'Add Activity') {
      setCollectionName('activities');
      inputs = [
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
               // Close date picker when dropdown opens
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
      ];
      setItemParams({ Activity: activity, Duration: duration, Date: activityDate, Description: description });
    } else if (header === 'Add Food') {
      setCollectionName('diet');
      inputs = [
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
      setItemParams({ Calories: calories, Date: dietDate, Description: description });
    }

    setInputList(inputs);
  }, [navigation, header, activity, duration, activityDate, description, calories, dietDate, open]);

  useEffect(() => {
    if (header === 'Add Activity') {
      setItemParams({ Activity: activity, Duration: duration, Date: activityDate, Description: description, Special: special });
    } else if (header === 'Add Food') {
      setItemParams({ Calories: calories, Date: dietDate, Description: description });
    }
  }, [activity, duration, activityDate, description, calories, dietDate, header]);

  const handleSubmit = async () => {
    setSpecial(activity === 'running' || activity === 'weights') && (duration >= 60);
  if (header === 'Add Activity') {
      if (!activity || !duration || !activityDate || !description) {
        Alert.alert('Error', 'Please fill out all fields.');
        return;
      }
    } else if (header === 'Add Food') {
      if (!calories || !dietDate || !description) {
        Alert.alert('Error', 'Please fill out all fields.');
        return;
      }
    }

    try {
      await addItem(collectionName, itemParams);
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
