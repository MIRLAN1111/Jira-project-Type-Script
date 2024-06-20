import { ReactNode, useState } from "react";
import { Box, Typography, Modal as MuiModal } from "@mui/material";
import styled from "styled-components";
import { IoEllipsisHorizontal } from "react-icons/io5";

interface PropsComponent {
	title: string;
	open: boolean;
	onClose: () => void;
	style: any;
}

const ModalComponent = ({ title, open, onClose, style }: PropsComponent) => {
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
				<BoxMUi>
					<MUIBox></MUIBox>
				</BoxMUi>
			</Box>
		</MuiModal>
	);
};

interface TypeChildren {
	children: ReactNode;
}

const SettingModal = ({ children }: TypeChildren) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 200,
		bgcolor: "background.paper",
		border: "2px solid #000",
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
				title="Создание задачи"
				open={open}
				onClose={handleClose}
				style={style}
			/>
		</div>
	);
};

export default SettingModal;

const MUIBox = styled(Box)`
	display: flex;
	gap: 20px;
	margin-top: 10px;
`;
const BoxMUi = styled(Box)`
	display: flex;
	justify-content: space-between;
`;
