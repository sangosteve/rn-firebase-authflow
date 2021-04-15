import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const FormInput = ({placeholderText, ...rest}) => (
  <>
    <TextInput style={styles.inputField} placeholderText={placeholderText} />
  </>
);

export default FormInput;
const styles = StyleSheet.create({
  inputField: {
    width: '100%',
    marginTop: 15,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#dcdde1',
    padding: 15,
    color: 'grey',
    fontSize: 20,
  },
});
