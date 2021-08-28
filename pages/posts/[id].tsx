import React, { useEffect, useState} from "react";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
interface Comment {
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}

const index = ({ todo }) => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [people, setPeople] = useState("");
  const [tag, setTag] = useState("");
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState<Comment[]>([]);
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const router = useRouter();

  const [peoplelists, peoplelistsLoading, peoplelistsError] = useCollection(
    firebase
      .firestore()
      .collection("people")
      .where("postID", "==", router.query.id)
  );
  const [taglists, taglistsLoading, taglistsError] =
    useCollection(
      firebase
        .firestore()
        .collection("tag")
        .where("postID", "==", router.query.id)
  );
  const [commentlists, commentlistsLoading, commentlistsError] =
    useCollection(
      firebase
        .firestore()
        .collection("comment")
        .where("postID", "==", router.query.id)
  );

  const handlePeopleSubmit = async e => {
    e.preventDefault();
    if (!people) return;
    await db.collection("people").add({
      id: new Date().getTime(),
      text: people,
      postID: router.query.id,
      createdAt: updatedTime,
    });
    setPeople("");
  };

  const handleTagSubmit = async e => {
    e.preventDefault();
    if (!tag) return;
    await db.collection("tag").add({
      id: new Date().getTime(),
      name: tag,
      postID: router.query.id,
      createdAt: updatedTime,
    });
    setTag("");
  };

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

  return (
    <>
      <p>{todo.message}</p>
      <h3>担当者</h3>
      <ul>
        {peoplelists &&
          peoplelists.docs.map(doc => (
            <li key={doc.data().id}>
              <a href={`posts/${doc.data().id}`}>{doc.data().text}</a>
            </li>
          ))}
      </ul>
      <form onSubmit={e => handlePeopleSubmit(e)}>
        <input
          type="text"
          value={people}
          onChange={e => setPeople(e.target.value)}
        />
        <input
          type="submit"
          value="追加"
          onClick={e => handlePeopleSubmit(e)}
        />
      </form>
      <h3>タグ</h3>
      <ul>
        {taglists &&
          taglists.docs.map(doc => (
            <li key={doc.data().id}>
              <a href={`posts/${doc.data().id}`}>{doc.data().name}</a>
            </li>
          ))}
      </ul>
      <form onSubmit={e => handleTagSubmit(e)}>
        <input
          type="text"
          value={tag}
          onChange={e => setTag(e.target.value)}
        />
        <input type="submit" value="追加" onClick={e => handleTagSubmit(e)} />
      </form>
      <h3>コメント</h3>
      <ul>
        {commentlists &&
          commentlists.docs.map(doc => (
            <li key={doc.data().id}>
              <a href={`posts/${doc.data().id}`}>{doc.data().message}</a>
            </li>
          ))}
      </ul>
      <form onSubmit={e => handleCommentSubmit(e)}>
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
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

export default index

export const getStaticPaths = async () => {
  const db = firebase.firestore();
  const resTodo = await db.collection("chatList").get();
  const paths = resTodo.docs.map(todo => `/posts/${todo.data().id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const db = firebase.firestore();
  const id = context.params.id;
  const resTodo = await db.collection("chatList").get();
  const todos = resTodo.docs.map(todo => todo.data());
  const array = todos.find(todo => todo.id == id);
  return {
    props: {
      todo: array,
    },
  };
};
