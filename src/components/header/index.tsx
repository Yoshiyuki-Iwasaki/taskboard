import React, { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/clientApp";
import { useLogout } from "./hooks";
import Presenter from "./presenter";

const Header: FC = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const logout = useLogout();

  if (loading) return <h6>Loading...</h6>;

  if (error) return null;

  return <Presenter user={user} logout={logout} />;
};

export default Header;
