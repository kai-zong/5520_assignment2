import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import InfoPage from './screens/InfoPage';
import Setting from './screens/Setting';
import AddEditPage from './screens/AddEditPage';
import { lightTheme, darkTheme } from './reusables';
import { useState } from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home({ theme, toggleTheme }) {
  return (
    <Tab.Navigator
      initialRouteName="Activities"
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Activities') {
            iconName = 'running';
          } else if (route.name === 'Diet') {
            iconName = 'utensils';
          } else if (route.name === 'Setting') {
            iconName = 'cog';
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Activities" component={InfoPage} />
      <Tab.Screen name="Diet" component={InfoPage}/>
      <Tab.Screen name="Setting">
        {props => <Setting {...props} toggleTheme={toggleTheme} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: theme.backgroundColor,
          },
        }}
      >
        <Stack.Screen name="Home"
        options={{headerShown: false}}>
          {props => <Home {...props} theme={theme} toggleTheme={toggleTheme} />}
        </Stack.Screen>
        <Stack.Screen name="Add" component={AddEditPage} options={{ headerTitleAlign: 'center' }}/>
        <Stack.Screen name="Edit" component={AddEditPage} options={{ headerTitleAlign: 'center' }}/>
      </Stack.Navigator>
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
