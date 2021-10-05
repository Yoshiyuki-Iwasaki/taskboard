import React from 'react'
import styled from "styled-components";

const Main = styled.div`
  position: fixed;
  background: #fff;
  width: 768px;
  min-height: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const Overlay = styled.div`
  position: fixed;
  background: rgba(0,0,0,.64);
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const Button = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Title = styled.p`
  margin: 20px 40px 8px 56px;
  font-size: 20px;
  line-height: 24px;
`;


const Modal = ({ show, setShow, doc, docId, modalId }) => {

  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      {docId == modalId && show ? (
        <>
          <Main>
            <Title>{doc.message}</Title>
            <Button onClick={() => closeModal()}>閉じる</Button>
          </Main>
          <Overlay onClick={() => closeModal()} />
        </>
      ) : null}
    </>
  );
};

export default Modal
