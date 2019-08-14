import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation";
import homeScreen from './app/screens/homeScreen.js'
import searchScreen from './app/screens/searchScreen.js'

const App = createBottomTabNavigator({
  Home: {screen: homeScreen},
  Search: {screen: searchScreen}

},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisable: false
  }
}
)

export default createAppContainer(App);
