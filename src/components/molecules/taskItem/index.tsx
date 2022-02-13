import { useState, useRef } from "react";
import firebase from "../../../firebase/clientApp";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "../../organisms/model";
import TaskInput from "../../atoms/input";

interface Todo {
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}

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
  const [list, setList] = useState([
    chatList?.docs[0].data(),
    chatList?.docs[1].data(),
    chatList?.docs[2].data(),
  ]);

  const openModal = doc => {
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

  const UpdateDragData = async () => {
    const docRef = await db.collection("chatList").doc("block01");
    docRef.update({ items: list[0].items });
    const docRef02 = await db.collection("chatList").doc("block02");
    docRef02.update({ items: list[1].items });
    const docRef03 = await db.collection("chatList").doc("block03");
    docRef03.update({ items: list[2].items });
  };

  const openInputField = chatIndex => {
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
                <Wrapper key={todosIndex}>
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
                    onDragEnd={UpdateDragData}
                    data-id={doc.id}
                  >
                    <p>{doc.message}</p>
                  </List>
                  <Modal
                    todos={todos}
                    chatList={chatList}
                    params={{ chatIndex, todosIndex }}
                    show={show}
                    setShow={setShow}
                    doc={doc}
                    docId={doc.id}
                    modalId={modalId}
                  />
                </Wrapper>
              ))}
            {chatIndex == open ? (
              <TaskInput
                chatIndex={chatIndex}
                text={text}
                setText={setText}
                todos={todos}
                setTodoList={setTodoList}
                list={list}
                user={user}
              />
            ) : (
              <Button onClick={() => openInputField(chatIndex)}>
                カードを追加する
              </Button>
            )}
          </Board>
        ))}
    </>
  );
};

const Board = styled.div`
  padding: 15px 10px;
  width: 300px;
  background: #ebecf0;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 18px;
  color: #333;
  font-weight: 700;
`;

const Wrapper = styled.div`
  margin-top: 10px;

  &::first-child {
    margin-top: 0;
  }
`;

const List = styled.div`
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 10px;
`;

export default TaskItem;
