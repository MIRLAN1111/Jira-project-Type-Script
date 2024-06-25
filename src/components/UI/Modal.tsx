import { ChangeEvent, useState } from "react";
import Button from "./Button";
import { ChildrenProps } from "../Ts/type";
import ModalComponent from "../../Layout/Tasks/ModalComponents";

const Modal = ({ children }: ChildrenProps) => {
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

	return (
		<div>
			<Button variant="contained" onClick={handleOpen}>
				{children}
			</Button>
			<ModalComponent
				title="Создание задачи	"
				description="Обязательные поля отмечены звездочкой *"
				option="mirlan"
				text="Проект*"
				open={open}
				onClose={handleClose}
				style={style}
				inputValue={inputValue}
				handleChangeAdd={handleChangeAdd} onDelete={function (): void {
					throw new Error("Function not implemented.");
				} } handleAddTask={function (): void {
					throw new Error("Function not implemented.");
				} } select={""}			/>
		</div>
	);
};

export default Modal;
