import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login'
import Profile from './components/Profile'
import {createStackNavigator} from 'react-navigation'
import Register from './components/Register'

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
        <MyApp/>
    );
  }
}
const MyApp = createStackNavigator({
  Login: { screen: Login },
  Profile: {screen: Profile},
  Register: {screen: Register},
}, {
  initialRouteName: 'Login',
  headerMode: 'screen'
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
