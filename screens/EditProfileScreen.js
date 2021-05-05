import React, {useState, useEffect, useContext} from 'react';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../contexts/AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
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

const EditProfileScreen = ({navigation}) => {
  const {user, signOut} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const sheetRef = React.useRef(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

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

      <TouchableOpacity
        style={styles.bottomSheetButton}
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

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get()
      .then(documentSnapShot => {
        if (documentSnapShot.exists) {
          console.log('User Data:', documentSnapShot.data());
          setUserData(documentSnapShot.data());
        }
      });
  };

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    //update profile
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({
        fname: userData.fname,
        lname: userData.lname,
        about: userData.about,
        phone: userData.phone,
        country: userData.country,
        city: userData.city,
        userImg: imgUrl,
      })
      .then(() => {
        console.log('User Updated');
        Alert.alert(
          'Profile Has Been Updated',
          'Your Profile Updated Successfully',
        );
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    //Add timestamp to filename
    const extension = fileName.split('.').pop();
    const name = fileName.split('.').slice(0, -1).join('.');
    fileName = name + Date.now() + '.' + extension;
    setUploading(true);
    setTransferred(0);
    const storageRef = storage().ref(`images/${fileName}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });
    try {
      // console.log('uploading file...' + fileName);
      await task;
      //get image url after uploading it for displaying purposes;
      const url = storageRef.getDownloadURL();
      setUploading(false);
      setImage(null);
      Alert.alert(
        'Image uploaded successfully',
        'Your image has been successfully uploaded to cloud storage',
      );

      //return image url
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  useEffect(() => {
    console.log('Edit Post User Loading...');
    getUser();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={() => sheetRef.current.snapTo(50)}>
          <Image
            style={{width: 80, height: 80, borderRadius: 15}}
            source={{uri: userData ? userData.userImg : null}}
          />
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 18}}>
          {userData ? userData.fname : ''} {''} {userData ? userData.lname : ''}
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
          value={userData ? userData.fname : ''}
          onChangeText={txt => setUserData({...userData, fname: txt})}
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
          onChangeText={txt => setUserData({...userData, lname: txt})}
          value={userData ? userData.lname : ''}
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
          placeholder="ABOUT"
          onChangeText={txt => setUserData({...userData, about: txt})}
          value={userData ? userData.about : ''}
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
          onChangeText={txt => setUserData({...userData, phone: txt})}
          value={userData ? userData.phone : ''}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Icon
          name="globe-outline"
          size={26}
          color={'#ACAEAE'}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="COUNTRY"
          onChangeText={txt => setUserData({...userData, country: txt})}
          value={userData ? userData.country : ''}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Icon
          name="location-outline"
          size={26}
          color={'#ACAEAE'}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="CITY"
          onChangeText={txt => setUserData({...userData, city: txt})}
          value={userData ? userData.city : ''}
        />
      </View>
      <TouchableOpacity
        onPress={handleUpdate}
        style={{
          width: '100%',
          backgroundColor: '#1DA1F2',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <Text style={{color: '#fff', fontSize: 20}}>Update</Text>
      </TouchableOpacity>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[-50, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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
    marginTop: 5,
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
