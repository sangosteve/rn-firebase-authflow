import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  TextInput,
} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';

import Firebase from '../config/Firebase';

import {AuthContext} from '../contexts/AuthContext';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholderText="Enter email"
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TextInput
        style={styles.inputField}
        placeholderText="Enter PASSWORD"
        onChangeText={password => setPassword(password)}
        value={password}
      />

      <TouchableOpacity
        onPress={() => signIn(email, password)}
        style={{
          width: '100%',
          backgroundColor: '#e84118',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          marginTop: 30,
        }}>
        <Text>Signup</Text>
      </TouchableOpacity>
      {/* <Button
        title="Press Me"
        onPress={() => sayHello('steve', 'sango')}
        style={{
          width: '100%',
          backgroundColor: '#e84118',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          marginTop: 30,
        }}
      /> */}

      <TouchableOpacity style={styles.helperLink}>
        <Text style={styles.helperLinkText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <SocialButton
          socialButtonText="Google"
          imgSrc={require('../assets/images/logos/icon-Google.png')}
        />
        <SocialButton
          socialButtonText="Facebook"
          imgSrc={require('../assets/images/logos/logo-fb.png')}
        />
      </View>
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#8395a7', fontSize: 20}}>
          Don't have an account?
        </Text>
        <TouchableOpacity>
          <Text style={styles.helperLinkText}> Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },

  helperLink: {
    marginTop: 30,
  },
  helperLinkText: {
    fontSize: 20,
    color: '#e84118',
  },

  socialLoginSection: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
  },
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
