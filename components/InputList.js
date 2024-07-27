import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function InputList({ inputs }) {
  return (
    <View>
      {inputs.map((input, index) => (
        <View key={index}>
          <Text>{input.label}</Text>
          {input.component || (
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={input.onChange}
              value={input.value}
              keyboardType={input.keyboardType || 'default'}
            />
          )}
        </View>
      ))}
    </View>
  );
}
