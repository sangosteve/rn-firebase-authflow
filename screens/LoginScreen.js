import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  TextInput,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../contexts/AuthContext';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image
          style={{width: 120, height: 120}}
          source={require('../assets/images/bg/profile-user.png')}
        />
        <Text style={{fontWeight: 'bold', fontSize: 30, marginTop: 18}}>
          Welcome Back
        </Text>
        <Text style={{fontSize: 18, color: '#ACAEAE'}}>
          Sign in and continue
        </Text>
      </View>

      <View style={styles.inputWrapper}>
        <Icon
          name="mail-outline"
          size={26}
          color={'#ACAEAE'}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="EMAIL"
          onChangeText={email => setEmail(email)}
          value={email}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Icon
          name="lock-closed-outline"
          size={26}
          color={'#ACAEAE'}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="PASSWORD"
          onChangeText={password => setPassword(password)}
          value={password}
        />
      </View>

      <TouchableOpacity
        onPress={() => signIn(email, password)}
        style={{
          width: '100%',
          backgroundColor: '#00E19E',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 60,
        }}>
        <Text style={{color: '#fff', fontSize: 20}}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.helperLink}>
        <Text style={styles.helperLinkText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* <View
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
      </View> */}
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
        <TouchableOpacity
          title="Signup"
          onPress={() => navigation.navigate('Signup')}>
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
    padding: 20,
    backgroundColor: '#fff',
  },

  helperLink: {
    marginTop: 30,
    alignSelf: 'flex-end',
  },
  helperLinkText: {
    fontSize: 20,
    color: '#00E19E',
  },

  socialLoginSection: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    width: '100%',
    position: 'relative',
    marginTop: 18,
  },
  inputIcon: {
    position: 'absolute',
    left: 0,
    bottom: 10,
  },

  inputField: {
    width: '100%',
    marginTop: 15,
    color: '#ACAEAE',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ACAEAE',
    paddingLeft: 40,
  },
});
