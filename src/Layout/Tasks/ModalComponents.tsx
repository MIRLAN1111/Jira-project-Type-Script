import { ChangeEvent } from "react";
import { Box, Typography, Modal as MuiModal, Select } from "@mui/material";
import styled from "styled-components";
import Button from "../../components/UI/Button";
import { PropsComponent } from "../../components/Ts/type";

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
}: PropsComponent & {
	inputValue: string;
	handleChangeAdd: (e: ChangeEvent<HTMLInputElement>) => void;
	handleAddTask: () => void;
}) => {
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
				<Select style={{ width: "200px" }}>
					<option
						value="done"
						style={{ color: "green", width: "130px", fontSize: "20px" }}>
						done
					</option>
				</Select>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					{text}
				</Typography>

				<MOMUI>
					<InputRezgo
						type="text"
						placeholder="Добавить Задачу"
						value={inputValue}
						onChange={handleChangeAdd}
					/>
				</MOMUI>
				<BoxMUi>
					<MUIBox>
						<Button variant="outlined" onClick={onClose}>
							Отмена
						</Button>
						<Button onClick={handleAddTask}>Создать</Button>
					</MUIBox>
				</BoxMUi>
			</Box>
		</MuiModal>
	);
};

export default ModalComponent;

const MUIBox = styled(Box)`
	margin-top: 50px;
	display: flex;
	gap: 20px;
`;

const MOMUI = styled(Box)`
	margin-top: -15px;
`;

const BoxMUi = styled(Box)`
	display: flex;
	justify-content: space-between;
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
