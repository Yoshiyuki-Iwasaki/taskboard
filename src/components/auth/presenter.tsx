import React, { FC } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Main } from "./style";

const Presenter: FC<any> = ({ uiConfig, firebase }) => {
  return (
    <Main>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Main>
  );
};

export default Presenter;
