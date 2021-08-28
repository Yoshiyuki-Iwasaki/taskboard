import React, { useEffect, useState} from "react";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Auth from "../../components/Auth";

interface Comment {
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}

const index = ({ todo }) => {
  const db = firebase.firestore();
  const [user, loading, error] = useAuthState(firebase.auth());
  const [people, setPeople] = useState("");
  const [tag, setTag] = useState("");
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState<Comment[]>([]);
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
  const [taglists, taglistsLoading, taglistsError] =
    useCollection(
      firebase
        .firestore()
        .collection("tag")
        .where("postID", "==", router.query.id)
  );
  const [commentlists, commentlistsLoading, commentlistsError] =
    useCollection(
      firebase
        .firestore()
        .collection("comment")
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

  const handleCommentSubmit = async e => {
    e.preventDefault();
    if (!comment) return;
    await db.collection("comment").add({
      id: new Date().getTime(),
      message: comment,
      userId: user.uid,
      postID: router.query.id,
      createdAt: updatedTime,
    });
    setComment("");
  };

  if (loading || peoplelistsLoading || taglistsLoading || commentlistsLoading) {
    return <h6>Loading...</h6>;
  }

  if (error || peoplelistsError || taglistsError || commentlistsError) {
    return null;
  }

  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <>
          <Header />
          <div className="max-w-screen-lg mt-28 mx-auto">
            <h1 className="mt-6 text-2xl font-bold">{todo.message}</h1>
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
            <ul className="mt-14">
              {commentlists &&
                commentlists.docs.map(doc => (
                  <li key={doc.data().id}>
                    <a href={`posts/${doc.data().id}`}>{doc.data().message}</a>
                  </li>
                ))}
            </ul>
            <form className="mt-3" onSubmit={e => handleCommentSubmit(e)}>
              <input
                className="border-4 border-light-blue-500 border-opacity-25"
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="コメント"
              />
              <input
                type="submit"
                value="追加"
                onClick={e => handleCommentSubmit(e)}
              />
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default index

export const getStaticPaths = async () => {
  const db = firebase.firestore();
  const resTodo = await db.collection("chatList").get();
  const paths = resTodo.docs.map(todo => `/posts/${todo.data().id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const db = firebase.firestore();
  const id = context.params.id;
  const resTodo = await db.collection("chatList").get();
  const todos = resTodo.docs.map(todo => todo.data());
  const array = todos.find(todo => todo.id == id);
  return {
    props: {
      todo: array,
    },
  };
};
