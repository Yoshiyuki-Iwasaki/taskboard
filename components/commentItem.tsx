import React from 'react'
import firebase from "../firebase/clientApp";
import { useDocument } from "react-firebase-hooks/firestore";

const commentItem = ({ id, message, userId, postID, createdAt}) => {
  const [value, valueLoading, valueError] = useDocument(
    firebase.firestore().doc(`users/${userId}`)
  );
  if (valueLoading) {
    return <h6>Loading...</h6>;
  }
  if (valueError) {
    return null;
  }
  return (
    <li key={id} className="mt-5 flex items-center">
      <div className="mr-4">
        <figure>
          <img className={"rounded-full w-full"} src={value.data().photoURL} />
        </figure>
        <h4 className="font-bold">{value.data().displayName}</h4>
      </div>
      <div>
        <p>{createdAt}</p>
        <a href={`posts/${id}`}>{message}</a>
      </div>
    </li>
  );
}

export default commentItem
