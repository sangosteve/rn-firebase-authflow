import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

// const Next = ({...props}) => (

// );

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      bottomBarColor={'#fff'}
      showSkip={false}
      onDone={navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={styles.bgImage}
              source={require('../assets/images/bg/custom1.png')}
            />
          ),
          title: 'Chat',
          subtitle: 'Chat with friends',
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={styles.bgImage}
              source={require('../assets/images/bg/custom2.png')}
            />
          ),
          title: 'Share Ideas',
          subtitle: 'Share ideas',
        },

        {
          backgroundColor: '#fff',
          image: (
            <Image
              style={styles.bgImage}
              source={require('../assets/images/bg/custom3.png')}
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
