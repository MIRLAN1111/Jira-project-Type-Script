import { ChangeEvent, useState } from "react";
import Button from "./Button";
import { Board, ChildrenProps } from "../Ts/type";
import ModalComponent from "../../Layout/Tasks/ModalComponents";
import { useDispatch, useSelector } from "react-redux";
import { setBoard } from "../store/jiraSlice/jiraSlice";
import { toast } from "react-toastify";

const Modal = ({ children }: ChildrenProps) => {
	const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState("");
	const [open, setOpen] = useState(false);
	const boards = useSelector((state: any) => state.jira.board);

	const handleChangeAdd = (e: ChangeEvent<HTMLInputElement>) =>
		setInputValue(e.target.value);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 700,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};

	const handleAddTask = () => {
		toast("Проект Добавленно🦄");
		if (inputValue.trim()) {
			setOpen(false);
			const newItem = { id: Date.now(), title: inputValue };
			const updatedBoards = boards?.map((board: Board) =>
				board.id === 1 ? { ...board, items: [...board.items, newItem] } : board
			);
			dispatch(setBoard(updatedBoards));
		}
		setInputValue("");
	};

	return (
		<div>
			<Button variant="contained" onClick={handleOpen}>
				{children}
			</Button>
			<ModalComponent
				title="Создание задачи	"
				description="Проект*"
				text="Резюме "
				option="mirlan"
				open={open}
				onClose={handleClose}
				handleAddTask={handleAddTask}
				style={style}
				inputValue={inputValue}
				handleChangeAdd={handleChangeAdd}
				onDelete={function (): void {
					throw new Error("Function not implemented.");
				}}
				select={""}
			/>
		</div>
	);
};

export default Modal;
