import { useState, useRef } from "react";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { Todo } from "./type";
import Presenter from "./presenter";

const TaskItem = ({ chatList }: any) => {
  const db = firebase.firestore();
  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState<number>(-1);
  const [dragging, setDragging] = useState<boolean>(false);
  const [modalId, setModalId] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [user, loading, error] = useAuthState(firebase.auth());
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const dragItem = useRef<any>();
  const dragNode = useRef<any>();
  const [list, setList] = useState([chatList?.docs[0].data(), chatList?.docs[1].data(), chatList?.docs[2].data()]);

  const openModal = (doc) => {
    setShow(true);
    setModalId(doc);
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = async (e, params) => {
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      setList((list) => {
        const newList = JSON.parse(JSON.stringify(list));
        newList[params.chatIndex].items.splice(
          params.todosIndex,
          0,
          newList[currentItem.chatIndex].items.splice(currentItem.todosIndex, 1)[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
  };

  const updateDragData = async () => {
    const docRef = await db.collection("chatList").doc("block01");
    docRef.update({ items: list[0].items });
    const docRef02 = await db.collection("chatList").doc("block02");
    docRef02.update({ items: list[1].items });
    const docRef03 = await db.collection("chatList").doc("block03");
    docRef03.update({ items: list[2].items });
  };

  const openInputField = (chatIndex) => {
    setOpen(chatIndex);
    setText("");
  };

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
      text={text}
      setText={setText}
      setTodoList={setTodoList}
      handleDragEnter={handleDragEnter}
      handleDragStart={handleDragStart}
      openInputField={openInputField}
      openModal={openModal}
      updateDragData={updateDragData}
    />
  );
};

export default TaskItem;
