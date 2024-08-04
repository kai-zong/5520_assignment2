import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseSetup/firebaseSetup';
import PressableButton from '../components/PressableButton';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ItemList from '../components/ItemList';
import { useTheme } from '../ThemeContext';

export default function InfoPage({ navigation }) {
  const [items, setItems] = useState([]);
  const routeName = useRoute().name;
  const addHeader = routeName === 'Activities' ? 'Add Activity' : 'Add Food';
  const { backgroundColor } = useTheme();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, routeName.toLowerCase()), (snapshot) => {
      let data = [];
      if (!snapshot.empty) {
        snapshot.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() });
        });
      }
      setItems(data);
    });

    navigation.setOptions({
      headerRight: () => {
        return (
          <View>
            <PressableButton bgcolor="green" pressedFunction={() => navigation.navigate('Add', { header: addHeader })}>
              <AntDesign name="plus" size={24} color="black" />
              {routeName === 'Activities' && <FontAwesome5 name="running" size={24} color="black" />}
              {routeName === 'Diet' && <FontAwesome5 name="utensils" size={24} color="black" />}
            </PressableButton>
          </View>
        );
      },
    });

    return () => unsubscribe();
  }, [routeName, navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: backgroundColor }]}>
      <ItemList items={items} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
