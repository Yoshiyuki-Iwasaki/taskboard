import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import firebase from "../../firebase/clientApp";

interface Todo {
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}

const Form = styled.form`
  padding: 10px 0;
  text-align: center;
`;

const TaskInput = ({
  chatIndex,
  chatList,
  text,
  setText,
  todos,
  todoList,
  setTodoList,
  list,
  setList,
  user,
}: any) => {
  const db = firebase.firestore();
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const [isChangedTodo, setIsChangedTodo] = useState(false);

  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        const docRef = await db
          .collection("chatList")
          .doc(`block0${chatIndex + 1}`);
        docRef.update({ items: todos.items });
      })();
    }
  }, [isChangedTodo, db]);

  const handleSubmit = (e, chatIndex) => {
    e.preventDefault();
    if (!text) return;
    setIsChangedTodo(true);
    const newTodo: Todo = {
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      createdAt: updatedTime,
    };
    list[chatIndex].items.push(newTodo);
    setTodoList([...todos.items, newTodo]);
    setText("");
  };

  return (
    <Form onSubmit={e => handleSubmit(e, chatIndex)}>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <input
        type="submit"
        value="追加"
        onClick={e => handleSubmit(e, chatIndex)}
      />
      {chatIndex}
    </Form>
  );
};

export default TaskInput;
