import React from 'react'
import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
    const logout = () => {
      firebase.auth().signOut();
    };
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-100 mx-auto">
      <div className="md:w-9/12 p-3 text-right mx-auto flex justify-end">
        <div className="w-48 flex justify-between	items-center">
          {user.displayName && <p>{user.displayName}</p>}
          <button
            onClick={() => logout()}
            className="bg-gray-500 text-white font-medium p-4"
          >
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header
