import { UserType } from "../type";

export type TaskInputType = {
  chatIndex: number;
  text: string;
  setText: any;
  todos: any;
  list: any;
  user: UserType;
};

export type PresenterType = {
  chatIndex: number;
  text: string;
  setText: any;
  handleSubmit: any;
};

export type newTodoType = {
  id: any;
  message: string;
  userId: string;
  createdAt: any;
};
