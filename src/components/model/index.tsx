import React, { useState, FC } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../firebase/clientApp';
import { ModalType } from './type';
import Presenter from './presenter';
import { useCloseModal } from './hooks';

const Modal: FC<ModalType> = ({
  todos,
  show,
  setShow,
  doc,
  docId,
  modalId,
  params,
  chatList,
}) => {
  const [comment, setComment] = useState<string>('');
  const db = firebase.firestore();
  const [commentList, loading, error] = useCollection(
    db.collection('comment').where('postId', '==', docId),
    {}
  );
  const closeModal = useCloseModal(setShow);

  const removeModalButton = async (params): Promise<any> => {
    db.collection('chatList')
      .doc(chatList?.docs[params.chatIndex].id)
      .update({
        items: firebase.firestore.FieldValue.arrayRemove(
          chatList?.docs[params.chatIndex].data().items[params.todosIndex]
        ),
      });
    todos.items.splice(params.todosIndex, 1);
    setShow(false);
  };

  const submitComment = async (e): Promise<any> => {
    e.preventDefault();
    if (!comment) return;
    await db.collection('comment').add({
      id: new Date().getTime(),
      comment: comment,
      postId: docId,
      // createdAt: new Date(),
    });
    setComment('');
  };

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
