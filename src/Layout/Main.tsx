import { DragEvent, useState } from "react";
import "../components/css/Main.css";
import { Box, styled } from "@mui/material";
import Tasks from "./Tasks/Tasks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingModal from "./Tasks/SettingsModal";

interface Item {
	id: number;
	title: string;
}

interface Board {
	id: number;
	title: string;
	items: Item[];
}

const Main: React.FC = () => {
	const [boards, setBoards] = useState<Board[]>([
		{
			id: 1,
			title: "Сделать",
			items: [
				{ id: 1, title: "Пойти в магазин" },
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
				{ id: 7, title: "Пойти в магазин" },
				{ id: 8, title: "Выкинуть мусор" },
				{ id: 9, title: "Отрендерить" },
			],
		},
	]);

	const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
	const [currentItem, setCurrentItem] = useState<Item | null>(null);

	const addBoard = (newBoard: Board) => {
		setBoards((prevBoards) => [...prevBoards, newBoard]);
		toast.success("Доска успешно добавлена!");
	};

	const dragStartHandler = (
		e: DragEvent<HTMLDivElement>,
		board: Board,
		item: Item
	) => {
		setCurrentBoard(board);
		setCurrentItem(item);
	};

	const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
		setCurrentBoard(null);
		setCurrentItem(null);
	};

	const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const dragEnterHandler = (
		e: DragEvent<HTMLDivElement>,
		board: Board,
		item: Item
	) => {
		if (item !== currentItem) {
			e.currentTarget.classList.add("item__dragged-over");
		}
	};

	const dragLeaveHandler = (
		e: DragEvent<HTMLDivElement>,
		board: Board,
		item: Item
	) => {
		if (item !== currentItem) {
			e.currentTarget.classList.remove("item__dragged-over");
		}
	};

	const dropHandler = (
		e: DragEvent<HTMLDivElement>,
		targetBoard: Board,
		targetItem: Item
	) => {
		e.preventDefault();
		if (currentItem && currentBoard) {
			const sourceBoardIndex = boards.findIndex(
				(board) => board.id === currentBoard.id
			);
			const sourceItemIndex = boards[sourceBoardIndex].items.findIndex(
				(item) => item.id === currentItem.id
			);

			const updatedSourceItems = [...boards[sourceBoardIndex].items];
			updatedSourceItems.splice(sourceItemIndex, 1);
			const updatedSourceBoard = {
				...boards[sourceBoardIndex],
				items: updatedSourceItems,
			};

			const targetBoardIndex = boards.findIndex(
				(board) => board.id === targetBoard.id
			);
			const updatedTargetItems = [...boards[targetBoardIndex].items];
			const insertIndex = updatedTargetItems.findIndex(
				(item) => item.id === targetItem.id
			);

			if (insertIndex === -1) {
				updatedTargetItems.push(currentItem);
			} else {
				updatedTargetItems.splice(insertIndex, 0, currentItem);
			}

			const updatedTargetBoard = {
				...boards[targetBoardIndex],
				items: updatedTargetItems,
			};

			const updatedBoards = [...boards];
			updatedBoards[sourceBoardIndex] = updatedSourceBoard;
			updatedBoards[targetBoardIndex] = updatedTargetBoard;
			setBoards(updatedBoards);

			setCurrentBoard(null);
			setCurrentItem(null);
		}
	};

	const deleteItem = (boardId: number, itemId: number) => {
		const updateBoards = boards.map((board) => {
			if (board.id === boardId) {
				const updateItems = board.items.filter((item) => item.id !== itemId);
				return { ...board, items: updateItems };
			}
			return board;
		}).filter(Boolean)

		setBoards(updateBoards)
		toast.success("Новая Доска успешно добавленно")
	};

	return (
		<div className="app">
			{boards.map((board) => (
				<div className="board" key={board.id}>
					<div className="board__title">{board.title}</div>
					{board.items.map((item) => (
						<div
							key={item.id}
							onDragStart={(e) => dragStartHandler(e, board, item)}
							onDragEnd={dragEndHandler}
							onDragOver={dragOverHandler}
							onDragEnter={(e) => dragEnterHandler(e, board, item)}
							onDragLeave={(e) => dragLeaveHandler(e, board, item)}
							onDrop={(e) => dropHandler(e, board, item)}
							className="item"
							draggable>
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
				<Tasks addBoard={addBoard} />
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
