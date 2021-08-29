import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../firebase/clientApp";
import Header from "./Header";
interface Todo {
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}

const taskList = () => {
  const db = firebase.firestore();
  const [text, setText] = useState("");
  const [user, loading, error] = useAuthState(firebase.auth());
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);

  const [todolists, todolistsLoading, todolistsError] = useCollection(
    firebase.firestore().collection("chatList").orderBy("id",'desc'),
    {}
  );

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text) return;
    setIsChangedTodo(true);
    await db.collection("chatList").add({
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      createdAt: updatedTime,
    });
    setText("");
  };
  const logout = () => {
    firebase.auth().signOut();
  };
  if (todolistsLoading) {
    return <h6>Loading...</h6>;
  }
  if (todolistsError) {
    return null;
  }
  return (
    <>
      <Header />
      <ul className="flex flex-wrap max-w-screen-lg mt-28 mx-auto">
        {todolists &&
          todolists.docs.map(doc => (
            <li
              key={doc.data().id}
              className="my-1 w-1/4 px-5 py-5 border-4 border-light-blue-500 border-opacity-25"
            >
              <a href={`posts/${doc.data().id}`}>{doc.data().message}</a>
            </li>
          ))}
      </ul>
      <form onSubmit={e => handleSubmit(e)} className="mt-5	text-center">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          className="border-4 border-light-blue-500 border-opacity-25"
        />
        <input type="submit" value="追加" onClick={e => handleSubmit(e)} />
      </form>
    </>
  );
}

export default taskList
