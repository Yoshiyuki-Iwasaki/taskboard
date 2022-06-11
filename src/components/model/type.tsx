export type ModalType = {
  todos: any;
  show: boolean;
  setShow: any;
  doc: any;
  docId: number;
  modalId: number;
  params: any;
  chatList: any;
};

export type PresenterType = {
  docId: number;
  modalId: number;
  show: boolean;
  doc: any;
  closeModal: any;
  commentList: any;
  submitComment: any;
  comment: string;
  setComment: any;
  removeModalButton: any;
  params: any;
};
