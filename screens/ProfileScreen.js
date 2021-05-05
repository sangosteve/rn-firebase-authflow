import React, {useContext, useState, useEffect} from 'react';
import {
  Button,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../contexts/AuthContext';
import PostCard from '../components/PostCard';
import {
  Container,
  EditButton,
  FollowButton,
  HeaderWrapper,
  InteractionButtonsWrapper,
  InteractionWrapper,
  MessageButton,
  UserNameText,
  UserNameWrapper,
  UserStatusText,
  UserStatsWrapper,
  FollowButtonText,
  PostStats,
  PostStatsText,
  PostStatsCount,
  FollowersStats,
  FollowersStatsCount,
  FollowersStatsText,
  FollowingStats,
  FollowingStatsCount,
  FollowingStatsText,
  ContentWrapper,
  UserImage,
  UserPostsWrapper,
} from '../styles/ProfileStyles';

const ProfileScreen = ({navigation, route}) => {
  const {user, signOut} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleDelete = () => {};

  const fetchPosts = async () => {
    try {
      const list = [];
      await firestore()
        .collection('posts')
        .where(
          'userId',
          '==',
          route.params ? route.params.userId : auth().currentUser.uid,
        )
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

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(route.params ? route.params.userId : auth().currentUser.uid)
      .get()
      .then(documentSnapShot => {
        if (documentSnapShot.exists) {
          setUserData(documentSnapShot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
    fetchPosts();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <Container>
      <InteractionWrapper>
        {route.params ? (
          <>
            <InteractionButtonsWrapper>
              <MessageButton>
                <Icon name="mail" color="#39c4ff" size={30} />
              </MessageButton>
              <FollowButton>
                <FollowButtonText>Follow</FollowButtonText>
              </FollowButton>
            </InteractionButtonsWrapper>
          </>
        ) : (
          <View>
            <EditButton onPress={() => navigation.navigate('EditProfile')}>
              <Icon name="settings" color="#FFF" size={30} />
            </EditButton>
            <Button title="Logout" onPress={signOut} />
          </View>
        )}
      </InteractionWrapper>
      <ContentWrapper>
        <HeaderWrapper>
          <UserNameWrapper>
            <UserImage source={{uri: userData ? userData.userImg : null}} />
            <UserNameText>
              {userData ? userData.fname : ''} {''}{' '}
              {userData ? userData.lname : ''}
            </UserNameText>

            <UserStatusText>{userData ? userData.about : ''}</UserStatusText>
          </UserNameWrapper>
        </HeaderWrapper>

        <UserStatsWrapper>
          <PostStats>
            <PostStatsCount>{posts.length}</PostStatsCount>
            <PostStatsText>Posts</PostStatsText>
          </PostStats>

          <FollowersStats>
            <FollowersStatsCount>1350</FollowersStatsCount>
            <FollowersStatsText>Followers</FollowersStatsText>
          </FollowersStats>

          <FollowingStats>
            <FollowingStatsCount>2130</FollowingStatsCount>
            <FollowingStatsText>Following</FollowingStatsText>
          </FollowingStats>
        </UserStatsWrapper>
        <UserPostsWrapper>
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
        </UserPostsWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default ProfileScreen;
