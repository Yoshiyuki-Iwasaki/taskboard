import { useCollection } from "react-firebase-hooks/firestore";
import React, { useState } from "react";
import firebase from "../../../firebase/clientApp";
import { ModalType } from "./type";
import {
  Main,
  Header,
  Title,
  Button,
  Body,
  LeftArea,
  LeftAreaList,
  LeftAreaListItem,
  LeftAreaTitle,
  LeftAreaForm,
  LeftAreaInput,
  RightArea,
  RightAreaButton,
  Overlay,
} from "./style";

const Modal: React.FC<ModalType> = ({
  todos,
  show,
  setShow,
  doc,
  docId,
  modalId,
  params,
  chatList,
}) => {
  const [comment, setComment] = useState<string>("");
  const db = firebase.firestore();
  const [commentList, loading, error] = useCollection(
    db.collection("comment").where("postId", "==", docId),
    {}
  );

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

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }

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
                <LeftAreaList>
                  {commentList.docs.map((data, index) => (
                    <LeftAreaListItem key={index}>
                      {data.data().comment}
                    </LeftAreaListItem>
                  ))}
                  <LeftAreaTitle>コメント</LeftAreaTitle>
                  <LeftAreaForm onSubmit={e => SubmitComment(e)}>
                    <LeftAreaInput
                      type="text"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                  </LeftAreaForm>
                </LeftAreaList>
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

export default Modal;
