import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import PressableButton from '../components/PressableButton'
import {color} from '../reusables'

export default function Setting({toggleTheme}) {
  return (
    <View style={styles.container}>
      <PressableButton bgcolor={color.blue} pressedFunction={() => toggleTheme()}>
        <Text style={{color: color.white}}>Toggle Theme</Text>
      </PressableButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})