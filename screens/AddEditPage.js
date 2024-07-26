import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import InputList from '../components/InputList';
import DateInput from '../components/DateInput';

export default function AddEditPage({ navigation, route }) {
  const [inputList, setInputList] = useState([]);
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [activityDate, setActivityDate] = useState(null);
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [dietDate, setDietDate] = useState(null);

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
        {
          label: 'Description',
          onChange: (text) => setDescription(text),
          value: description,
        },
      ];
    } else if (header === 'Add Food') {
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
    }

    setInputList(inputs);
  }, [navigation, header, activity, duration, activityDate, description, calories, dietDate]);

  return <InputList inputs={inputList} />;
}
