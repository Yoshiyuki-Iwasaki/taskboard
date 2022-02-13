import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../../firebase/clientApp";
import styled from "styled-components";

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

const Main = styled.div`
  position: fixed;
  padding: 15px;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Auth;
