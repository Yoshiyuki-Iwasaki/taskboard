import React, { FC } from "react";
import TaskItem from "../taskItem";
import { Main } from "./style";
import { PresenterType } from "./type";

const Presenter: FC<PresenterType> = ({ chatList }) => {
  return (
    <Main>
      <TaskItem chatList={chatList} />
    </Main>
  );
};

export default Presenter;
