import { useState } from "react";

export const useOpenModal = () => {
  const [modalId, setModalId] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);

  const openModal = (doc) => {
    setShow(true);
    setModalId(doc);
  };

  return { modalId, show, setShow, openModal };
};

export const useOpenInputField = () => {
  const [openFlag, setOpenFlag] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const openInputField = () => {
    setText("");
    setOpenFlag(!openFlag);
  };
  return { openFlag, text, setText, openInputField };
};

export const useHandleDragEnd: any = ({ dragNode, dragItem, setDragging }) => {
  const handleDragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };
  return handleDragEnd;
};

export const useHandleDragStart: any = ({ dragNode, dragItem, setDragging, handleDragEnd }) => {
  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  return handleDragStart;
};

export const useHandleDragEnter: any = ({ dragNode, dragItem, setList }) => {
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
  return handleDragEnter;
};

export const useUpdateDragData: any = ({ db, list }) => {
  const updateDragData = async () => {
    const docRef = await db.collection("chatList").doc("block01");
    const docRef02 = await db.collection("chatList").doc("block02");
    const docRef03 = await db.collection("chatList").doc("block03");

    docRef.update({ items: list[0].items });
    docRef02.update({ items: list[1].items });
    docRef03.update({ items: list[2].items });
  };
  return updateDragData;
};
