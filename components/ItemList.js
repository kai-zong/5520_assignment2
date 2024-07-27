import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { color } from '../reusables';

export default function ItemList({ items }) {
  const renderItem = ({ item }) => (
    <View style={styles.textContainer}>
      {item.Activity && <Text style={styles.textStyle}>Activity: {item.Activity}</Text>}
      {item.Duration && <Text style={styles.textStyle}>Duration: {item.Duration} minutes</Text>}
      {item.Date && <Text style={styles.textStyle}>Date: {new Date(item.Date.seconds * 1000).toLocaleDateString()}</Text>}
      {item.Description && <Text style={styles.textStyle}>Description: {item.Description}</Text>}
      {item.Calories && <Text style={styles.textStyle}>Calories: {item.Calories}</Text>}
    </View>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} // Ensure item.id is a string or convert it to string
    />
  );
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
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 15,
    color: color.red,
  },
});
