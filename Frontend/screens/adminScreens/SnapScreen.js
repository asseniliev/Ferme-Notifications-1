import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
// import { useDispatch } from 'react-redux';
// import { addPhoto } from '../reducers/user';
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { SetPicture } from "../../reducers/pictures";

export default function SnapScreen({ navigation }) {

  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [photoUri, setPhotoUri] = useState(null);

  const dispatch = useDispatch();

  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    setPhotoUri(photo.uri);
  }

  const storePicture = async () => {
    dispatch(SetPicture(photoUri));
    navigation.navigate("ListOfProducts");
  }

  const imageContent = (
    <View style={styles.previewContainer}>
      <Image
        style={styles.previewImage}
        source={{ uri: photoUri }}
        renderChildrenOutside={true}
      >
      </Image>
      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => setPhotoUri(null)}>
          <FontAwesome name='times-circle' size={60} color='#F3A712' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => storePicture()}>
          <FontAwesome name='check-circle' size={60} color='#F3A712' />
        </TouchableOpacity>
      </View>
    </View>
  );

  const cameraContent = (
    <>
      <View style={styles.header}>
        <AntDesign name="caretleft" size={24} color="#F3A712" />
        <Text
          style={styles.title2}
          onPress={() => navigation.navigate("ListOfProducts")}
        >
          {"  "}liste{"\n"}
          {"  "}des produits
        </Text>
        <Text
          style={styles.title}
        >
          photo
        </Text>
      </View>
      <Camera type={CameraType.back} flashMode={flashMode} ref={(ref) => cameraRef = ref} style={styles.camera}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)}
            style={styles.button}
          >
            <FontAwesome name='flash' size={25} color={flashMode === FlashMode.off ? '#ffffff' : '#e8be4b'} />
          </TouchableOpacity>
        </View>

        <View style={styles.snapContainer}>
          <TouchableOpacity onPress={() => cameraRef && takePicture()}>
            <FontAwesome name='circle-thin' size={95} color='#FFFFFF' />
          </TouchableOpacity>
        </View>
      </Camera>
    </>
  );

  if (photoUri === null)
    return cameraContent;
  else
    return imageContent;
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 3,
    backgroundColor: "#ffffff",
    width: "100%",
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "#ABABAB",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#3A7D44",
    alignContent: "center",
    marginLeft: "35%"
  },
  title2: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#F3A712",
  },
  camera: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 10
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain'
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 20
  },
  snapContainer: {
    bottom: 70,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  previewContainer: {
    // position: 'relative',
    backgroundColor: "#3A7D44",
    width: '100%',
    height: '100%',
  }
});