import 'react-native-gesture-handler';
import React from 'react';
import {LogBox} from 'react-native';
// import Home from './src/Home/Home';
// import Login from './src/Login/Login';
import Routes from './Routes/routes';

// console.disableYellowBox = true;
// Ignore all log notifications:
LogBox.ignoreAllLogs();
/* eslint-disable */

export default function App() {
  return <Routes />;
}
