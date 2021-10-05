import React from 'react'
import styled from "styled-components";

const Main = styled.div`
  position: fixed;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const Modal = ({ show, setShow, doc, docId, modalId }) => {

  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      {docId == modalId && show ? (
        <Main>
          <p>{doc.message}</p>
          <button onClick={() => closeModal()}>閉じる</button>
        </Main>
      ) : null}
    </>
  );
};

export default Modal
