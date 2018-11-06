import React from 'react';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDvH-HK1vUuNC7J1TiL5-EQsbvnXgjHWSA",
  authDomain: "docscribe-9d421.firebaseapp.com",
  databaseURL: "https://docscribe-9d421.firebaseio.com",
  storageBucket: "docscribe-9d421.appspot.com",
};

const app = (firebase.apps.length) ? firebase.apps[0] : firebase.initializeApp(firebaseConfig);

export default class AppStore extends React.Component {

  submitToFirebase = (user) => {
    this.listRef = this.app.database().ref("users/" + user.split(/@.+.com/)[0].replace(".", "%24"));
    this.listRef.push(this.object);
  };

  updateFirebase(part, answer) {
    console.log(this.object);
    this.object[part] = answer;
  }

  constructor() {
    super();
    this.app = app;
    this.object = (this.object === undefined) ?
      {"comment": null, "crutches": null, "pain": null, "mobility": null, "pills": null, "prescription": null} :
      this.object;
  }
}
