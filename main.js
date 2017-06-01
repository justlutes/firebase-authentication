import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyDbqP7n0r9bteAdEWM_nnTQM1Pf0lbrRzw",
      authDomain: "one-time-password-a6e43.firebaseapp.com",
      databaseURL: "https://one-time-password-a6e43.firebaseio.com",
      projectId: "one-time-password-a6e43",
      storageBucket: "one-time-password-a6e43.appspot.com",
      messagingSenderId: "4541079079"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

Expo.registerRootComponent(App);
