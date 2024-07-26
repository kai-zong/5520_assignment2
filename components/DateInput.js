import React, { useState } from 'react';
import { View, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateInput({ value, onChange, onFocus }) {
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    setShow(Platform.OS === 'ios');
    onChange(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
    if (onFocus) {
      onFocus();
    }
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
        placeholder="Select Date"
        value={value ? value.toLocaleDateString() : ''}
        onFocus={showDatepicker}
      />
      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="inline"
          onChange={onDateChange}
        />
      )}
      {Platform.OS === 'ios' && show && (
        <Button title="Done" onPress={() => setShow(false)} />
      )}
    </View>
  );
}
