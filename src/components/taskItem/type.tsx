import { Dispatch, SetStateAction } from "react";
import { UserType } from "../../type";

export type PresenterType = {
  list: any;
  user: UserType;
  modalId: number;
  chatList: { docs: any };
  dragging: boolean;
  show: boolean;
  setShow: any;
  handleDragEnter: (e, params) => void;
  handleDragStart: (e, params) => void;
  openModal: (doc) => void;
  updateDragData: () => void;
};

export type TaskItemType = {
  chatList: { docs: any };
};

export interface Todo {
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}
