import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Next = ({...props}) => (
  <TouchableOpacity
    style={{
      width: '100%',
      backgroundColor: '#e84118',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 30,
    }}>
    <Text style={{color: '#fff'}}>Next</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#d4ebf2',
          image: (
            <Image
              style={styles.bgImage}
              source={require('../assets/images/bg/vector-bg1.png')}
            />
          ),
          title: 'Chat',
          subtitle: 'Chat with friends',
          titleStyles: {color: 'purple'},
        },
        {
          backgroundColor: '#d4ebf2',
          image: (
            <Image
              style={styles.bgImage}
              source={require('../assets/images/bg/vector-bg3.png')}
            />
          ),
          title: 'Share Ideas',
          subtitle: 'Share ideas',
        },

        {
          backgroundColor: '#d4ebf2',
          image: (
            <Image
              style={styles.bgImage}
              source={require('../assets/images/bg/vector-bg2.png')}
            />
          ),
          title: 'Share Ideas',
          subtitle: 'Share ideas',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
});
