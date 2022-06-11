import React, { FC } from "react";
import Layout from "../components/layout";
import TaskItem from "../components/taskItem";
import Main from "./style";

type PresenterType = {
  chatList: any;
};

const Presenter: FC<PresenterType> = ({ chatList }) => {
  return (
    <Layout>
      <Main>
        <TaskItem chatList={chatList} />
      </Main>
    </Layout>
  );
};

export default Presenter;
