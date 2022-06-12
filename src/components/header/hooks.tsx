import firebase from "../../firebase/clientApp";

// ログアウトするCustom hooks.
export const useLogout = () => {
  const logout = () => {
    firebase.auth().signOut();
  };

  return logout;
};
