import React from "react";
import { auth, provider } from "./../firebase/firebaseConfig";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
const Auth = () => {
  const handleClick = () => {
    signInWithRedirect(auth, provider);
  };
  return (
    <div className="auth">
      <h1>Chat Odası</h1>
      <p>Devam Etmek İçin Giriş Yapın</p>

      <button onClick={handleClick}>
        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" />
        <span>Google ile gir</span>
      </button>
    </div>
  );
};

export default Auth;
