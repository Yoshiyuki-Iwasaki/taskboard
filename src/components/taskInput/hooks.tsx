import { newTodoType } from "./type";
import { useState } from "react";

// タスク追加するCustom hooks.
export const useHandleSubmit: any = ({ user, list, setIsChangedTodo }) => {
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const [text, setText] = useState<string>("");

  const handleSubmit = (e) => {
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
    // list[chatIndex].items.push(newTodo);
    // console.log("list[chatIndex]", list[chatIndex]);
    setText("");
  };

  return { handleSubmit, text, setText };
};
