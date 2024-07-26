import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import {useRoute} from '@react-navigation/native'
import {getItems} from '../firebaseSetup/firebaseHelper'
import ItemList from '../components/ItemList'

export default function InfoPage({navigation}) {
    const [Items, setItems] = useState([]);
    route = useRoute();
    useEffect(() => {
      getItems(route.name).then((items) => {
        setItems(items);
      });
    }, [])
  return (
    <SafeAreaView>
    <ScrollView>
      <Text>InfoPage</Text>
    </ScrollView>
    </SafeAreaView>
  )
}