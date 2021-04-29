import React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

const FloatingButton = ({image, setImage}) => {
  var buttonSize = new Animated.Value(1);
  var mode = new Animated.Value(0);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: false, // Add This line
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
        useNativeDriver: false, // Add This line
      }),
      Animated.timing(mode, {
        toValue: mode._value === 0 ? 1 : 0,
        useNativeDriver: false, // Add This line
      }),
    ]).start();
  };
  const sizeStyle = {
    transform: [{scale: buttonSize}],
  };
  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const cameraX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 50],
  });
  const cameraY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 90],
  });
  const videoX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 110],
  });
  const videoY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 60],
  });
  const locationX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [70, 150],
  });
  const locationY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 10],
  });

  const imageX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [70, 150],
  });
  const imageY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 10],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{position: 'absolute', bottom: cameraX, right: cameraY}}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() =>
            ImagePicker.openCamera({
              width: 300,
              height: 400,
              cropping: true,
            }).then(image => {
              console.log(image);
            })
          }>
          <Icon name="camera-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={{position: 'absolute', bottom: imageX, right: imageY}}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() =>
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: false,
            }).then(selectedImage => {
              setImage(selectedImage.path);
              console.log(image);
            })
          }>
          <Icon name="image-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={{position: 'absolute', bottom: videoX, right: videoY}}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() =>
            ImagePicker.openPicker({
              mediaType: 'video',
            }).then(video => {
              console.log(video);
            })
          }>
          <Icon name="videocam-outline" size={25} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.button, sizeStyle]}>
        <TouchableHighlight underlayColor="#3867d6" onPress={handlePress}>
          <Animated.View style={{transform: [{rotate: rotation}]}}>
            <Icon name="add-outline" size={50} color="#fff" />
          </Animated.View>
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 72,
    borderRadius: 72 / 2,
    backgroundColor: '#3867d6',
    position: 'absolute',
    bottom: 90,
    right: 5,
    shadowColor: '#3867d6',
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
  },
  cameraButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    bottom: 35,
    backgroundColor: '#f53b57',
  },
  videoButton: {},
});
