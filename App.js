import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AppStack from './navigation/AppStack';
import AuthStack from './navigation/AuthStack';
import Router from './navigation/Router';
import {AuthProvider} from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
