import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const FormButton = ({buttonText, ...rest}) => (
  <>
    <TouchableOpacity style={styles.formButton}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  </>
);

export default FormButton;
const styles = StyleSheet.create({
  formButton: {
    width: '100%',
    backgroundColor: '#e84118',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
