import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { color } from '../reusables';
import { AntDesign } from '@expo/vector-icons';
import PressableButton from './PressableButton';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // Get device screen width

export default function ItemList({ items, navigation }) {
  const routeName = useRoute().name;
  const renderItem = ({ item }) => (
    <PressableButton pressedFunction={() => navigation.navigate('Edit', {header: "Edit "+routeName, item: item})}>
      <View style={styles.textContainer}>
        {item.Activity && <Text style={styles.textStyle}>Activity: {item.Activity}</Text>}
        {item.Duration && <Text style={styles.textStyle}>Duration: {item.Duration} minutes</Text>}
        {item.Date && <Text style={styles.textStyle}>Date: {new Date(item.Date.seconds * 1000).toLocaleDateString()}</Text>}
        {item.Description && <Text style={styles.textStyle}>Description: {item.Description}</Text>}
        {item.Calories && <Text style={styles.textStyle}>Calories: {item.Calories}</Text>}
        {item.Special && <AntDesign name="star" size={24} color="yellow" />}
      </View>
    </PressableButton>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id} // Ensure item.id is a string or convert it to string
      contentContainerStyle={styles.container} // Apply container styles
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center items horizontally
    paddingVertical: 10, // Add some vertical padding
  },
  textContainer: {
    width: width * 0.95, // Ensure item takes 95% of the device width
    padding: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    backgroundColor: color.purple,
    marginVertical: 10, // Add gap between items
    borderRadius: 10, // Optional: add rounded corners
  },
  textStyle: {
    fontSize: 15,
    color: color.white,
  },
});
