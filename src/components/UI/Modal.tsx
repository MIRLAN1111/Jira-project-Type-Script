import { ReactNode, useState } from "react";
import { Box, Typography, Modal as MuiModal } from "@mui/material";
import styled from "styled-components";
import Button from "./Button";

interface PropsComponent {
	title: string;
	text: string;
	description: string;
	open: boolean;
	onClose: () => void;
	style: any;
}

interface ChildrenProps {
	children: ReactNode;
}

const Modal = ({ children }: ChildrenProps) => {
	const [inputValue, setInputValue] = useState("");
	console.log(inputValue);

	const ModalComponent = ({
		title,

		description,
		text,
		open,
		onClose,
		style,
	}: PropsComponent) => {
		return (
			<MuiModal
				open={open}
				onClose={onClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						{title}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{description}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{text}
					</Typography>
					<SelectUsers>
						<option>mirlan (DEV)</option>
						<option>mirlan (DEV)</option>
					</SelectUsers>
					<MOMUI>
						<InputRezgo
							type="text"
							placeholder="Добавить Задачу"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
					</MOMUI>
					<BoxMUi>
						<MUIBox>
							<Button variant="outlined" onClick={onClose}>
								Отмена
							</Button>
							<Button>Создать</Button>
						</MUIBox>
					</BoxMUi>
				</Box>
			</MuiModal>
		);
	};

	const [open, setOpen] = useState(false);

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
				title="Создание задачи"
				description="Обязательные поля отмечены звездочкой *"
				text="Проект*"
				open={open}
				onClose={handleClose}
				style={style}
			/>
		</div>
	);
};

export default Modal;

const MUIBox = styled(Box)`
	margin-top: 50px;
`;
const MOMUI = styled(Box)`
	margin-top: -15 px;
`;
const BoxMUi = styled(Box)`
	display: flex;
	justify-content: space-between;
`;
const SelectUsers = styled.select`
	width: 70%;
	padding: 10px;
	border: 1px solid black;
	font-size: 15px;
	font-weight: 600;
`;

const InputRezgo = styled.input`
	width: 300px;
	height: 40px;
	margin-top: 30px;
	border: 1px solid black;
	color: black;
	font-size: 15px;
	font-weight: 500;
`;
