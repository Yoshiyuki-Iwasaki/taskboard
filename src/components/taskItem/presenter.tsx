import React, { FC } from "react";
import Modal from "../model";
import TaskInput from "../taskInput";
import { Board, Title, Wrapper, List, TextArea, Text } from "./style";
import { PresenterType } from "./type";

const Presenter: FC<PresenterType> = ({
  list,
  user,
  modalId,
  chatList,
  dragging,
  show,
  setShow,
  handleDragEnter,
  handleDragStart,
  openModal,
  updateDragData
}) => {
  return (
    <>
      {list &&
        list.map((todos, chatIndex: number) => (
          <Board
            key={chatIndex}
            onDragEnter={
              dragging && !todos.items.length ? (e) => handleDragEnter(e, { chatIndex, todosIndex: 0 }) : null
            }
          >
            <Title>{todos.title}</Title>
            {todos.items &&
              todos.items.map((doc, todosIndex: number) => (
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
            <TextArea>
              <Text>タスク新規追加</Text>
            </TextArea>
            <TaskInput chatIndex={chatIndex} todos={todos} list={list} user={user} />
          </Board>
        ))}
    </>
  );
};

export default Presenter;
