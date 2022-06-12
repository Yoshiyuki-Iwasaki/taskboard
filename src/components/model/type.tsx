export type ModalType = {
  todos: any;
  show: boolean;
  setShow: () => void;
  doc: {
    message: string;
    createdAt: any;
  };
  docId: number;
  modalId: number;
  params: { chatIndex: number; todosIndex: number };
  chatList: any;
};

export type PresenterType = {
  docId: number;
  modalId: number;
  show: boolean;
  doc: {
    message: string;
    createdAt: any;
  };
  closeModal: any;
  commentList: any;
  submitComment: any;
  comment: string;
  setComment: any;
  removeModalButton: any;
  params: { chatIndex: number; todosIndex: number };
};

export type useCloseModalType = {
  setShow: () => void;
};
