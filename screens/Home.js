import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";



export default class Home extends React.Component {
  static navigationOption={
    title:"PhotoClicker"
  }
  render(){
  let photo=this.props.navigation.getParam("photo","empty")
  return (
    <View style={styles.container}>
      <Image
      resizeMode="center"
      style={styles.imageHolder}
      source={
        photo==="empty" ? require ("../assets/white_flower.jpg") : photo
      }
      />
      <Button
      title="Take photo"
      style={styles.button}
      onPress={()=>{this.props.navigation.navigate("CameraScreen")}}
      />
    </View>
  );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHolder:{
    alignSelf:"center",
    height:200,
    width:200,
    marginBottom:30
  },
  button:{
    margin:20,
  }
});
