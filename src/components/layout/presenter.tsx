import React, { FC } from "react";
import Header from "../header";
import Auth from "../auth";
import { Main } from "./style";

const Presenter: FC<any> = ({ user, children }) => {
  return (
    <>
      <Header />
      <Main>{!user ? <Auth /> : <>{children}</>}</Main>
    </>
  );
};

export default Presenter;
