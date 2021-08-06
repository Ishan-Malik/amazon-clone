import firebase from 'firebase';
const firebaseConfig = {
 // apiKey:::your api key,
 // authDomain:::firebase ,
  //projectId:::firebase,
  //storageBucket::firebase,
  //messagingSender:::=>,
  //appId: >>firebase,
  //measurementId:::firebase
};
const firebaseApp=firebase.initializeApp(firebaseConfig);
const auth=firebase.auth();
const db=firebaseApp.firestore();
export {db,auth};