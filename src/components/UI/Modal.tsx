import { ChangeEvent, useState } from "react";
import Button from "./Button";
import ModalComponent from "../../Layout/Tasks/ModalComponents";
import { toast } from "react-toastify";
import { ChildrenProps } from "../Ts/type";

interface ModalProps extends ChildrenProps {}

const Modal = ({ children }: ModalProps) => {
	const [inputValue, setInputValue] = useState("");
	const [open, setOpen] = useState(false);

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
		toast("Проект добавлен 🦄");
	};

	return (
		<div>
			<Button variant="contained" onClick={handleOpen}>
				{children}
			</Button>
			<ModalComponent
				title="Создание задачи"
				description="Проект*"
				text="Резюме"
				option="mirlan"
				open={open}
				onClose={handleClose}
				handleAddTask={handleAddTask}
				style={style}
				inputValue={inputValue}
				handleChangeAdd={handleChangeAdd}
				onDelete={() => {}}
				select={""}
			/>
		</div>
	);
};

export default Modal;
