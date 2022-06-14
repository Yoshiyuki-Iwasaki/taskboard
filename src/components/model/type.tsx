export type ModalType = {
  todos: {
    items: any;
  };
  show: boolean;
  setShow: () => void;
  doc: {
    message: string;
    createdAt: string;
  };
  docId: number;
  modalId: number;
  params: { chatIndex: number; todosIndex: number };
  chatList: { docs: any };
};

export type PresenterType = {
  docId: number;
  modalId: number;
  show: boolean;
  doc: {
    message: string;
    createdAt: string;
  };
  closeModal: () => void;
  commentList: { docs: any };
  submitComment: (e) => void;
  comment: string;
  setComment: (e) => void;
  removeModalButton: (params) => void;
  params: { chatIndex: number; todosIndex: number };
};

export type useCloseModalType = {
  setShow: () => void;
};
