import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../firebase/clientApp";

interface Todo {
  id: number;
  message: string;
  userId: string;
  comments: string[];
  people: string[];
  tag: string[];
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
    firebase.firestore().collection("chatList"),
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
      comments: [],
      people: [],
      tag: [],
    });
    setText("");
  };
  const logout = () => {
    firebase.auth().signOut();
  };
  return (
    <>
      <button onClick={() => logout()}>ログアウト</button>
      <ul>
        {todolists &&
          todolists.docs.map(doc => (
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
}

export default taskList
