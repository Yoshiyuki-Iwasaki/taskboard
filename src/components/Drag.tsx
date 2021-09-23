import { useState, useRef, useEffect } from "react";
import firebase from "../firebase/clientApp";

const Drag = ({ chatList, list, setList }: any) => {
  const db = firebase.firestore();
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  useEffect(() => {
    chatList &&
      chatList.docs.map((doc: any) => {
        list.push(doc.data());
      });
  }, []);

  useEffect(() => {
    (async () => {
      const docRef = await db.collection("chatList").doc("block01");
      docRef.update({ items: list[0].items });
      const docRef02 = await db.collection("chatList").doc("block02");
      docRef02.update({ items: list[1].items });
      const docRef03 = await db.collection("chatList").doc("block03");
      docRef03.update({ items: list[2].items });
    })();
  }, [list]);

  const handleDragStart = (e, params) => {
    console.log("drag start", params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    console.log("Entering drag...", params);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      setList(test => {
        const newList = JSON.parse(JSON.stringify(test));
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

  const handleDragEnd = async () => {
    console.log("Ending drag");
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };
  return (
    <>
      {list &&
        list.map((todos, chatIndex) => (
          <ul
            key={chatIndex}
            // onDragEnter={
            //   dragging && todos.items.length
            //     ? e => handleDragEnter(e, { chatIndex, todosIndex: 0 })
            //     : null
            // }
            className="mt-14 mb-12 mx-auto"
          >
            <li>
              <p>{todos.title}</p>
              {todos.items &&
                todos.items.map((doc, todosIndex) => (
                  <div
                    key={todosIndex}
                    draggable
                    onDragEnter={
                      dragging
                        ? e => handleDragEnter(e, { chatIndex, todosIndex })
                        : null
                    }
                    onDragStart={e =>
                      handleDragStart(e, { chatIndex, todosIndex })
                    }
                    data-id={doc.id}
                    className="my-2 px-5 py-5 border-4 border-light-blue-500 border-opacity-25"
                  >
                    <a>{doc.message}</a>
                  </div>
                ))}
            </li>
          </ul>
        ))}
    </>
  );
};

export default Drag
