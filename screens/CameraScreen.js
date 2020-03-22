import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import {FontAwesome} from "@expo/vector-icons";
import * as Permissions from 'expo-permissions';



export default class CameraScreen extends React.Component {
    static navigationOption={
        title:"Camera"
      }

      constructor(props){
          super(props)
          this.state={
              hasCameraPermission:null,
              type:Camera.Constants.Type.back,
              isFlashLightOn:Camera.Constants.FlashMode.off
          }
      }
      async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
      }

      flipCamera=()=>{
        this.setState({
          type:this.state.type===Camera.Constants.Type.back ?
          Camera.Constants.Type.front :
          Camera.Constants.Type.back
        })
      }

      flashLight=()=>{
        this.setState({
          isFlashLightOn:this.state.isFlashLightOn===Camera.Constants.FlashMode.off ?
          Camera.Constants.FlashMode.on :
          Camera.Constants.FlashMode.off
        })
      }
      takePicture = async ()=>{
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          this.props.navigation.navigate("Home",{photo:photo})
        }
      }

  render(){
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <View><Text>No access to camera</Text></View>;
    }else{
      return (
        <View style={styles.container}>
          <Camera
          type={this.state.type}
          style={styles.cameraView}
          flashMode={this.state.isFlashLightOn}
          ref={ref=>{
            this.camera=ref;
          }}
          >
          <View style={styles.actionContainer}>
            <TouchableOpacity 
            onPress={()=>{this.flipCamera()}}
            style={styles.iconHolder}>
              <FontAwesome
                name="camera"
                size={35}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{this.takePicture()}}
            style={styles.iconHolder}>
              <FontAwesome
                name="circle"
                size={35}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{this.flashLight()}}
            style={styles.iconHolder}>
              <FontAwesome
                name="flash"
                size={35}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          </Camera>
        </View>
      );
    }
  }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraView:{
    flex:1
  },
  iconHolder:{
    flex:1,
    alignItems:"center",
    alignSelf:"flex-end"
  },
  icon:{
    marginBottom:10,
    color:"#fff"
  },
  actionContainer:{
    flexDirection:"row",
    flex:1,
    backgroundColor:"transparent"
  }
});
