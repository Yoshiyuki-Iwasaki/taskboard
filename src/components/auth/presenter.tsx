import React, { FC } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Main } from "./style";
import { PresenterType } from "./type";

const Presenter: FC<PresenterType> = ({ uiConfig, firebase }) => {
  return (
    <Main>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Main>
  );
};

export default Presenter;
