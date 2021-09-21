import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../firebase/clientApp";
import Header from "./Header";
import Drag from './Drag';
interface Todo {
  id: number;
  message: string;
  userId: string;
  state: string;
  createdAt: string;
}

const data = [
  { title: "groupe01", items: ["1", "2", "3"] },
  { title: "groupe02", items: ["4", "5", "6"] },
  { title: "groupe03", items: ["7", "8", "9"] },
];

const taskList = () => {
  const db = firebase.firestore();
  const [draggedId, setDraggedId] = useState(-1);
  const [text, setText] = useState("");
  const [user, loading, error] = useAuthState(firebase.auth());
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isChangedTodo, setIsChangedTodo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const [chatList, chatListLoading, chatListError] = useCollection(
    db.collection("chatList"),
    {}
  );

  useEffect(() => {
    (async () => {
      const resTodo = await db
        .collection("chatList")
        .doc("todo")
        .get();
      setTodos(resTodo.data().items);
      setIsLoading(false);
    })();
  }, [db]);

  useEffect(() => {
    if (isChangedTodo) {
      (async () => {
        setIsLoading(true);
        const docRef = await db.collection("chatList").doc("todo");
        docRef.update({ items: todos });
        setIsLoading(false);
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
      state: 'todo',
      createdAt: updatedTime,
    };
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
      <Header />
      <form onSubmit={e => handleSubmit(e)} className="mt-5	text-center">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          className="border-4 border-light-blue-500 border-opacity-25 "
        />
        <input type="submit" value="追加" onClick={e => handleSubmit(e)} />
      </form>
      <div className="flex">
        <Drag chatList={chatList} data={data} />
      </div>
    </>
  );
};

export default taskList
