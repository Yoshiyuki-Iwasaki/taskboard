import React from 'react'

const taskInput = ({ handleSubmit, text, setText }:any) => {
  return (
    <form onSubmit={e => handleSubmit(e)} className="py-5 text-center">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        className="border-4 border-light-blue-500 border-opacity-25 "
      />
      <input type="submit" value="追加" onClick={e => handleSubmit(e)} />
    </form>
  );
};

export default taskInput
