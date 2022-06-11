export const useHandleSubmit: any = ({ user, list, text, setText, setIsChangedTodo }) => {
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);

  const handleSubmit = (e, chatIndex) => {
    e.preventDefault();
    if (!text) return;
    setIsChangedTodo(true);
    const newTodo: any = {
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      createdAt: updatedTime
    };
    list[chatIndex].items.push(newTodo);
    setText("");
  };

  return handleSubmit;
};
