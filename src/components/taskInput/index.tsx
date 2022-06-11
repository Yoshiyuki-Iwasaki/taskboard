import { useState, useEffect, FC } from "react";
import firebase from "../../firebase/clientApp";
import { TaskInputType, TaskTodoType } from "./type";
import Presenter from "./presenter";

const TaskInput: FC<TaskInputType> = ({ chatIndex, text, setText, todos, setTodoList, list, user }) => {
  const db = firebase.firestore();
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const [isChangedTodo, setIsChangedTodo] = useState(false);

  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        const docRef = await db.collection("chatList").doc(`block0${chatIndex + 1}`);
        docRef.update({ items: todos.items });
      })();
    }
  }, [isChangedTodo, db]);

  const handleSubmit = (e, chatIndex) => {
    e.preventDefault();
    if (!text) return;
    setIsChangedTodo(true);
    const newTodo: TaskTodoType = {
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      createdAt: updatedTime
    };
    list[chatIndex].items.push(newTodo);
    setTodoList([...todos.items, newTodo]);
    setText("");
  };

  return <Presenter chatIndex={chatIndex} text={text} setText={setText} handleSubmit={handleSubmit} />;
};

export default TaskInput;
