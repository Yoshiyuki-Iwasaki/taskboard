import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { LayoutType } from "./type";
import Presenter from "./presenter";

const Layout: React.FC<LayoutType> = ({ children }) => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }
  return <Presenter user={user}>{children}</Presenter>;
};

export default Layout;
