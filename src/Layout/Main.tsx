import { useState } from "react";
import "../App.css";

interface Item {
  id: number;
  title: string;
}

interface Board {
  id: number;
  title: string;
  items: Item[];
}

const Main = () => {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: 1,
      title: "Сделать",
      items: [
        { id: 1, title: "Пойти в магизин" },
        { id: 2, title: "Выкинуть мусор" },
        { id: 3, title: "Покушать" },
      ],
    },
    {
      id: 2,
      title: "Проверить",
      items: [
        { id: 4, title: "Код ревью" },
        { id: 5, title: "Задача на факториал" },
        { id: 6, title: "Задачи на фибоначчи" },
      ],
    },
    {
      id: 3,
      title: "Сделано",
      items: [
        { id: 7, title: "Пойти в магизин" },
        { id: 8, title: "Выкинуть мусор" },
        { id: 9, title: "Отрендерить" },
      ],
    },
  ]);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  function dragOverHandler(e) {
    if (e.target.className == "item") {
      e.target.style.boxShadow = "0 4px 3px gray ";
    }
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    e.target.style.boxShadow = "none";
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    e.target.style.boxShadow = "none";
  }

  function dropHandler(e, board, item) {
    e.preventDefault();
    if (currentBoard && currentItem) {
      const newCurrentBoardItems = [...currentBoard.items];
      newCurrentBoardItems.splice(newCurrentBoardItems.indexOf(currentItem), 1);
      const newBoardItems = [...board.items];
      newBoardItems.splice(newBoardItems.indexOf(item) + 1, 0, currentItem);
      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return { ...b, items: newBoardItems };
          }
          if (b.id === currentBoard.id) {
            return { ...b, items: newCurrentBoardItems };
          }
          return b;
        })
      );
    }
  }

  return (
    <div className="app">
      {boards.map((board) => (
        <div className="board" key={board.id}>
          <div className="board__title">{board.title}</div>
          {board.items.map((item) => (
            <div
              key={item.id}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
              className="todo"
              draggable={true}
              className="item">
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Main;