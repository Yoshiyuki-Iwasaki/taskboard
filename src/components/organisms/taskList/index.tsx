import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "../../../firebase/clientApp";
import TaskItem from "../../molecules/taskItem";
import styled from "styled-components";

const TaskList = () => {
  const db = firebase.firestore();
  const [chatList, loading, error] = useCollection(
    db.collection("chatList"),
    {}
  );

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }

  return (
    <>
      <Main>
        <TaskItem chatList={chatList} />
      </Main>
    </>
  );
};

const Main = styled.div`
  margin: 0 auto;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  width: 1000px;
`;

export default TaskList;
