// responsible for choose which stack to show
// depending on whether the user is authenticated or not.
import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import AuthStack from '../navigation/AuthStack';
import AppStack from '../navigation/AppStack';

import {AuthContext} from '../contexts/AuthContext';
import Firebase from '../config/Firebase';
import {navigationRef} from './navigation.service';

const Router = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; //unsubscribe on unmount;
  }, []);
  if (initializing) return null;
  return (
    <NavigationContainer ref={navigationRef}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
export default Router;
