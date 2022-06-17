import { useState, useEffect, FC } from "react";
import firebase from "../../firebase/clientApp";
import { TaskInputType } from "./type";
import Presenter from "./presenter";
import { newTodoType } from "./type";
// import { useHandleSubmit } from "./hooks";

const TaskInput: FC<TaskInputType> = ({ chatIndex, todos, list, user }) => {
  const db = firebase.firestore();
  const [isChangedTodo, setIsChangedTodo] = useState<boolean>(false);
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const [text, setText] = useState<string>("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e, text);
    if (!text) return;
    setIsChangedTodo(true);
    const newTodo: newTodoType = {
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      createdAt: updatedTime
    };
    list[chatIndex].items.push(newTodo);
    await db.collection("post").add({
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log("list[chatIndex]", list[chatIndex]);
    setText("");
  };

  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        const docRef = await db.collection("chatList").doc(`block0${chatIndex + 1}`);
        docRef.update({ items: todos.items });
      })();
    }
  }, [isChangedTodo, db]);

  return <Presenter chatIndex={chatIndex} text={text} setText={setText} handleSubmit={handleSubmit} />;
};

export default TaskInput;
