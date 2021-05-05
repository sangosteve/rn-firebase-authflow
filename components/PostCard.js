import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../contexts/AuthContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
  ContentWrapper,
} from '../styles/HomeStyles';
const PostCard = ({item, onDelete, onPress}) => {
  const [userData, setUserData] = useState(null);
  const {user} = useContext(AuthContext);
  const likeIcon = item.liked ? 'heart' : 'heart-outline';
  const likeIconColor = item.liked ? '#2e64e5' : '#AAB8C2';
  let commentText = '';
  let likeText = '';
  if (item.likes > 1) {
    likeText = item.likes + ' Likes';
  } else {
    likeText = 'Like';
  }

  if (item.comments > 1) {
    commentText = item.comments;
  } else {
    commentText = '';
  }

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then(documentSnapShot => {
        if (documentSnapShot.exists) {
          setUserData(documentSnapShot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card>
      {/* <TouchableOpacity onPress={onPress}> */}
      {/* GO TO  */}
      <UserImg source={{uri: userData ? userData.userImg : null}} />
      <ContentWrapper>
        <UserInfo>
          <UserInfoText>
            <UserName>
              {userData ? userData.fname : 'Test'}{' '}
              {userData ? userData.lname : 'Test'}
            </UserName>
            <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
          </UserInfoText>
        </UserInfo>
        {/* </TouchableOpacity> */}
        <PostText>{item.post}</PostText>
        {item.postImg !== null ? (
          <PostImg source={{uri: item.postImg}} />
        ) : null}
        <InteractionWrapper>
          <Interaction active={item.liked}>
            <Ionicons name={likeIcon} size={24} color={likeIconColor} />
            <InteractionText active={item.liked}></InteractionText>
          </Interaction>
          <Interaction>
            <Ionicons name="chatbubble-outline" color="#AAB8C2" size={24} />
            <InteractionText>{commentText}</InteractionText>
          </Interaction>
          {auth().currentUser.uid == item.userId ? (
            <Interaction onPress={() => onDelete(item.id)}>
              <Ionicons name="trash-outline" color="#AAB8C2" size={24} />
            </Interaction>
          ) : null}
          <Interaction>
            <Ionicons name="arrow-redo-outline" color="#AAB8C2" size={24} />
            <InteractionText>{commentText}</InteractionText>
          </Interaction>
        </InteractionWrapper>
      </ContentWrapper>
    </Card>
  );
};

export default PostCard;
