import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { getItems } from '../firebaseSetup/firebaseHelper'
import PressableButton from '../components/PressableButton'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

export default function InfoPage({ navigation }) {
  const [items, setItems] = useState([])
  const routeName = useRoute().name
  const addHeader = routeName === 'Activities' ? 'Add Activity' : 'Add Food'

  useEffect(() => {
    getItems(routeName).then((items) => {
      setItems(items)
    })
    
    navigation.setOptions({
      headerRight: () => {
        return (
          <View>
            <PressableButton bgcolor="green" pressedFunction={() => navigation.navigate('addEdit', {header:addHeader})}>
              <AntDesign name="plus" size={24} color="black" />
              {routeName === 'Activities' && <FontAwesome5 name="running" size={24} color="black" />}
              {routeName === 'Diet' && <FontAwesome5 name="utensils" size={24} color="black" />}
            </PressableButton>
          </View>
        )
      },
    })
  }, [routeName, navigation])

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>InfoPage</Text>
      </ScrollView>
    </SafeAreaView>
  )
}
