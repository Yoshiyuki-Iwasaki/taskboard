import React, { FC } from "react";
import firebase from "../../firebase/clientApp";
import Presenter from "./presenter";

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.TwitterAuthProvider.PROVIDER_ID]
};

const Auth: FC = () => {
  return <Presenter uiConfig={uiConfig} firebase={firebase} />;
};

export default Auth;
