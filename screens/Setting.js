import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { color } from '../reusables'
import PressableButton from '../components/PressableButton'
import { useTheme } from '../ThemeContext'

export default function Setting() {

  const { backgroundColor, toggleTheme } = useTheme()
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
    <PressableButton bgcolor={color.blue} pressedFunction={toggleTheme}>
      <View>
        <Text style={{color: color.white}}>Toggle Theme</Text>
      </View>
    </PressableButton>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})