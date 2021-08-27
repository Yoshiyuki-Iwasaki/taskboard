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
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text) return;
    setIsChangedTodo(true);
    await db.collection("comment").add({
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      postID: router.query.id,
      createdAt: updatedTime,
    });
    setText("");
  };
  return (
    <>
      <p>{todo.message}</p>
      <ul>
        {commentlists &&
          commentlists.docs.map(doc => (
            <li key={doc.data().id}>
              <a href={`posts/${doc.data().id}`}>{doc.data().message}</a>
            </li>
          ))}
      </ul>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input type="submit" value="追加" onClick={e => handleSubmit(e)} />
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
