import { DragEvent, useState } from "react";
import "../components/css/Main.css";
import { Box, styled } from "@mui/material";
import SettingModal from "./Tasks/Setting";
import Tasks from "./Tasks/Tasks";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Убедитесь, что стили Toastify импортированы

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

  function dragOverHandler(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if ((e.target as HTMLElement).className === "item") {
      (e.target as HTMLElement).style.boxShadow = "0 4px 3px gray";
    }
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    (e.target as HTMLElement).style.boxShadow = "none";
  }

  function dragStartHandler(
    e: DragEvent<HTMLDivElement>,
    board: Board,
    item: Item
  ) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    (e.target as HTMLElement).style.boxShadow = "none";
  }

  function dropHandler(e: DragEvent<HTMLDivElement>, board: Board, item: Item) {
    e.preventDefault();
    if (currentBoard && currentItem) {
      const currentIndex = currentBoard.items.indexOf(currentItem);
      const dropIndex = board.items.indexOf(item);

      if (currentBoard.id === board.id) {
        const reorderedItems = [...currentBoard.items];
        reorderedItems.splice(currentIndex, 1);
        reorderedItems.splice(dropIndex + 1, 0, currentItem);

        setBoards(
          boards.map((b) =>
            b.id === currentBoard.id ? { ...b, items: reorderedItems } : b
          )
        );
      } else {
        const currentItems = [...currentBoard.items];
        currentItems.splice(currentIndex, 1);

        const dropItems = [...board.items];
        dropItems.splice(dropIndex + 1, 0, currentItem);

        setBoards(
          boards.map((b) => {
            if (b.id === currentBoard.id) {
              return { ...b, items: currentItems };
            }
            if (b.id === board.id) {
              return { ...b, items: dropItems };
            }
            return b;
          })
        );
      }

      setCurrentBoard(null);
      setCurrentItem(null);
    }
  }

  const deleteItem = (boardId: number, itemId: number) => {
    toast.error("Успешно удаленно🗑️");
    setBoards(
      boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            items: board.items.filter((item) => item.id !== itemId),
          };
        }
        return board;
      })
    );
  };

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
              className="item"
              draggable={true}
            >
              {item.title}
              <Settings>
                <SettingModal onDelete={() => deleteItem(board.id, item.id)}>
                  ...
                </SettingModal>
              </Settings>
            </div>
          ))}
        </div>
      ))}
      <DoskaAdd>
        <Tasks />
      </DoskaAdd>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Main;

const DoskaAdd = styled(Box)`
  margin-top: -350px;
`;
const Settings = styled(Box)`
  text-align: end;
`;
