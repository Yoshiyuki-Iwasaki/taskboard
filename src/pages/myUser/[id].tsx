import type { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import Layout from "../../components/layout";
import firebase from "../../firebase/clientApp";
import styled from "styled-components";

const UserDetailPage: NextPage = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) return <h6>Loading...</h6>;

  if (error) return null;

  return (
    <Layout>
      <Main>
        <Icon>
          <IconImage src={user.photoURL} />
        </Icon>
        <Text>{user.displayName}</Text>
      </Main>
    </Layout>
  );
};

export default UserDetailPage;

const Main = styled.div`
  margin: 0px auto;
  padding: 20px 0;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  background: #fff;
  text-align: center;
  transform: translate(-50%, -50%);
`;
const Icon = styled.figure`
  margin: 0px auto;
  width: 70px;
  border: 3px solid rgb(15, 87, 121);
  border-radius: 50%;
`;
const IconImage = styled.img`
  width: 100%;
  border-radius: 50%;
`;
const Text = styled.span`
  margin-top: 15px;
  display: inline-block;
  cursor: pointer;
  font-size: 15px;
  color: gray;
  letter-spacing: 0.025em;
  font-weight: 700;
`;
