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

  if (loading || chatListLoading) {
    return <h6>Loading...</h6>;
  }
  if (error || chatListError) {
    return null;
  }

  return (
    <>
      <TaskInput
        chatList={chatList}
        text={text}
        setText={setText}
        todos={todos}
        setTodos={setTodos}
        setIsChangedTodo={setIsChangedTodo}
        user={user}
      />
      <Main>
        <TaskItem chatList={chatList} />
      </Main>
    </>
  );
};

export default TaskList;
