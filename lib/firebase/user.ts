import { signInWithPopup} from 'firebase/auth'
import { 
  collection, 
  addDoc, 
  serverTimestamp,
} from "firebase/firestore";
import { 
  getFirestore, 
} from "firebase/firestore";

export const handleGoogleSignIn = async ({
  auth,
  googleProvider,
  logIn,
} : {
    auth : any;
    googleProvider : any;
    logIn : any ;
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
    logIn({idToken,user});

    router.push('/');

  } catch (error) {
    console.error("Google sign-in error:", error);
 