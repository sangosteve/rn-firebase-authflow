import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import PostCard from '../components/PostCard';
import {Container} from '../styles/HomeStyles';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [feeders, setFeeders] = useState([
    {
      id: 1,
      username: 'Collen',
      image: require('../assets/images/profile_images/user1.png'),
    },
    {
      id: 2,
      username: 'Allen',
      image: require('../assets/images/profile_images/user2.jpg'),
    },
    {
      id: 3,
      username: 'Cassy',
      image: require('../assets/images/profile_images/user3.jpg'),
    },
    {
      id: 4,
      username: 'Lynn',
      image: require('../assets/images/profile_images/user4.jpg'),
    },
    {
      id: 5,
      username: 'Von',
      image: require('../assets/images/profile_images/user5.jpg'),
    },
    {
      id: 6,
      username: 'Tracy',
      image: require('../assets/images/profile_images/user6.jpg'),
    },
    {
      id: 7,
      username: 'Wendy',
      image: require('../assets/images/profile_images/user7.jpg'),
    },
  ]);

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
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

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
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomColor: '#AAB8C2',
          borderBottomWidth: 1,
          height: 150,
        }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          sytle={styles.latestFeedUsers}
          contentContainerStyle={{flexGrow: 1, marginTop: 20, padding: 10}}>
          <TouchableOpacity style={styles.addFeederButton}>
            <Ionicons name="add-outline" size={40} color="#0984E3" />
          </TouchableOpacity>

          {feeders.map(user => (
            <TouchableOpacity style={styles.feederWrapper} key={user.id}>
              <Image source={user.image} style={styles.feederImg} />
              <Text>{user.username}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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

  latestFeedUsers: {
    minWidth: '100%',
    flexDirection: 'row',
    marginTop: 70,
    padding: 20,
    flex: 1,
  },

  addFeederButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#A7D9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feederWrapper: {
    width: 60,
    height: 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  feederImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#1DA1F2',
  },
});
