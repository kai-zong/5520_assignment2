import { View, Text, SafeAreaView, ScrollView} from 'react-native'
import { useEffect, useState } from 'react'
import {useRoute} from '@react-navigation/native'
import {getItems} from '../firebaseSetup/firebaseHelper'
import ItemList from '../components/ItemList'
import PressableButton from '../components/PressableButton'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


export default function InfoPage({navigation}) {
    const [Items, setItems] = useState([]);
    const routeName = useRoute().name;
    const pressedFunction = () => {

    }
    useEffect(() => {
      getItems(routeName).then((items) => {
        setItems(items);
      });

      navigation.setOptions({
        headerRight: ()=>{
          return(
            <View>
              <PressableButton bgcolor='green' pressedFunction={()=>{}}>
              <AntDesign name="plus" size={24} color="black" />
              {(routeName === 'Activities') && <FontAwesome5 name="running" size={24} color="black" />}
              {(routeName === 'Diet') && <FontAwesome5 name="utensils" size={24} color="black" />}

              </PressableButton>
            </View>
          )
        }
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