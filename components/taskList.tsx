import React from 'react'

const taskList = () => {
  const [draggedId, setDraggedId] = React.useState(-1);
  const handleChangeDraggedId = React.useCallback(
    (id: number) => setDraggedId(id),
    []
  );
    const handleDrag = (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      console.log(handleChangeDraggedId(Number(e.currentTarget.dataset.id)));
    };
  return (
    <ul>
      <li onDrag={handleDrag}>aaaa</li>
    </ul>
  );
}

export default taskList
