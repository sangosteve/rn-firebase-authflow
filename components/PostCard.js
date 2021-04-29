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
} from '../styles/HomeStyles';
const PostCard = ({item, onDelete, onPress}) => {
  const {user} = useContext(AuthContext);
  const likeIcon = item.liked ? 'heart' : 'heart-outline';
  const likeIconColor = item.liked ? '#2e64e5' : '#333';
  let commentText = '';
  let likeText = '';
  if (item.likes == 1) {
    likeText = '1 Like';
  } else if (item.likes > 1) {
    likeText = item.likes + ' Likes';
  } else {
    likeText = 'Like';
  }

  if (item.comments == 1) {
    commentText = '1 Comment';
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comments';
  } else {
    commentText = 'Comment';
  }

  // useEffect(() => {
  //   console.log(user['user'].uid);
  // }, []);

  return (
    <Card>
      <TouchableOpacity onPress={onPress}>
        {/* GO TO  */}
        <UserInfo>
          <UserImg source={{uri: item.userImg}} />
          <UserInfoText>
            <UserName>{item.userName}</UserName>
            <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
          </UserInfoText>
        </UserInfo>
      </TouchableOpacity>
      <PostText>{item.post}</PostText>
      {item.PostImg !== null ? (
        <PostImg source={{uri: item.postImg}} />
      ) : (
        <Divider />
      )}
      <InteractionWrapper>
        <Interaction active={item.liked}>
          <Ionicons name={likeIcon} size={24} color={likeIconColor} />
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="chatbubble-outline" size={24} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
        {auth().currentUser.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="trash-outline" size={24} />
            <InteractionText>
              <Text>Delete Post</Text>
            </InteractionText>
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
