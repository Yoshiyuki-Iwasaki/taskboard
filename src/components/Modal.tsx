import { useState } from 'react'
import styled from "styled-components";
import firebase from "../firebase/clientApp";

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
  const [category, setCategory] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const db = firebase.firestore();
  const closeModal = () => {
    setShow(false);
  };

  const removeModalButton = async (params): Promise<any> => {
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

  const SubmitCategory = async (e): Promise<any> => {
    e.preventDefault();
    if (!category) return;
    await db.collection("category").add({
      id: new Date().getTime(),
      category_name: category,
      postId: docId,
      // createdAt: new Date(),
    });
    setCategory("");
  };

  const SubmitComment = async (e): Promise<any> => {
    e.preventDefault();
    if (!comment) return;
    await db.collection("comment").add({
      id: new Date().getTime(),
      comment: comment,
      postId: docId,
      // createdAt: new Date(),
    });
    setComment("");
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
                <LeftAreaTitle>カテゴリー</LeftAreaTitle>
                <LeftAreaForm onSubmit={e => SubmitCategory(e)}>
                  <LeftAreaInput
                    type="text"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  />
                </LeftAreaForm>
                <LeftAreaTitle>コメント</LeftAreaTitle>
                <LeftAreaForm onSubmit={e => SubmitComment(e)}>
                  <LeftAreaInput
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                </LeftAreaForm>
              </LeftArea>
              <RightArea>
                <RightAreaButton onClick={() => removeModalButton(params)}>
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

const Header = styled.div``;

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

const LeftAreaTitle = styled.p`
  font-size: 16px;
`;

const LeftAreaForm = styled.form`
`;

const LeftAreaInput = styled.input`
  font-size: 14px;
`;

const RightArea = styled.div`
  width: 20%;
`;

const RightAreaButton = styled.div`
  padding: 8px 15px;
  background: red;
  font-size: 14px;
  color: #fff;
  font-weight: 700;
`;

const Overlay = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.64);
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

export default Modal
