import React, { useState, FC } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/clientApp";
import { ModalType } from "./type";
import Presenter from "./presenter";
import { useCloseModal, useRemoveModalButton, useSubmitComment } from "./hooks";

const Modal: FC<ModalType> = ({ todos, show, setShow, doc, docId, modalId, params, chatList }) => {
  const db = firebase.firestore();
  const [commentList, loading, error] = useCollection(db.collection("comment").where("postId", "==", docId), {});
  const closeModal = useCloseModal(setShow);
  const removeModalButton = useRemoveModalButton(db, chatList, todos, setShow);
  const { comment, setComment, submitComment } = useSubmitComment(db, docId);

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }

  return (
    <Presenter
      params={params}
      docId={docId}
      modalId={modalId}
      show={show}
      doc={doc}
      closeModal={closeModal}
      commentList={commentList}
      comment={comment}
      setComment={setComment}
      submitComment={submitComment}
      removeModalButton={removeModalButton}
    />
  );
};

export default Modal;
