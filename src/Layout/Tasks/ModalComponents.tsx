import { ChangeEvent } from "react";
import {
	Box,
	Typography,
	Modal as MuiModal,
	Select,
	MenuItem,
	styled,
} from "@mui/material";
import Button from "../../components/UI/Button";
import { PropsComponent } from "../../components/Ts/type";
import Input from "../../components/UI/Input";

interface ModalComponentProps extends PropsComponent {
	inputValue: string;
	handleChangeAdd: (e: ChangeEvent<HTMLInputElement>) => void;
	handleAddTask: () => void;
}

const ModalComponent = ({
	title,
	description,
	text,
	open,
	onClose,
	style,
	inputValue,
	handleChangeAdd,
	handleAddTask,
}: ModalComponentProps) => {
	return (
		<MuiModal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<StyledBox sx={style}>
				<Typography variant="h6" component="h2">
					{title}
				</Typography>
				<Typography sx={{ mt: 2 }}>{description}</Typography>
				<Box sx={{ mt: 2, width: "100%" }}>
					<Select defaultValue="Проект Один">
						<MenuItem value="Проект Один">Проект Один</MenuItem>
						<MenuItem value="Проект Два">Проект Два</MenuItem>
					</Select>
				</Box>
				<Typography sx={{ mt: 2 }}>{text}</Typography>
				<Box sx={{ mt: 2 }}>
					<InputMan
						type="text"
						placholder="Заполните Резюме"
						value={inputValue}
						onChange={handleChangeAdd}
						variant={undefined}
						label={""}
					/>
				</Box>
				<Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap:"30px"}}>
					<Button variant="outlined" onClick={onClose} >
						Отмена
					</Button>
					<Button onClick={handleAddTask}>Создать</Button>
				</Box>
			</StyledBox>
		</MuiModal>
	);
};

export default ModalComponent;

const StyledBox = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 600px;
	padding: 24px;
	background-color: white;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InputMan = styled(Input)`
	height: 40px;
	font-size: 15px;
	font-weight: 500;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 8px;
	box-sizing: border-box;
`;
