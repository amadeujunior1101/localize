import React, {useState, useEffect} from 'react';
// import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../src/pages/Home/Home';
import Login from '../src/pages/Login/Login';
import NewClient from '../src/pages/NewClient/NewClient';
import Find from '../src/pages/Find/Find';
import Visit from '../src/pages/Visit/Visit';
import Schedule from '../src/pages/Schedule/Schedule';
import Profile from '../src/pages/Profile/Profile';

import AsyncStorage from '@react-native-community/async-storage';

/* eslint-disable */
// function HomeScreen() {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Home Screen</Text>
//         </View>
//     );
// }

// function DetailsScreen() {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>Details Screen</Text>
//         </View>
//     );
// }

const Stack = createStackNavigator();

function App() {
  const [history, setHistory] = useState(null)
  const [loadingHistory, setLoadingHistory] = useState(true)

  useEffect(() => {
    // await AsyncStorage.clear()
    // const keys = await AsyncStorage.getAllKeys()
    // console.log(keys)
    AsyncStorage.getItem('@token')
      .then(item => {
        if (item !== null && item !== undefined) {

          setHistory("Home")
          setLoadingHistory(false)

        } else {

          setHistory("Login")
          setLoadingHistory(false)
        }

      });

  }, [])

  return (
    loadingHistory === false &&
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={history}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewClient" component={NewClient} />
        <Stack.Screen name="Find" component={Find} />
        <Stack.Screen name="Visit" component={Visit} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
