import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import InfoPage from './screens/InfoPage';
import Setting from './screens/Setting';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Activities'
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        tabBarIcon:({focused, color, size}) =>{
          let iconName;

          if(route.name === 'Activities'){
            iconName = "running";
        }
        else if(route.name === 'Diet'){
          iconName = "utensils"; 
      }
      else if(route.name === 'Setting'){
        iconName = "cog";}
      return <FontAwesome5 name={iconName} size={size} color={color} />;}

})}>
        <Tab.Screen name="Activities" component={InfoPage}/>
        <Tab.Screen name="Diet" component={InfoPage} />
        <Tab.Screen name="Setting" component={Setting} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
