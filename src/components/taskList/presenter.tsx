import React, { FC } from "react";
import TaskItem from "../taskItem";
import { Main } from "./style";

const Presenter: FC<any> = ({ chatList }) => {
  return (
    <Main>
      <TaskItem chatList={chatList} />
    </Main>
  );
};

export default Presenter;
