import Header from "./Header";
import Auth from "./Auth";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const Layout = ({ children }:any) => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }
  return (
    <>
      <Header />
      {!user ? <Auth /> : <>{children}</>}
    </>
  );
};

export default Layout;
