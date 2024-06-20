import { ReactNode, useState } from "react";
import { Box, Typography, Modal as MuiModal } from "@mui/material";
import styled from "styled-components";
import Button from "./Button";

interface PropsComponent {
	title: string;
	text: string;
	description: string;
	staus: string;
	open: boolean;
	onClose: () => void;
	style: any;
}

const ModalComponent = ({
	title,
	description,
	text,
	staus,
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
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					{staus}
				</Typography>
				<Box>
					<ButtonIn>In Progress</ButtonIn>
				</Box>
        <BoxMUi>

					<InputRezgo placeholder="Резюме" />
          <MUIBox>

      <Button variant="outlined" onClick={onClose}>Отмена</Button>
      <Button>Создать</Button>
          </MUIBox>
        </BoxMUi>
			</Box>
		</MuiModal>
	);
};

interface TypeChildren {
	children: ReactNode;
}

const Modal = ({ children }: TypeChildren) => {
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
				staus="Статус"
				open={open}
				onClose={handleClose}
				style={style}
			/>
		</div>
	);
};

export default Modal;


const MUIBox = styled(Box)`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`
const BoxMUi = styled(Box)`
  display: flex;
 justify-content: space-between;
 
`
const SelectUsers = styled.select`
	width: 70%;
	padding: 10px;
`;

const ButtonIn = styled.button`
	width: 90px;
	background-color: #1f845a;
	height: 30px;
	border: none;
	color: #fff;
	border-radius: 3px;
`;

const InputRezgo = styled.input`
  width: 200px;
  height: 20px;
  margin-top: 20px;
  border: 1px solid black;
  color: black;
`