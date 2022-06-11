import React, { FC } from "react";
import { Form, Input } from "./style";
import { PresenterType } from "./type";

const Presenter: FC<PresenterType> = ({ chatIndex, text, setText, handleSubmit }) => {
  return (
    <Form onSubmit={(e) => handleSubmit(e, chatIndex)}>
      <Input type="text" value={text} onChange={(e) => setText(e.target.value)} />
    </Form>
  );
};

export default Presenter;
