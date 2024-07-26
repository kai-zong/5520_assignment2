import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function PressableButton({bgcolor, pressedFunction, children}) {
  return (
    <View>
      <Pressable style={[styles.container, {backgroundColor: bgcolor}]}>
        {children.map((child, index) => <View key={index}>{child}</View>)}
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})