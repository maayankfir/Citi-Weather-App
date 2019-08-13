import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import homeScreen from './app/screens/homeScreen.js'

const App = createStackNavigator({
  Home: {
    screen: homeScreen
  },

},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisable: false
  }
}
)

export default createAppContainer(App);
