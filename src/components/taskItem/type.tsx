export type PresenterType = {
  list: any;
  user: any;
  modalId: number;
  chatList: any;
  dragging: any;
  show: boolean;
  setShow: any;
  text: string;
  setText: any;
  handleDragEnter: any;
  handleDragStart: any;
  openId: number;
  openInputField: any;
  openModal: any;
  updateDragData: any;
};

export type TaskItemType = {
  chatList: any;
};

export interface Todo {
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}
