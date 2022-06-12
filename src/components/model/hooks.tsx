import firebase from "../../firebase/clientApp";
import { useState } from "react";

// モーダルを閉じるCustom hooks.
export const useCloseModal: any = ({ setShow }) => {
  const closeModal = () => {
    setShow(false);
  };
  return closeModal;
};

// モーダルボタンを削除するCustom hooks.
export const useRemoveModalButton: any = ({ db, chatList, todos, setShow }) => {
  const removeModalButton = async (params): Promise<any> => {
    db.collection("chatList")
      .doc(chatList?.docs[params.chatIndex].id)
      .update({
        items: firebase.firestore.FieldValue.arrayRemove(
          chatList?.docs[params.chatIndex].data().items[params.todosIndex]
        )
      });
    todos.items.splice(params.todosIndex, 1);
    setShow(false);
  };
  return removeModalButton;
};

// コメントを追加する削除するCustom hooks.
export const useSubmitComment: any = ({ db, docId }) => {
  const [comment, setComment] = useState<string>("");

  const submitComment = async (e): Promise<any> => {
    e.preventDefault();
    if (!comment) return;
    await db.collection("comment").add({
      id: new Date().getTime(),
      comment: comment,
      postId: docId
      // createdAt: new Date(),
    });
    setComment("");
  };
  return { comment, setComment, submitComment };
};
