import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/clientApp";

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.TwitterAuthProvider.PROVIDER_ID],
};

const Auth = () => {
  return (
    <>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  );
};

export default Auth;
