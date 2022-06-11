import React, { FC } from "react";
import Modal from "../model";
import TaskInput from "../taskInput";
import { Board, Title, Wrapper, List, Button, Text } from "./style";

const Presenter: FC<any> = ({
  list,
  user,
  modalId,
  chatList,
  dragging,
  show,
  setShow,
  text,
  setText,
  handleDragEnter,
  handleDragStart,
  openInputField,
  openModal,
  updateDragData
}) => {
  return (
    <>
      {list &&
        list.map((todos, chatIndex) => (
          <Board
            key={chatIndex}
            onDragEnter={
              dragging && !todos.items.length ? (e) => handleDragEnter(e, { chatIndex, todosIndex: 0 }) : null
            }
          >
            <Title>{todos.title}</Title>
            {todos.items &&
              todos.items.map((doc, todosIndex) => (
                <Wrapper key={todosIndex}>
                  <List
                    onClick={() => openModal(doc.id)}
                    draggable
                    onDragEnter={dragging ? (e) => handleDragEnter(e, { chatIndex, todosIndex }) : null}
                    onDragStart={(e) => handleDragStart(e, { chatIndex, todosIndex })}
                    onDragEnd={updateDragData}
                    data-id={doc.id}
                  >
                    <Text>{doc.message}</Text>
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
              <TaskInput chatIndex={chatIndex} text={text} setText={setText} todos={todos} list={list} user={user} />
            ) : (
              <Button onClick={openInputField}>カードを追加する</Button>
            )}
          </Board>
        ))}
    </>
  );
};

export default Presenter;
