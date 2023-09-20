import firebase from "firebase/app";
import { auth } from "../../config/firebase";

function GoogleSignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
    <br />
      <button className="sign-in btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

export default GoogleSignIn;
