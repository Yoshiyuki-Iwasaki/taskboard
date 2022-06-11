import { FC } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../firebase/clientApp";
import Presenter from "./presenter";

const TaskList: FC = () => {
  const db = firebase.firestore();
  const [chatList, loading, error] = useCollection(db.collection("chatList"), {});

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }

  return <Presenter chatList={chatList} />;
};

export default TaskList;
