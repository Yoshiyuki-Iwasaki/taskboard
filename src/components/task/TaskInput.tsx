import React, { useState } from "react";

interface Todo {
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}

const taskInput = ({
  chatList,
  text,
  setText,
  todos,
  setTodos,
  setIsChangedTodo,
  user,
}: any) => {
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const list = [
    chatList?.docs[0].data(),
    chatList?.docs[1].data(),
    chatList?.docs[2].data(),
  ];

  const handleSubmit = e => {
    e.preventDefault();
    if (!text) return;
    setIsChangedTodo(true);
    const newTodo: Todo = {
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      createdAt: updatedTime,
    };
    list[0].items.push(newTodo);
    setTodos([...todos, newTodo]);
    setText("");
  };

  return (
    <form onSubmit={e => handleSubmit(e)} className="py-5 text-center">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        className="border-4 border-light-blue-500 border-opacity-25 "
      />
      <input type="submit" value="追加" onClick={e => handleSubmit(e)} />
    </form>
  );
};

export default taskInput
