import React, { FC } from "react";
import { Form, Input } from "./style";

const Presenter: FC<any> = ({ handleSubmit, chatIndex, text, setText }) => {
  return (
    <Form onSubmit={(e) => handleSubmit(e, chatIndex)}>
      <Input type="text" value={text} onChange={(e) => setText(e.target.value)} />
    </Form>
  );
};

export default Presenter;
