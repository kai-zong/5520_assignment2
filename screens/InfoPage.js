import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import {useRoute} from '@react-navigation/native'
import {getItems} from '../firebaseSetup/firebaseHelper'

export default function InfoPage({navigation}) {
    const [collection, setCollection] = useState([]);
    route = useRoute();
    useEffect(() => {

    }, [])
  return (
    <View>
      <Text>InfoPage</Text>
    </View>
  )
}