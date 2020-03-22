import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import Home from "./screens/Home";
import CameraScreen from "./screens/CameraScreen";


  const AppNavigator = createStackNavigator({
    Home: {
      screen: Home,
    },
    CameraScreen: {
      screen: CameraScreen,
    }
    },
    {
      defaultNavigationOptions:{
      headerTintColor:"#fff",
      headerStyle:{
        backgroundColor:"#b83227"
      },
      headerTitleStyle:{
        color:"#fff"
      }
    }
    });
  
  export default createAppContainer(AppNavigator);

