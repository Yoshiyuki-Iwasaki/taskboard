import styled from 'styled-components';

interface Todo {
  id: number;
  message: string;
  userId: string;
  createdAt: string;
}

const Form = styled.form`
  padding: 10px 0;
  text-align: center;
`;

const taskInput = ({
  chatList,
  text,
  setText,
  todos,
  setTodos,
  setIsChangedTodo,
  user,
}: any) => {
  const convertJST = new Date();
  convertJST.setHours(convertJST.getHours());
  const updatedTime = convertJST.toLocaleString("ja-JP").slice(0, -3);
  const list = [
    chatList?.docs[0].data(),
    chatList?.docs[1].data(),
    chatList?.docs[2].data(),
  ];

  const handleSubmit = e => {
    e.preventDefault();
    if (!text) return;
    setIsChangedTodo(true);
    const newTodo: Todo = {
      id: new Date().getTime(),
      message: text,
      userId: user.uid,
      createdAt: updatedTime,
    };
    list[0].items.push(newTodo);
    setTodos([...todos, newTodo]);
    setText("");
  };

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <input type="submit" value="追加" onClick={e => handleSubmit(e)} />
    </Form>
  );
};

export default taskInput
