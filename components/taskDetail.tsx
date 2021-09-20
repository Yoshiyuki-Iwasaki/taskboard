import { useState } from "react";
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Auth from "../components/Auth";
import CommentLists from "./comment/CommentLists";

const TaskDetail = ({ todo }) => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [people, setPeople] = useState("");
  const [tag, setTag] = useState("");
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const router = useRouter();

  const [peoplelists, peoplelistsLoading, peoplelistsError] = useCollection(
    firebase
      .firestore()
      .collection("people")
      .where("postID", "==", router.query.id)
  );
  const [taglists, taglistsLoading, taglistsError] = useCollection(
    firebase
      .firestore()
      .collection("tag")
      .where("postID", "==", router.query.id)
  );

  const handlePeopleSubmit = async e => {
    e.preventDefault();
    if (!people) return;
    await db.collection("people").add({
      id: new Date().getTime(),
      text: people,
      postID: router.query.id,
      createdAt: updatedTime,
    });
    setPeople("");
  };

  const handleTagSubmit = async e => {
    e.preventDefault();
    if (!tag) return;
    await db.collection("tag").add({
      id: new Date().getTime(),
      name: tag,
      postID: router.query.id,
      createdAt: updatedTime,
    });
    setTag("");
  };

  if (peoplelistsLoading || taglistsLoading) {
    return <h6>Loading...</h6>;
  }
  if (peoplelistsError || taglistsError) {
    return null;
  }

  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <>
          <Header />
          <div className="max-w-screen-lg mt-28 mb-12 mx-auto">
            <h1 className="mt-6 text-2xl font-bold">{todo.message}</h1>
            <h2>担当者</h2>
            <ul className="mt-5">
              {peoplelists &&
                peoplelists.docs.map(doc => (
                  <li key={doc.data().id}>
                    <a href={`posts/${doc.data().id}`}>{doc.data().text}</a>
                  </li>
                ))}
            </ul>
            <form className="mt-3" onSubmit={e => handlePeopleSubmit(e)}>
              <input
                className="border-4 border-light-blue-500 border-opacity-25"
                type="text"
                value={people}
                onChange={e => setPeople(e.target.value)}
                placeholder="担当者"
              />
              <input
                type="submit"
                value="追加"
                onClick={e => handlePeopleSubmit(e)}
              />
            </form>
            <h2>タグ</h2>
            <ul className="mt-5">
              {taglists &&
                taglists.docs.map(doc => (
                  <li key={doc.data().id}>
                    <a href={`posts/${doc.data().id}`}>{doc.data().name}</a>
                  </li>
                ))}
            </ul>
            <form className="mt-3" onSubmit={e => handleTagSubmit(e)}>
              <input
                className="border-4 border-light-blue-500 border-opacity-25"
                type="text"
                value={tag}
                onChange={e => setTag(e.target.value)}
                placeholder="タグ"
              />
              <input
                type="submit"
                value="追加"
                onClick={e => handleTagSubmit(e)}
              />
            </form>
            <h2>コメント</h2>
            <CommentLists />
          </div>
        </>
      )}
    </>
  );
};

export default TaskDetail;
