import React from 'react'
import firebase from "../../firebase/clientApp";

const index = ({ todo }) => {
  return <div>{todo.message}</div>;
};

export default index

export const getStaticPaths = async () => {
  const db = firebase.firestore();
  const resTodo = await db.collection("chatList").doc("chat").get();
  const todos = resTodo.data().chat;
  const paths = todos.map(todo => `/posts/${todo.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const db = firebase.firestore();
  const id = context.params.id;
  const resTodo = await db.collection("chatList").doc("chat").get();
  const todos = resTodo.data().chat;
  const array = todos.find(todo => todo.id == id);
  console.log(array);
  return {
    props: {
      todo: array,
    },
  };
};
