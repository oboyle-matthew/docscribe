import React from 'react';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDvH-HK1vUuNC7J1TiL5-EQsbvnXgjHWSA',
  authDomain: 'docscribe-9d421.firebaseapp.com',
  databaseURL: 'https://docscribe-9d421.firebaseio.com',
  storageBucket: 'docscribe-9d421.appspot.com',
};

const app = firebase.apps.length ? firebase.apps[0] : firebase.initializeApp(firebaseConfig);

export default class AppStore extends React.Component {
  static spliceEmail(email) {
    return email.split(/@.+.com/)[0].replace('.', '%24');
  }

  constructor() {
    super();
    this.app = app;
    this.object =
      this.object === undefined
        ? {
            comment: null,
            crutches: null,
            pain: null,
            mobility: null,
            pills: null,
            prescription: null,
          }
        : this.object;
  }

  submitToFirebase = user => {
    this.listRef = this.app.database().ref('users/' + AppStore.spliceEmail(user));
    this.listRef.push(this.object);
  };

  updateFirebase(part, answer) {
    this.object[part] = answer;
  }
}
