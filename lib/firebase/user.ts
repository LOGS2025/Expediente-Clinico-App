import { signInWithPopup} from 'firebase/auth'
import { 
  collection, 
  addDoc, 
  serverTimestamp,
} from "firebase/firestore";
import { 
  getFirestore, 
} from "firebase/firestore";

export const sendLogIntoFirebaseDB = async ({
  auth,
  firestore,
}:{
    auth: any,
    firestore: any;
  }) => {
  const { uid } = auth.currentUser;
  const loginRef = collection(firestore, 'logins')
  try {
      await addDoc(loginRef, {
      createdAt: serverTimestamp(),
      uid,
    });
    return
  } catch (error) {
    console.error("Error sending log:", error);
    return;
  };
};

export const handleGoogleSignIn = async ({
  auth,
  googleProvider,
} : {
    auth : any;
    googleProvider : any;
  }) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const firestore = getFirestore();

    // Get the ID token
    const idToken = await user.getIdToken();

    // Store UID in a simple cookie for middleware
    document.cookie = `uid=${user.uid}; path=/; max-age=604800; SameSite=Lax`;

    // Update your Zustand store
    console.log(idToken, user);
    //logIn({idToken , user});
    sendLogIntoFirebaseDB({auth, firestore})

  } catch (error) {
    console.error("Google sign-in error:", error);
  }
} 