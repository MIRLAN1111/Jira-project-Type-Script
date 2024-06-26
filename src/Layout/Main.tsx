import { DragEvent, useState, useEffect, ChangeEvent, FormEvent } from "react";
import "../components/css/Main.css";
import {
	Box,
	styled,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button as MuiButton,
} from "@mui/material";
import Tasks from "./Tasks/Tasks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SettingModal from "./Tasks/SettingsModal";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { MdFileDownloadDone } from "react-icons/md";
import { VscClose } from "react-icons/vsc";
import { FcSettings } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setBoard } from "../components/store/jiraSlice/jiraSlice";

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
	const dispatch = useDispatch();
	const boards = useSelector((state: any) => state.jira.board);
	const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
	const [currentItem, setCurrentItem] = useState<Item | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newTask, setNewTask] = useState("");
	const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
	const [inputVisibility, setInputVisibility] = useState<{
		[key: number]: boolean;
	}>({});
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [boardToDelete, setBoardToDelete] = useState<number | null>(null);

	useEffect(() => {
		const savedBoards = localStorage.getItem("boards");
		if (savedBoards) {
			dispatch(setBoard(JSON.parse(savedBoards)));
		}
	}, [dispatch]);

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
			const updatedBoards = boards.map((board: Board) => {
				if (board.id === selectedBoardId) {
					return { ...board, items: [...board.items, newItem] };
				}
				return board;
			});
			dispatch(setBoard(updatedBoards));
			toast.success("Задача успешно добавлена!");
			handleCloseModal();
			setInputVisibility((prev) => ({ ...prev, [selectedBoardId!]: false }));
			setNewTask("");
		}
	};

	const addBoard = (newBoard: Board) => {
		dispatch(setBoard([...boards, newBoard]));
		toast.success("Доска успешно добавлена!");
	};

	const handleButtonClick = (boardId: number) => {
		setSelectedBoardId(boardId);
		setInputVisibility((prev) => ({ ...prev, [boardId]: true }));
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTask(e.target.value);
	};

	const handleSaveTask = (e: FormEvent) => {
		e.preventDefault();
		handleAddTask();
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
				(board: Board) => board.id === currentBoard.id
			);
			const sourceItemIndex = boards[sourceBoardIndex].items.findIndex(
				(item: Item) => item.id === currentItem.id
			);

			const updatedSourceItems = [...boards[sourceBoardIndex].items];
			updatedSourceItems.splice(sourceItemIndex, 1);
			const updatedSourceBoard = {
				...boards[sourceBoardIndex],
				items: updatedSourceItems,
			};

			const targetBoardIndex = boards.findIndex(
				(board: Board) => board.id === targetBoard.id
			);
			const updatedTargetItems = [...boards[targetBoardIndex].items];
			const insertIndex = updatedTargetItems.findIndex(
				(item: Item) => item.id === targetItem.id
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
			dispatch(setBoard(updatedBoards));

			setCurrentBoard(null);
			setCurrentItem(null);
		}
	};

	const deleteItem = (boardId: number, itemId: number) => {
		const updatedBoards = boards.map((board: Board) => {
			if (board.id === boardId) {
				const updatedItems = board.items.filter(
					(item: Item) => item.id !== itemId
				);
				return { ...board, items: updatedItems };
			}
			return board;
		});
		dispatch(setBoard(updatedBoards));
		toast.error("Задача успешно удалена!");
	};

	const confirmDeleteBoard = (boardId: number) => {
		setBoardToDelete(boardId);
		setIsConfirmModalOpen(true);
	};

	const handleConfirmDelete = () => {
		if (boardToDelete !== null) {
			const updatedBoards = boards.filter(
				(board: Board) => board.id !== boardToDelete
			);
			dispatch(setBoard(updatedBoards));
			toast.error("Доска успешно удалена!");
			setIsConfirmModalOpen(false);
			setBoardToDelete(null);
		}
	};

	const handleCloseConfirmModal = () => {
		setIsConfirmModalOpen(false);
		setBoardToDelete(null);
	};

	return (
		<div className="app">
			{boards.map((board: Board) => (
				<div className="board" key={board.id}>
					<div className="board__title">
						{board.title}
						<FcSettings
							style={{ marginLeft: "150px", cursor: "pointer" }}
							onClick={() => confirmDeleteBoard(board.id)}
						/>
					</div>
					{board.items.map((item: Item) => (
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
					{!inputVisibility[board.id] && (
						<Button
							variant="outlined"
							onClick={() => handleButtonClick(board.id)}>
							Добавить задачу
						</Button>
					)}
					{inputVisibility[board.id] && (
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
								<CloseTasks
									onClick={() =>
										setInputVisibility((prev) => ({
											...prev,
											[board.id]: false,
										}))
									}
								/>
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
			<Dialog
				open={isConfirmModalOpen}
				onClose={handleCloseConfirmModal}
				aria-labelledby="confirm-dialog-title"
				aria-describedby="confirm-dialog-description">
				<DialogTitle id="confirm-dialog-title">
					Подтвердите удаление
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="confirm-dialog-description">
						Вы точно хотите удалить эту доску?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<MuiButton onClick={handleCloseConfirmModal} color="primary">
						Отмена
					</MuiButton>
					<MuiButton onClick={handleConfirmDelete} color="primary" autoFocus>
						Удалить
					</MuiButton>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Main;

const AddTasks = styled(MdFileDownloadDone)`
	font-size: 25px;
	cursor: pointer;
`;

const CloseTasks = styled(VscClose)`
	font-size: 25px;
	cursor: pointer;
`;

const Settings = styled(Box)`
	text-align: end;
`;
