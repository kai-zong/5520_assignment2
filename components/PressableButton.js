import { View, Pressable, StyleSheet } from 'react-native';
import React from 'react';

export default function PressableButton({ bgcolor, pressedFunction, children }) {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : bgcolor,
            transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
          },
          styles.container
        ]}
        onPress={pressedFunction}
      >
        {React.Children.map(children, (child, index) => (
          <View key={index}>{child}</View>
        ))}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // optional padding
  },
});
