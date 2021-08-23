import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/clientApp";

interface Todo {
  id: number;
  message: string;
  // userId: string;
  createdAt: string;
}

const taskList = () => {
  const db = firebase.firestore();
  const [text, setText] = useState("");
  const [user, loading, error] = useAuthState(firebase.auth());
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    setIsChangedTodo(true);
    const newTodo: Todo = {
      id: new Date().getTime(),
      message: text,
      // userId: user.uid,
      createdAt: updatedTime,
    };
    setTodos([...todos, newTodo]);
    setText("");
  }

  return (
    <>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.message}</li>
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
