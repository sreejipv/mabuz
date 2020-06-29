import firebase from 'firebase'
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyA60I9VW-HIXyRzdxp8c0Mu8F4UBEWwcKk",
    authDomain: "reactjs-9d544.firebaseapp.com",
    databaseURL: "https://reactjs-9d544.firebaseio.com",
    projectId: "reactjs-9d544",
    storageBucket: "reactjs-9d544.appspot.com",
    messagingSenderId: "496424361002",
    appId: "1:496424361002:web:adfe2cf096defc48f13753"
  };
  

  const fire = firebase.initializeApp(config)
  export const firestore = firebase.firestore();

  export default fire

  export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
  
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
  
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };
  
  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
  
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };