import React, { FC } from "react";
import {
  Main,
  Header,
  TitleArea,
  Title,
  Date,
  Button,
  Body,
  LeftArea,
  LeftAreaList,
  LeftAreaListItem,
  LeftAreaTitle,
  LeftAreaForm,
  LeftAreaInput,
  RightArea,
  RightAreaButton,
  Overlay
} from "./style";

const Presenter: FC<any> = ({
  docId,
  modalId,
  show,
  doc,
  closeModal,
  commentList,
  submitComment,
  comment,
  setComment,
  removeModalButton,
  params
}) => {
  return (
    <>
      {docId == modalId && show ? (
        <>
          <Main>
            <Header>
              <TitleArea>
                <Title>{doc.message}</Title>
                <Date>作成日:{doc.createdAt}</Date>
              </TitleArea>
              <Button onClick={closeModal}>閉じる</Button>
            </Header>
            <Body>
              <LeftArea>
                <LeftAreaList>
                  {commentList.docs.map((data, index) => (
                    <LeftAreaListItem key={index}>{data.data().comment}</LeftAreaListItem>
                  ))}
                  <LeftAreaTitle>コメント</LeftAreaTitle>
                  <LeftAreaForm onSubmit={(e) => submitComment(e)}>
                    <LeftAreaInput type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                  </LeftAreaForm>
                </LeftAreaList>
              </LeftArea>
              <RightArea>
                <RightAreaButton onClick={() => removeModalButton(params)}>削除</RightAreaButton>
              </RightArea>
            </Body>
          </Main>
          <Overlay onClick={() => closeModal()} />
        </>
      ) : null}
    </>
  );
};

export default Presenter;
