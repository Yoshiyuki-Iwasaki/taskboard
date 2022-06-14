import { UserType } from "../../type/index";

export type TaskInputType = {
  chatIndex: number;
  todos: {
    items: any;
  };
  list: {
    items: any;
  };
  user: UserType;
};

export type PresenterType = {
  chatIndex: number;
  text: string;
  setText: (e) => void;
  handleSubmit: (e, chatIndex) => void;
};

export type newTodoType = {
  id: number;
  message: string;
  userId: string;
  createdAt: string;
};
