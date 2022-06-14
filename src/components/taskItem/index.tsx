import { useState, useRef, FC } from "react";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Presenter from "./presenter";
import { useOpenModal, useHandleDragEnd, useHandleDragStart, useHandleDragEnter, useUpdateDragData } from "./hooks";
import { TaskItemType } from "./type";

const TaskItem: FC<TaskItemType> = ({ chatList }) => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [dragging, setDragging] = useState<boolean>(false);
  const dragItem = useRef<any>();
  const dragNode = useRef<any>();
  const [list, setList] = useState([chatList?.docs[0].data(), chatList?.docs[1].data(), chatList?.docs[2].data()]);
  const { modalId, show, setShow, openModal } = useOpenModal();
  const handleDragEnd = useHandleDragEnd({ dragNode, dragItem, setDragging });
  const handleDragStart = useHandleDragStart({ dragNode, dragItem, setDragging, handleDragEnd });
  const handleDragEnter = useHandleDragEnter({ dragNode, dragItem, setList });
  const updateDragData = useUpdateDragData({ db, list });

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }

  return (
    <Presenter
      list={list}
      user={user}
      modalId={modalId}
      chatList={chatList}
      dragging={dragging}
      show={show}
      setShow={setShow}
      handleDragEnter={handleDragEnter}
      handleDragStart={handleDragStart}
      openModal={openModal}
      updateDragData={updateDragData}
    />
  );
};

export default TaskItem;
