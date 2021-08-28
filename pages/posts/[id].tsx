import React, { useEffect, useState} from "react";
import firebase from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../../components/Header";
import Auth from "../../components/Auth";
import TaskDetail from "../../components/taskDetail";

const PostDetail = ({ todo }) => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return <h6>Loading...</h6>;
  }

  if (error) {
    return null;
  }

  return <>{!user ? <Auth /> : <TaskDetail todo={todo} />}</>;
};

export default PostDetail;

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
