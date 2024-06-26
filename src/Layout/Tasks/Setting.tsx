import { ReactNode, useState } from "react";
import { Box, Typography, Modal as MuiModal } from "@mui/material";
import styled from "styled-components";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { PropsComponent } from "../../components/Ts/type";

const ModalComponent = ({
	title,
	open,
	onClose,
	style,
	onDelete,
}: PropsComponent) => {
	return (
		<MuiModal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<Box sx={style}>
				<BoxClose>
					<IoIosCloseCircle
						onClick={onClose}
						style={{ width: "30px", height: "25px" }}
					/>
				</BoxClose>
				<Typography
					id="modal-modal-title"
					variant="h6"
					marginTop={"-20px"}
					component="h6">
					{title}
				</Typography>
				<BoxMUi onClick={onDelete}>
					<MUIBox>Удалить Задачу</MUIBox>
					<MdDelete style={{ width: "60px", height: "20px" }} />
				</BoxMUi>
			</Box>
		</MuiModal>
	);
};

interface TypeChildren {
	children: ReactNode;
	onDelete: () => void;
}

const SettingModal = ({ children, onDelete }: TypeChildren) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 250,
		bgcolor: "background.paper",
		border: "2px solid #ffffff",
		boxShadow: 24,
		p: 4,
	}; 

	return (
		<div>
			<IoEllipsisHorizontal
				style={{
					fontSize: "20px",
					fontWeight: "900",
					background: "rgba(165, 42, 42, 0.433)",
					borderRadius: "5px",
				}}
				cursor={"auto"}
				onClick={handleOpen}>
				{children}
			</IoEllipsisHorizontal>
			<ModalComponent
				title="Настройка задачи"
				open={open}
				onClose={handleClose}
				style={style}
				onDelete={() => {
					onDelete();
					handleClose();
				} }
				text={""}
				description={""} select={""} option={""}			/>
		</div>
	);
};

export default SettingModal;

const MUIBox = styled(Box)`
	display: flex;
	gap: 20px;
	margin-top: 1px;
	cursor: auto;
	color: blue;
	font-size: 15px;
	font-weight: 600;
`;

const BoxMUi = styled(Box)`
	display: flex;
	gap: 25px;
	margin-top: 20px;
	color: red;
	cursor: pointer;
	&:active {
		color: blue;
	}
`;

const BoxClose = styled(Box)`
	text-align: end;
	margin-top: -30px;
	cursor: pointer;
	&:active {
		color: blue;
	}
`;
