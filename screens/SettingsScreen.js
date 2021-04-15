import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';

const SettingsScreen = () => {
  const {signOut} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => signOut()}
        style={{
          width: '100%',
          backgroundColor: '#e84118',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          marginTop: 30,
        }}>
        <Text>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
