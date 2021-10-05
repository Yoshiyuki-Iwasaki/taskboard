import React from 'react'
import styled from "styled-components";
import firebase from "../firebase/clientApp";
const Header = styled.div`
`;

const Main = styled.div`
  position: fixed;
  background: #fff;
  width: 768px;
  min-height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const Button = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Title = styled.p`
  margin: 20px 40px 8px 56px;
  font-size: 20px;
  line-height: 24px;
`;

const Body = styled.div``;

const LeftArea = styled.div``;

const RightArea = styled.div``;

const RightAreaButton = styled.div``;

const Overlay = styled.div`
  position: fixed;
  background: rgba(0,0,0,.64);
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;


const Modal = ({ show, setShow, doc, docId, modalId }) => {
  const db = firebase.firestore();
  const closeModal = () => {
    setShow(false);
  };

  const clickRemoveLikeButton = async (): Promise<any> => {
    const citiesRef = await db.collection("chatList").get();
    citiesRef.forEach((postDoc) => {
      console.log("postDoc.id", postDoc.id);
    });
  };

  console.log("doc", doc);

  return (
    <>
      {docId == modalId && show ? (
        <>
          <Main>
            <Header>
              <Title>{doc.message}</Title>
              <Button onClick={() => closeModal()}>閉じる</Button>
            </Header>
            <Body>
              <LeftArea></LeftArea>
              <RightArea>
                <RightAreaButton onClick={() => clickRemoveLikeButton()}>
                  削除
                </RightAreaButton>
              </RightArea>
            </Body>
          </Main>
          <Overlay onClick={() => closeModal()} />
        </>
      ) : null}
    </>
  );
};

export default Modal
