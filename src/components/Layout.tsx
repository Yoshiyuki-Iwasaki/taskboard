import Header from "./Header";
import Auth from "./Auth";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { LayoutType } from "../declarations/layout";


const Layout: React.FC<any> = ({ children }) => {
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

const Main = styled.main`
  background: #0f5779;
  height: calc(100vh - 80px);
`;

export default Layout;
