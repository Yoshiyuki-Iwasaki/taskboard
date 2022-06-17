import React, { FC } from "react";
import { Form, Input } from "./style";
import { PresenterType } from "./type";

const Presenter: FC<PresenterType> = ({ chatIndex, text, setText, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        name="content"
        onChange={(e: any) => {
          setText(e.target.value);
          console.log(text);
        }}
      />
    </Form>
  );
};

export default Presenter;
