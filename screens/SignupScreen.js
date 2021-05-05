import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../contexts/AuthContext';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signUp} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image
          style={{width: 120, height: 120}}
          source={require('../assets/images/bg/profile-user.png')}
        />
        <Text style={{fontWeight: 'bold', fontSize: 30, marginTop: 18}}>
          Create Account
        </Text>
        <Text style={{fontSize: 18, color: '#ACAEAE'}}>Create new account</Text>
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
      <View style={styles.inputWrapper}>
        <Icon
          name="lock-closed-outline"
          size={26}
          color={'#ACAEAE'}
          style={styles.inputIcon}
        />
        <TextInput style={styles.inputField} placeholder="CONFIRM PASSWORD" />
      </View>
      <TouchableOpacity
        onPress={() => signUp(email, password)}
        style={{
          width: '100%',
          backgroundColor: '#0984e3',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 60,
        }}>
        <Text style={{color: '#fff', fontSize: 20}}>Create Account</Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#8395a7', fontSize: 20}}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.helperLinkText}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;
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
    color: '#0984e3',
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
