import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import FloatingButton from '../components/FloatingButton';
import {AuthContext} from '../contexts/AuthContext';
const AddPostScreen = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const {user, signOut} = useContext(AuthContext);
  const [post, setPost] = useState(null);

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log(auth().currentUser.uid);
    firestore()
      .collection('posts')
      .add({
        userId: auth().currentUser.uid,
        post: post,
        postImg: imageUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        liked: false,
        likes: 0,
        comments: 0,
      })
      .then(() => {
        console.log('Post added successfully');
        setPost(null);
      })
      .catch(error => console.log(error));
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
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="What's on your mind?"
        style={{width: '100%', backgroundColor: '#f0f8ff'}}
        onChangeText={content => setPost(content)}
        value={post}
      />
      {uploading ? (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>{transferred} % completed</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <Button title="Post" onPress={submitPost} />
      )}

      <View style={{width: '100%', height: '100%'}}>
        <Image
          source={{uri: image}}
          style={{width: '100%', height: '50%', resizeMode: 'cover'}}
        />
        <FloatingButton image={image} setImage={setImage} />
      </View>
    </View>
  );
};

export default AddPostScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f8ff',
  },
});
