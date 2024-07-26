import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { color } from '../reusables'

export default function ItemList({items}) {
  return (
    <FlatList
    data={items} 
    renderItem = {({item}) => (
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{item.name}</Text>
      </View>
    )}
    keyExtractor={(item) => item.id}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    padding: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    backgroundColor: color.lightGrey,
    alignContent: 'center',
    justifyContent: 'center'
  },
  textStyle:{
    fontSize: 15,
    color:color.lightBlue
  }
})