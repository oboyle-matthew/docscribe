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

  getCurrentDate() {
    let dd = this.date.getDate();
    let mm = this.date.getMonth() + 1;
    const yyyy = this.date.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    return mm + ':' + dd + ':' + yyyy;
  }

  getDataFromFirebase(name) {
    var ref = app.database().ref("users/" + app.user + "/" + this.getCurrentDate() + "/" + name);
    ref.on("value", snap => {
      console.log(snap);
    });
  }

  incrementDate() {
    this.date.setDate(this.date.getDate() + 1);
  }

  decrementDate() {
    this.date.setDate(this.date.getDate() - 1);
  }

  submitToFirebase = (user) => {
    var user = user.split(/@.+.com/)[0].replace(".", "%24");
    var curr_date = this.getCurrentDate();
    this.listRef = this.app.database().ref("users/" + user + "/" + curr_date);
    this.listRef.set(this.object);
  };

  updateFirebase(part, answer) {
    // console.log(this.object);
    this.object[part] = answer;
  }

  resetObject() {
    this.object = {"comment": null, "crutches": null, "pain": null, "mobility": null, "pills": null, "prescription": null};
  }

  constructor() {
    super();
    this.app = app;
    this.user = "";
    this.object = (this.object === undefined) ?
      {"comment": null, "crutches": null, "pain": null, "mobility": null, "pills": null, "prescription": null} :
      this.object;
    this.date = new Date();
  }
}
