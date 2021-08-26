import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../firebase/clientApp";

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
    firebase.firestore().collection("chatList"),
    {}
  );

  if (todolistsLoading && todolists) {
    todolists.docs.map(doc => console.log(doc.data()));
  }

  useEffect(() => {
    (async () => {
      const resTodo = await db.collection("chatList").doc("chat").get();
      setTodos(resTodo.data().chat);
      setIsLoading(false);
    })();
  }, [db]);

  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        setIsLoading(true);
        const docRef = await db.collection("chatList").doc("chat");
        docRef.update({ chat: todos });
        setIsLoading(false);
      })();
    }
  }, [todos, isChangedTodo, db]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    setIsChangedTodo(true);
    const newTodo: Todo = {
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      createdAt: updatedTime,
    };
    console.log([...todos]);
    setTodos([...todos, newTodo]);
    setText("");
  }

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <button onClick={() => logout()}>ログアウト</button>
      <ul>
        {todos &&
          todos.map(todo => (
            <li key={todo.id}>
              <a href={`posts/${todo.id}`}>{todo.message}</a>
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
