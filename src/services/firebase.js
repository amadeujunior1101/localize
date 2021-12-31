import firebaseConfig from './firebase.config';
import firebase_app from 'firebase/app';
import 'firebase/firestore';
// import "firebase/storage";
// import "firebase/messaging";

if (!firebase_app.apps.length) {
  firebase_app.initializeApp(firebaseConfig);
}

/**
 *
 */
export const FirestoreFirebaseConfig = () => {
  const db = firebase_app.firestore();
  return db;
};

// /**
//  *
//  */
// export const FCM_Test = () => {
//   const db = firebase_app.messaging();
//   return db;
// };

// /**
//  *
//  */
// export const StorageFirebaseConfig = () => {
//   const db = firebase_app.storage();
//   return db;
// };

// /**
//  *
//  */
// export const firebase = () => {
//   return firebase_app;
// };
