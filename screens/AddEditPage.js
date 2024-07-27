import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import InputList from '../components/InputList';
import DateInput from '../components/DateInput';
import PressableButton from '../components/PressableButton';
import { addItem, updateItem, deleteItem } from '../firebaseSetup/firebaseHelper';
import { color } from '../reusables';
import Checkbox from 'expo-checkbox';
import { Timestamp } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';

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
  const { backgroundColor } = useTheme();
  const collectionNameRef = useRef('');

  const header = route.params.header;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: header,
      headerRight: () => header.includes('Edit') ? (
        <PressableButton
          pressedFunction={() => handleDelete()}
        >
          <FontAwesome name="trash-o" size={24} color="black" />
        </PressableButton>
      ) : null
    });
  }, [navigation, header]);

  useEffect(() => {
    let name = '';
    if (header.includes('Activities') || header.includes('Activity')) {
      name = 'activities';
    } else if (header.includes('Food') || header.includes('Diet')) {
      name = 'diet';
    }
    setCollectionName(name);
    collectionNameRef.current = name;
  }, [header]);

  const handleNumericChange = (setter) => (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setter(numericValue);
  };

  const getInputList = () => {
    if (header.includes('Activities') || header.includes('Activity')) {
      const inputs = [
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
              zIndex={3000}
              zIndexInverse={1000}
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

      if (header.includes('Edit')) {
        inputs.push({
          label: 'This Item is marked as special. Select the box if you want to approve it',
          component: (
            <Checkbox
              value={special}
              onValueChange={setSpecial}
            />
          ),
        });
      }

      return inputs;
    } else if (header.includes('Food') || header.includes('Diet')) {
      const inputs = [
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
        inputs.push({
          label: 'This Item is marked as special. Select the box if you want to approve it',
          component: (
            <Checkbox
              value={special}
              onValueChange={setSpecial}
            />
          ),
        });
      }

      return inputs;
    }
    return [];
  };

  const handleDelete = async () => {
    if (!collectionNameRef.current || !route.params.item.id) {
      console.error('Collection name or item ID is missing');
      return;
    }

    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Delete cancelled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteItem(collectionNameRef.current, route.params.item.id);
              navigation.goBack(); // Navigate back to the previous screen
            } catch (err) {
              console.error(err);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleSubmit = async () => {
    let isSpecial = special; // Initialize isSpecial with the special state

    if (header.includes('Activities') || header.includes('Activity')) {
      if (!activity || !duration || !activityDate || !description) {
        Alert.alert('Error', 'Please fill out all fields.');
        return;
      }
      // Only set isSpecial if adding a new item
      if (!route.params.item) {
        isSpecial = (activity === 'running' || activity === 'weights') && (parseInt(duration) >= 60);
      }
    } else if (header.includes('Food') || header.includes('Diet')) {
      if (!calories || !dietDate || !description) {
        Alert.alert('Error', 'Please fill out all fields.');
        return;
      }
      // Only set isSpecial if adding a new item
      if (!route.params.item) {
        isSpecial = parseInt(calories) >= 800;
      }
    }

    const itemParams = header.includes('Activities') || header.includes('Activity') ?
      { Activity: activity, Duration: duration, Date: Timestamp.fromDate(activityDate), Description: description, Special: isSpecial } :
      { Calories: calories, Date: Timestamp.fromDate(dietDate), Description: description, Special: isSpecial };

    Alert.alert(
      'Confirmation',
      'Do you want to proceed with the submission or go back to editing?',
      [
        {
          text: 'Go Back',
          onPress: () => console.log('User chose to go back'),
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: async () => {
            try {
              if (!route.params.item) {
                await addItem(collectionNameRef.current, itemParams);
              } else {
                await updateItem(collectionNameRef.current, { id: route.params.item.id, ...itemParams });
              }
              navigation.goBack(); // Navigate back to the previous screen
            } catch (err) {
              console.error(err);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <InputList inputs={getInputList()} />
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
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
