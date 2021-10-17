import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";
import styled from "styled-components";
import Link from "next/link";

const Header: React.FC = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const logout = () => {
    firebase.auth().signOut();
  };

  if (loading) return <h6>Loading...</h6>;
  if (error) return null;

  return (
    <HeaderLayout>
      <Inner>
        <Title>
          <Link href="/" as="/" passHref>
            <Logo>taskboard</Logo>
          </Link>
        </Title>
        {user && (
          <>
            <LeftArea>
              <Hover>
                <Wrapper>
                  <Icon>
                    <IconImage src={user.photoURL} />
                  </Icon>
                  <Text>{user.displayName}</Text>
                </Wrapper>
                <List>
                  <ListItem>
                    <Link
                      href={`/user/${user.uid}`}
                      as={`/user/${user.uid}`}
                      passHref
                    >
                      <ListLink>プロフィールを見る</ListLink>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Button onClick={() => logout()}>ログアウト</Button>
                  </ListItem>
                </List>
              </Hover>
            </LeftArea>
          </>
        )}
      </Inner>
    </HeaderLayout>
  );
};

const HeaderLayout = styled.header`
  margin: 0 auto;
  width: 100%;
  background: rgba(243, 244, 246, 0.8);
`;
const Inner = styled.div`
  @media screen and (max-width: 768px) {
  }
  margin: 0 auto;
  padding: 15px 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div``;
const Logo = styled.a`
  transition: opacity 0.6s;
  cursor: pointer;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.025em;

  &:hover {
    opacity: 0.6;
  }
`;
const LeftArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled.span`
  cursor: pointer;
  font-size: 15px;
  color: gray;
  letter-spacing: 0.025em;
  font-weight: 700;
`;
const Hover = styled.div`
  position: relative;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.figure`
  margin-right: 10px;
  width: 40px;
`;
const IconImage = styled.img`
  width: 100%;
  border-radius: 50%;
`;
const List = styled.ul`
  position: absolute;
  top: 50px;
  right: 20px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.6s;

  &:before {
    content: "";
    position: absolute;
    top: -4px;
    right: 25px;
    width: 8px;
    height: 8px;
    border-top: 1px solid gray;
    border-right: 1px solid gray;
    background: gray;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  ${Hover}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;
const ListItem = styled.li`
  background: gray;
`;
const ListLink = styled.a`
  padding: 15px 0;
  display: inline-block;
  border-bottom: 1px solid #fff;
  width: 200px;
  transition: opacity 0.6s;
  cursor: pointer;
  font-size: 13px;
  color: #fff;
  font-weight: 700;

  &:hover {
    opacity: 0.6;
  }
`;
const Button = styled.a`
  padding: 15px 0;
  display: inline-block;
  cursor: pointer;
  width: 200px;
  font-size: 13px;
  color: #fff;
  font-weight: 700;
  transition: opacity 0.6s;

  &:hover {
    opacity: 0.6;
  }
`;

export default Header;
