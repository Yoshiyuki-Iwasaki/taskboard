import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/clientApp";
import TaskItem from './TaskItem';
import TaskInput from "./TaskInput";
import styled from 'styled-components';

interface Todo {
  id: number;
  message: string;
  userId: string;
  state: string;
  createdAt: string;
}

const Main = styled.div`
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
  width: 1000px;
`;

const TaskList = () => {
  const db = firebase.firestore();
  const [text, setText] = useState("");
  const [user, loading, error] = useAuthState(firebase.auth());
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const [chatList, chatListLoading, chatListError] = useCollection(
    db.collection("chatList"),
    {}
  );

  useEffect(() => {
    (async () => {
      const resTodo = await db.collection("chatList").doc("block01").get();
      setTodos(resTodo.data().items);
    })();
  }, [db]);

  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        const docRef = await db.collection("chatList").doc("block01");
        docRef.update({ items: todos });
      })();
    }
  }, [todos, isChangedTodo, db]);

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

  if (loading || chatListLoading) {
    return <h6>Loading...</h6>;
  }
  if (error || chatListError) {
    return null;
  }

  return (
    <>
      <TaskInput text={text} setText={setText} handleSubmit={handleSubmit} />
      <Main>
        <TaskItem db={db} chatList={chatList} />
      </Main>
    </>
  );
};

export default TaskList;
