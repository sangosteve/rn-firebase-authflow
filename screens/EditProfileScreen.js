import React, {useState, useEffect, useContext} from 'react';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Container,
  InputField,
  InputWrapper,
  UserImage,
  UserImageWrapper,
} from '../styles/EditProfileStyles';
import {UserNameWrapper} from '../styles/ProfileStyles';

const renderContent = () => (
  <View
    style={{
      width: '100%',
      alignItems: 'center',
      backgroundColor: '#FFF',
      height: 300,
    }}>
    <Text>hey</Text>
    <TouchableOpacity style={styles.bottomSheetButton}>
      <Icon name="camera-outline" color="#fff" size={30} />
      <Text style={styles.bottomSheetButtontText}>Take Photo</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.bottomSheetButton}>
      <Icon name="images-outline" color="#fff" size={30} />
      <Text style={styles.bottomSheetButtontText}>Choose From Gallery</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.bottomSheetButton}
      onPress={() => sheetRef.current.snapTo(1)}>
      <Icon name="close-outline" color="#fff" size={30} />
      <Text style={styles.bottomSheetButtontText}>Cancel</Text>
    </TouchableOpacity>
  </View>
);

const EditProfileScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const sheetRef = React.useRef(null);
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={() => sheetRef.current.snapTo(50)}>
          <Image
            style={{width: 80, height: 80, borderRadius: 15}}
            source={require('../assets/images/profile_images/user1.png')}
          />
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 18}}>
          Jhon Doe
        </Text>
      </View>

      <View style={styles.inputWrapper}>
        <Icon
          name="person-outline"
          size={26}
          color={'#ACAEAE'}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="FIRSTNAME"
          onChangeText={email => setEmail(email)}
          value={email}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Icon
          name="person-outline"
          size={26}
          color={'#ACAEAE'}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="LASTNAME"
          onChangeText={email => setEmail(email)}
          value={email}
        />
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
          name="call-outline"
          size={26}
          color={'#ACAEAE'}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="PHONE"
          onChangeText={password => setPassword(password)}
          value={password}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Icon
          name="globe-outline"
          size={26}
          color={'#ACAEAE'}
          style={styles.inputIcon}
        />
        <TextInput style={styles.inputField} placeholder="COUNTRY" />
      </View>
      <TouchableOpacity
        onPress={() => signUp(email, password)}
        style={{
          width: '100%',
          backgroundColor: '#00E19E',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <Text style={{color: '#fff', fontSize: 20}}>Submit</Text>
      </TouchableOpacity>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[-50, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </View>
  );
};

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

  bottomSheetButton: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#3742fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 15,
  },
  bottomSheetButtontText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
});

export default EditProfileScreen;
