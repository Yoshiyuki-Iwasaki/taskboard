import React from 'react'

const Modal = ({ show, setShow, doc, docId, modalId }) => {
  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      {docId == modalId && show ? (
        <div>
          <p>{doc.message}</p>
          <button onClick={closeModal}></button>
        </div>
      ) : null}
    </>
  );
};

export default Modal
