import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import createNativeStackNavigator from '@react-navigation/native-stack';
import createBottomTabNavigator from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Activities" component={Activities} />
        <Tab.Screen name="Diet" component={Diet} />
        <Tab.Screen name="Setting" component={Setting} />
      </Tab.Navigator>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
