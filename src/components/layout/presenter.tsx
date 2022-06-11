import React, { FC } from "react";
import Header from "../header";
import Auth from "../auth";
import { Main } from "./style";
import { PresenterType } from "./type";

const Presenter: FC<PresenterType> = ({ user, children }) => {
  return (
    <>
      <Header />
      <Main>{!user ? <Auth /> : <>{children}</>}</Main>
    </>
  );
};

export default Presenter;
