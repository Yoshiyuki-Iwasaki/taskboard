import firebase from "../../firebase/clientApp";

export const useLogout = () => {
  const logout = () => {
    firebase.auth().signOut();
  };

  return logout;
};
