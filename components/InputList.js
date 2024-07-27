import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';

const InputList = ({ inputs }) => {
  return (
    <View>
      {inputs.map((input, index) => {
        if (input.component) {
          const zValue =  Platform.OS === 'ios'
          return (
            <View key={index} style={[styles.inputContainer, zValue && { zIndex: 1000-index }]}>
              <Text style={styles.label}>{input.label}</Text>
              {input.component}
            </View>
          );
        } else {
          return (
            <View key={index} style={styles.inputContainer}>
              <Text style={styles.label}>{input.label}</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={input.onChange}
                value={input.value}
                keyboardType={input.keyboardType || 'default'}
              />
            </View>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
});

export default InputList;
