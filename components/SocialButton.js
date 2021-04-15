import React from 'react';
import {TouchableOpacity, StyleSheet, Text, Image} from 'react-native';

const SocialButton = ({socialButtonText, imgSrc}) => (
  <>
    <TouchableOpacity style={styles.socialButton}>
      <Image style={styles.buttonLogo} source={imgSrc} />
      <Text style={styles.buttonText}>{socialButtonText}</Text>
    </TouchableOpacity>
  </>
);

export default SocialButton;
const styles = StyleSheet.create({
  socialButton: {
    width: '46%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonLogo: {
    width: 30,
    height: 30,
  },
  buttonText: {
    color: '#e84118',
    fontSize: 20,
    marginLeft: 5,
  },
});
