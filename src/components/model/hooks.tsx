import firebase from "../../firebase/clientApp";

export const useCloseModal = ({ setShow }) => {
  const closeModal = () => {
    setShow(false);
  };

  return closeModal;
};
