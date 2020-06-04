// const firebaseConfig = {
//     apiKey: "AIzaSyDUu2zxpbov0f0e9mT6MWZzNwsm9EXQMO8",
//     authDomain: "sipot-dd4ce.firebaseapp.com",
//     databaseURL: "https://sipot-dd4ce.firebaseio.com",
//     projectId: "sipot-dd4ce",
//     storageBucket: "sipot-dd4ce.appspot.com",
//     messagingSenderId: "302943514376",
//     appId: "1:302943514376:web:8e0469e9ada3ae366386bd"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyADeuC2296BOlAcwkOhphdDGphI-pdSsJM",
  authDomain: "sipot2.firebaseapp.com",
  databaseURL: "https://sipot2.firebaseio.com",
  projectId: "sipot2",
  storageBucket: "sipot2.appspot.com",
  messagingSenderId: "1078821357580",
  appId: "1:1078821357580:web:4053783ed84111e3d28629"
};

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  Vue.prototype.db = db;


new Vue({
    el: '#app',
    vuetify: new Vuetify(),
  })