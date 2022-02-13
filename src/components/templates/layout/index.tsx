import Header from "../../organisms/header";
import Auth from "../../organisms/auth";
import firebase from "../../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { Main } from "./style";
import { LayoutType } from "./type";

const Layout: React.FC<LayoutType> = ({ children }) => {
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
      <Main>{!user ? <Auth /> : <>{children}</>}</Main>
    </>
  );
};

export default Layout;
