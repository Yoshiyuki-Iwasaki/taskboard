import { useState, useEffect, FC } from "react";
import firebase from "../../firebase/clientApp";
import { TaskInputType } from "./type";
import Presenter from "./presenter";
import { useHandleSubmit } from "./hooks";

const TaskInput: FC<TaskInputType> = ({ chatIndex, text, setText, todos, list, user }) => {
  const db = firebase.firestore();
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const handleSubmit = useHandleSubmit(user, list, text, setText, setIsChangedTodo);

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
