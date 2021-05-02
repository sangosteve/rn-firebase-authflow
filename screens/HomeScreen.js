import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import PostCard from '../components/PostCard';
import {Container} from '../styles/HomeStyles';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPosts = async () => {
    try {
      const list = [];
      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          // console.log('Total Posts:', querySnapshot.size);
          querySnapshot.forEach(doc => {
            const {
              userId,
              post,
              postImg,
              postTime,
              liked,
              likes,
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              userImg: 'https://picsum.photos/200/300',
              postTime: postTime,
              post: post,
              postImg: postImg,
              liked,
              likes,
              comments,
            });
          });
        });
      setPosts(list);
      if (loading) {
        setLoading(false);
      }
      // console.log('Posts', list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //Refresh After Delete
  useEffect(() => {
    fetchPosts();
  }, [deleted]);

  //handle Delete to Allow use To confirm deleteion
  const handleDelete = postId => {
    Alert.alert(
      'Delete Post',
      'Are you sure?',
      [
        ({
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed...'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        }),
      ],
      {cancelable: false},
    );
  };

  //Function To Delete Post
  const deletePost = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            //delete postImage from storage ref
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(
                  `${postImg} has been deleted from the storage successfully`,
                );
                //delete the data after deleting the image
                deleteFirestoreData(postId);
              })
              .catch(e => console.log(e));
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert('Post Deleted sucessfully');
      })
      .catch(e => {
        console.log('error deleting post');
      });
  };
  return (
    <Container>
      <FlatList
        style={{width: '100%'}}
        data={posts}
        renderItem={({item}) => (
          <PostCard
            item={item}
            onDelete={handleDelete}
            onPress={() =>
              navigation.navigate('HomeProfile', {userId: item.userId})
            }
          />
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
