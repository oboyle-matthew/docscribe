import React from 'react';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDvH-HK1vUuNC7J1TiL5-EQsbvnXgjHWSA",
  authDomain: "docscribe-9d421.firebaseapp.com",
  databaseURL: "https://docscribe-9d421.firebaseio.com",
  storageBucket: "docscribe-9d421.appspot.com",
};


const app = firebase.initializeApp(firebaseConfig);

export default class AppStore extends React.Component {

  submitToFirebase = () => {
    this.listRef.push(this.object);
  };

  deleteTodo(item) {
    Object.keys(this.snap).forEach(key => {
      if (this.snap[key] === item) {
        this.listRef.child(key).remove();
      }
    })
  }

  updateFirebase(part, answer) {
    this.object[part] = answer;
  }

  this.app.database.ref("users/moboyle").push(token)l

  constructor() {
    super();
    this.app = app;
    this.listRef = this.app.database().ref("info");
    this.snap = {};
    this.list = [];
    this.object = (this.object === undefined) ?
      {"comment": null, "crutches": null, "pain": null, "mobility": null, "pills": null, "prescription": null} :
      this.object;
    this.update();
  }

  update() {
    this.listRef.on("value", snap => {
      this.list = Object.keys(snap.toJSON()).map(key => snap.toJSON()[key]);
      this.snap = snap.toJSON();
    });
  }
}
