import React, { FC } from "react";
import Link from "next/link";
import {
  HeaderLayout,
  Inner,
  Title,
  Logo,
  LeftArea,
  Hover,
  Wrapper,
  Icon,
  IconImage,
  Text,
  List,
  ListItem,
  ListLink,
  Button
} from "./style";
import { PresenterType } from "./type";

const Presenter: FC<PresenterType> = ({ user, logout }) => {
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
                    <Link href={`/user/${user.uid}`} as={`/user/${user.uid}`} passHref>
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

export default Presenter;
