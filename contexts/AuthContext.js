import React, {useState, createContext, useEffect} from 'react';
import {Alert} from 'react-native';
// import Firebase from '../config/Firebase';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
export const AuthContext = createContext();

export const AuthProvider = props => {
  const [test, setTest] = useState('Test');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStorageData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@AuthData');
      if (jsonValue !== null) {
        setUser(jsonValue);
        console.log(jsonValue);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //loading finished
      setLoading(false);
    }
  };

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorageData function.
    loadStorageData();
  }, []);

  const storeAuthData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@AuthData', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const destroyAuthData = async () => {
    try {
      await AsyncStorage.removeItem('@AuthData');
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@AuthData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  return (
    <AuthContext.Provider
      value={{
        test,
        user,
        setUser,
        signIn: async (email, password) => {
          try {
            // console.log(email, password);
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then(function (user) {
                setUser(user);

                //storeAuthData(user.uid);
                //console.log(Firebase.auth().currentUser.uid);
                storeAuthData(auth().currentUser.uid);
              });
          } catch (err) {
            console.log(err);
          }
        },

        signUp: async (email, password) => {
          try {
            console.log(email, password);
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (err) {
            console.log(err);
          }
        },

        signOut: async () => {
          await auth()
            .signOut()
            .then(() => {
              console.log('Sign Out Sucessful');
              setUser(null);
              destroyAuthData();
            })
            .catch(error => {
              console.log(error);
            });
        },
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
