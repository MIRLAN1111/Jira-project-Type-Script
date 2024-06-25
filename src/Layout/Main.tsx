import { DragEvent, useState, useEffect, ChangeEvent, FormEvent } from "react";
import "../components/css/Main.css";
import { Box, styled } from "@mui/material";
import Tasks from "./Tasks/Tasks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingModal from "./Tasks/SettingsModal";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { MdFileDownloadDone } from "react-icons/md";
import { VscClose } from "react-icons/vsc";

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
			title: "Доска 1",
			items: [
				{ id: 1, title: "Lorem ipsum dolor sit amet " },
				{ id: 2, title: "Lorem ipsum dolor sit amet " },
			],
		},
		{
			id: 2,
			title: "Доска 2",
			items: [
				{ id: 4, title: "Lorem ipsum dolor sit amet " },
				{ id: 5, title: "Lorem ipsum dolor sit amet " },
			],
		},
		{
			id: 3,
			title: "Доска 3",
			items: [
				{ id: 7, title: "Lorem ipsum dolor sit amet " },
				{ id: 8, title: "Lorem ipsum dolor sit amet " },
			],
		},
	]);

	const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
	const [currentItem, setCurrentItem] = useState<Item | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newTask, setNewTask] = useState("");
	const [selectedBoardId, setSelectedBoardId] = useState<number | null>(1);
	const [isInputVisible, setIsInputVisible] = useState(false);

	useEffect(() => {
		const savedBoards = localStorage.getItem("boards");
		if (savedBoards) {
			setBoards(JSON.parse(savedBoards));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("boards", JSON.stringify(boards));
	}, [boards]);

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setNewTask("");
	};

	const handleAddTask = () => {
		if (newTask.trim() && selectedBoardId !== null) {
			const newItem: Item = { id: Date.now(), title: newTask };
			const updatedBoards = boards.map((board) => {
				if (board.id === selectedBoardId) {
					return { ...board, items: [...board.items, newItem] };
				}
				return board;
			});
			console.log(updatedBoards, "lihan");

			setBoards(updatedBoards);
			toast.success("Задача успешно добавлена!");
			handleCloseModal();
			setIsInputVisible(false);
		}
	};

	const addBoard = (newBoard: Board) => {
		setBoards((prevBoards) => [...prevBoards, newBoard]);
		toast.success("Доска успешно добавлена!");
	};

	const handleButtonClick = (boardId: number) => {
		setSelectedBoardId(boardId);
		setIsInputVisible(true);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTask(e.target.value);
	};

	const handleSaveTask = (e: FormEvent) => {
		e.preventDefault();
		handleAddTask();
		setIsInputVisible(false);
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
		const updatedBoards = boards.map((board) => {
			if (board.id === boardId) {
				const updatedItems = board.items.filter((item) => item.id !== itemId);
				return { ...board, items: updatedItems };
			}
			return board;
		});
		setBoards(updatedBoards);
		toast.success("Задача успешно удалена!");
	};

	return (
		<div className="app">
			{boards.map((board) => (
				<div className="board" key={board.id}>
					<div className="board__title">
						{board.title}
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
					<Button
						variant="contained"
						onClick={() => handleButtonClick(board.id)}>
						Добавить задачу
					</Button>
					{isInputVisible && selectedBoardId === board.id && (
						<div className="input-container">
							<form onSubmit={handleSaveTask}>
								<Input
									type="text"
									label="Создать задачу"
									placholder="Введите название задачи"
									value={newTask}
									onChange={handleInputChange}
									variant={undefined}
								/>
								<CloseTasks onClick={() => setIsInputVisible(false)} />
								<AddTasks onClick={handleSaveTask} />
							</form>
						</div>
					)}
				</div>
			))}

			<Tasks addBoard={addBoard} />
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

const AddTasks = styled(MdFileDownloadDone)`
	font-size: 20px;
	cursor: pointer;
`;

const CloseTasks = styled(VscClose)`
	font-size: 20px;
	cursor: pointer;
`;

const Settings = styled(Box)`
	text-align: end;
`;
