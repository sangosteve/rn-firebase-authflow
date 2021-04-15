// responsible for choose which stack to show
// depending on whether the user is authenticated or not.
import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from '../navigation/AuthStack';
import AppStack from '../navigation/AppStack';

import {AuthContext} from '../contexts/AuthContext';
import Firebase from '../config/Firebase';

const Router = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
export default Router;
