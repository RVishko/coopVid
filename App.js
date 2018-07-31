import React from 'react';
import  ReactDOM from 'react-dom'
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewPagerAndroid} from 'react-native';
import Home from './src/Home'
import Login from './src/Login'
import Registration from "./src/Registration";
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import {createStackNavigator} from "react-navigation";


const App = createStackNavigator({
    Registration: { screen: Registration },
    Home: { screen: Home },
    Login: { screen: Login},
},{
        initialRouteName: 'Login',
    });

export default App;

var styles = {
    viewPager: {
    flex: 1
},
pageStyle: {
    alignItems: 'center',
        padding: 20,
}
};

