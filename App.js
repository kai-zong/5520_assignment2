import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import InfoPage from './screens/InfoPage'
import Setting from './screens/Setting'
import AddEditPage from './screens/AddEditPage'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Activities"
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) => {
          let iconName

          if (route.name === 'Activities') {
            iconName = 'running'
          } else if (route.name === 'Diet') {
            iconName = 'utensils'
          } else if (route.name === 'Setting') {
            iconName = 'cog'
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name="Activities" component={InfoPage} />
      <Tab.Screen name="Diet" component={InfoPage}/>
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Add" component={AddEditPage} options={({route}) => ({
          headerTitleAlign: 'center',
        })}/>
        <Stack.Screen name="Edit" component={AddEditPage} options={({route}) => ({
          headerTitleAlign: 'center',
        })}/>

      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
