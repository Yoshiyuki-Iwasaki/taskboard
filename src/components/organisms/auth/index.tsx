import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../../firebase/clientApp";
import { Main } from "./style";

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.TwitterAuthProvider.PROVIDER_ID],
};

const Auth: React.FC = () => {
  return (
    <Main>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Main>
  );
};

export default Auth;
