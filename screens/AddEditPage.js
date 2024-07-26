import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputList from '../components/InputList';
import DateInput from '../components/DateInput';
import PressableButton from '../components/PressableButton';
import {getItems, addItem, updateItem, deleteItem} from '../firebaseSetup/firebaseHelper';
import {color} from '../reusables';

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
    if (header === 'Add Activity') 
        {
            setCollectionName('activities');
      inputs = [
        {
          label: 'Activity',
          onChange: (text) => setActivity(text),
          value: activity,
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
            />
          ),
        },
    
      ];
      setItemParams({'Activity': activity, 'Duration': duration, 'Date': activityDate})
    } else if (header === 'Add Food') 
        {
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
            />
          ),
        },
        {
          label: 'Description',
          onChange: (text) => setDescription(text),
          value: description,
        },
      ];
        setItemParams({'Calories': calories, 'Date': dietDate, 'Description': description})
    }

    setInputList(inputs);
  }, [navigation, header, activity, duration, activityDate, description, calories, dietDate]);

  return (<View>
    <InputList inputs={inputList} />
    <View style={styles.buttonContainer}>
    <PressableButton bgcolor={color.green} pressedFunction={()=>addItem(collectionName, itemParams)}>
        <Text>Submit</Text>
    </PressableButton>
    <PressableButton bgcolor={color.red} pressedFunction={navigation.goBack}>
        <Text>Cancel</Text>
    </PressableButton>
    </View>
    </View>)
}


const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    }
}
);
