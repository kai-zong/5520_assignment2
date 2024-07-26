import { View, Text, Pressable } from 'react-native'
import React from 'react'

export default function PressableButton({bgcolor}) {
  return (
    <View>
      <Pressable style={[{}, {backgroundColor: bgcolor}]}>
        <View>
            {children}
        </View>
      </Pressable>
    </View>
  )
}
