import React, {useEffect} from 'react';
import {Button, Text, View, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import AddPostScreen from '../screens/AddPostScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import {navigationRef} from '../navigation/navigation.service';
import {navigate} from '../navigation/navigation.service';
import * as RootNavigation from '../navigation/navigation.service';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="RN Social"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);
const AppStack = ({navigation}) => (
  <>
    <Tabs.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#122c91',
      }}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3BDE31',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#fff',
      }}>
      <Tabs.Screen
        name="Home"
        component={FeedStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color, size}) => (
            <Icon name="message-square" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          tabBarLabel: '',
          // tabBarIcon: ({color, size}) => (
          //   <Icon name="plus" color={color} size={size} />
          // ),
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => RootNavigation.navigate('AddPost')}
              style={{
                width: 56,
                height: 56,
                backgroundColor: '#3867d6',
                borderRadius: 28,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Icon name="feather" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  </>
);

export default AppStack;
