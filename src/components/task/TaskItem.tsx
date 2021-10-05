import { useState, useRef } from "react";
import firebase from "../../firebase/clientApp";
import styled from 'styled-components';
import { useCollection } from "react-firebase-hooks/firestore";
import Modal from "../Modal";

const Board = styled.div`
  padding: 10px;
  width: 300px;
  background: #ebecf0;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 18px;
  color: #333;
  font-weight: 700;
`;

const List = styled.div`
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

const TaskItem = ({ chatList }: any) => {
  const db = firebase.firestore();
  const [dragging, setDragging] = useState(false);
  const [modalId, setModalId] = useState(0);
  const [show, setShow] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();
  const [data, loading, error] = useCollection(
    db.collection("chatList"),
    {}
  );
  const [list, setList] = useState([
    chatList?.docs[0].data(),
    chatList?.docs[1].data(),
    chatList?.docs[2].data(),
  ]);

  const openModal = doc => {
    setShow(true);
    setModalId(doc);
    console.log('show', show);
  };

  const handleDragStart = (e, params) => {
    console.log("drag start", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = async (e, params) => {
    console.log("Entering drag...", params);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      setList(list => {
        const newList = JSON.parse(JSON.stringify(list));
        newList[params.chatIndex].items.splice(
          params.todosIndex,
          0,
          newList[currentItem.chatIndex].items.splice(
            currentItem.todosIndex,
            1
          )[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
  };

  const handleDragEnd = () => {
    console.log("Ending drag");
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const handleDragEnd02 = async () => {
    console.log("Ending drag02");
    const docRef = await db.collection("chatList").doc("block01");
    docRef.update({ items: list[0].items });
    const docRef02 = await db.collection("chatList").doc("block02");
    docRef02.update({ items: list[1].items });
    const docRef03 = await db.collection("chatList").doc("block03");
    docRef03.update({ items: list[2].items });
    console.log(
      "docRef",
      data.docs.map(doc => {
        console.log("doc.data()", doc.data());
      })
    );
    console.log(
      "list",
      list.map(list => {
        console.log("list", list);
      })
    );
  }

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }

  return (
    <>
      {list &&
        list.map((todos, chatIndex) => (
          <Board
            key={chatIndex}
            onDragEnter={
              dragging && !todos.items.length
                ? e => handleDragEnter(e, { chatIndex, todosIndex: 0 })
                : null
            }
          >
            <Title>{todos.title}</Title>
            {todos.items &&
              todos.items.map((doc, todosIndex) => (
                <div key={todosIndex}>
                  <List
                    onClick={() => openModal(doc.id)}
                    draggable
                    onDragEnter={
                      dragging
                        ? e => handleDragEnter(e, { chatIndex, todosIndex })
                        : null
                    }
                    onDragStart={e =>
                      handleDragStart(e, { chatIndex, todosIndex })
                    }
                    onDragEnd={handleDragEnd02}
                    data-id={doc.id}
                    className="my-2 px-5 py-5"
                  >
                    <p>{doc.message}</p>
                  </List>
                  <Modal
                    show={show}
                    setShow={setShow}
                    doc={doc}
                    docId={doc.id}
                    modalId={modalId}
                  />
                </div>
              ))}
          </Board>
        ))}
    </>
  );
};

export default TaskItem;
