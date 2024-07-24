import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Activities from './screens/Activities';
import Diet from './screens/Diet';
import Setting from './screens/Setting';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Activities" component={Activities} />
        <Tab.Screen name="Diet" component={Diet} />
        <Tab.Screen name="Setting" component={Setting} />
      </Tab.Navigator>
      <Text>Open up App.js to start working on your app!</Text>
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
