import React, { useEffect, useState } from "react";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { useDocument } from "react-firebase-hooks/firestore";
import CommentItem from "./commentItem";

const commentLists = () => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [comment, setComment] = useState("");
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const router = useRouter();
  const [commentlists, commentlistsLoading, commentlistsError] = useCollection(
    firebase
      .firestore()
      .collection("comment")
      .where("postID", "==", router.query.id)
  );
  const handleCommentSubmit = async e => {
    e.preventDefault();
    if (!comment) return;
    await db.collection("comment").add({
      id: new Date().getTime(),
      message: comment,
      userId: user.uid,
      postID: router.query.id,
      createdAt: updatedTime,
    });
    setComment("");
  };
  if (commentlistsLoading) {
    return <h6>Loading...</h6>;
  }
  if (commentlistsError) {
    return null;
  }
  return (
    <>
      <ul className="mt-14">
        {commentlists &&
          commentlists.docs.map((doc, index) => (
            <CommentItem
              key={index}
              id={doc.data().id}
              message={doc.data().message}
              userId={doc.data().userId}
              postID={doc.data().postID}
              createdAt={doc.data().createdAt}
            />
          ))}
      </ul>
      <form className="mt-3" onSubmit={e => handleCommentSubmit(e)}>
        <input
          className="border-4 border-light-blue-500 border-opacity-25"
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="コメント"
        />
        <input
          type="submit"
          value="追加"
          onClick={e => handleCommentSubmit(e)}
        />
      </form>
    </>
  );
};

export default commentLists;
