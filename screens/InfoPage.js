import { View, Text, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getItems } from '../firebaseSetup/firebaseHelper';
import PressableButton from '../components/PressableButton';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ItemList from '../components/ItemList';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebaseSetup/firebaseSetup';

export default function InfoPage({ navigation }) {
  const [items, setItems] = useState([]);
  const routeName = useRoute().name;
  const addHeader = routeName === 'Activities' ? 'Add Activity' : 'Add Food';

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
  
    // async function fetchItems() {
    //   try {
    //     const fetchedItems = await getItems(routeName.toLowerCase());
    //     setItems(fetchedItems);
    //   } catch (error) {
    //     console.error('Error fetching items:', error);
    //   }
    // }
  
    // fetchItems();
  
    navigation.setOptions({
      headerRight: () => {
        return (
          <View>
            <PressableButton bgcolor="green" pressedFunction={() => navigation.navigate('addEdit', { header: addHeader })}>
              <AntDesign name="plus" size={24} color="black" />
              {routeName === 'Activities' && <FontAwesome5 name="running" size={24} color="black" />}
              {routeName === 'Diet' && <FontAwesome5 name="utensils" size={24} color="black" />}
            </PressableButton>
          </View>
        );
      },
    });
  
    return () => {unsubscribe()};
  }, [routeName, navigation]);

  return (
    <SafeAreaView>
      <ItemList items={items} />
    </SafeAreaView>
  );
}
