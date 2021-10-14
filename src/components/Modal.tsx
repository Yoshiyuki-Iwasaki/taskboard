import React from 'react'
import styled from "styled-components";
import firebase from "../firebase/clientApp";
const Header = styled.div`
`;

const Main = styled.div`
  padding: 20px 30px;
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
  font-size: 26px;
  line-height: 24px;
  font-weight: 700;
`;

const Body = styled.div`
  margin-top: 30px;
  display: flex;
`;

const LeftArea = styled.div`
  width: 80%;
`;

console.log('test');

const LeftAreaComment = styled.p`
  font-size: 16px;
`;

const LeftAreaInput = styled.textarea`
  font-size: 14px;
`;

const RightArea = styled.div`
  width: 20%;
`;

const RightAreaButton = styled.div`
  padding: 15px;
  background: red;
  font-size: 14px;
  color: #fff;
  font-weight: 700;
`;

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

const Modal = ({
  todos,
  show,
  setShow,
  doc,
  docId,
  modalId,
  params,
  chatList,
}) => {
  const db = firebase.firestore();
  const closeModal = () => {
    setShow(false);
  };

  const clickRemoveLikeButton = async (params): Promise<any> => {
    db.collection("chatList")
      .doc(chatList?.docs[params.chatIndex].id)
      .update({
        items: firebase.firestore.FieldValue.arrayRemove(
          chatList?.docs[params.chatIndex].data().items[params.todosIndex]
        ),
      });
    todos.items.splice(params.todosIndex, 1);
    setShow(false);
  };

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
              <LeftArea>
                <LeftAreaComment>コメント</LeftAreaComment>
                <LeftAreaInput type="text" />
              </LeftArea>
              <RightArea>
                <RightAreaButton onClick={() => clickRemoveLikeButton(params)}>
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
