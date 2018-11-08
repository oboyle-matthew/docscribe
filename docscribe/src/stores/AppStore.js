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
    this.user = '';
    const ref = app.database().ref(`users`);
    ref.on('value', snap => {
      this.allUserInfo = snap.val();
    });
    this.object = {
      comment: null,
      crutches: null,
      pain: null,
      mobility: null,
      pills: null,
      prescription: null,
    };
    this.date = new Date();
  }

  logIn() {
    Object.keys(this.object).forEach(obj => {
      this.object[obj] = this.getFirebaseData(obj);
    });
  }

  getFirebaseData(fb) {
    if (this.allUserInfo[this.user] && this.allUserInfo[this.user][this.getCurrentDate()]) {
      return this.allUserInfo[this.user][this.getCurrentDate()][fb];
    }
    return null;
  }

  getCurrentDate() {
    let dd = this.date.getDate();
    let mm = this.date.getMonth() + 1;
    const yyyy = this.date.getFullYear();

    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }
    return `${mm}:${dd}:${yyyy}`;
  }

  incrementDate() {
    this.date.setDate(this.date.getDate() + 1);
    Object.keys(this.object).forEach(obj => {
      this.object[obj] = this.getFirebaseData(obj);
    });
  }

  decrementDate() {
    this.date.setDate(this.date.getDate() - 1);
    Object.keys(this.object).forEach(obj => {
      this.object[obj] = this.getFirebaseData(obj);
    });
  }

  submitToFirebase() {
    const currDate = this.getCurrentDate();
    this.listRef = this.app.database().ref(`users/${this.user}/${currDate}`);
    this.listRef.set(this.object);
  }

  updateFirebase(part, answer) {
    this.object[part] = answer;
  }

  resetObject() {
    this.object = {
      comment: null,
      crutches: null,
      pain: null,
      mobility: null,
      pills: null,
      prescription: null,
    };
  }
}
