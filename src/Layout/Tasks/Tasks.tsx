import { useState, ChangeEvent, FormEvent } from "react";
import { Box, styled } from "@mui/material";
import { RiAddBoxFill } from "react-icons/ri";
import { FaSave, FaWindowClose } from "react-icons/fa";
import { Board } from "../../components/Ts/type";
import Input from "../../components/UI/Input";

interface TasksProps {
	addBoard: (newBoard: Board) => void;
}

const Tasks: React.FC<TasksProps> = ({ addBoard }) => {
	const [isInputVisible, setIsInputVisible] = useState(false);
	const [newBoardTitle, setNewBoardTitle] = useState("");

	const handleButtonClick = () => {
		setIsInputVisible(true);
	};

	const handleClose = () => {
		setIsInputVisible(false);
		setNewBoardTitle("");
	};

	const handleSave = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (newBoardTitle.trim() !== "") {
			const newBoard: Board = {
				id: Math.random(),
				title: newBoardTitle,
				items: [],
			};
			addBoard(newBoard);
			setIsInputVisible(false);
			setNewBoardTitle("");
		}
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewBoardTitle(e.target.value);
	};

	return (
		<div>
			{isInputVisible ? (
				<div>
					<form onSubmit={handleSave}>
						<Input
							type="text"
							label="Название Доску"
							value={newBoardTitle}
							onChange={handleInputChange}
							placholder="Пишите что нибудь"
							variant={undefined}
						/>
						<GradiantMui>
							<CloseIcons onClick={handleClose} />
							<SaveIcons type="submit" />
						</GradiantMui>
					</form>
				</div>
			) : (
				<IoMdAddIcons onClick={handleButtonClick} />
			)}
		</div>
	);
};

const GradiantMui = styled(Box)`
	display: flex;
	justify-content: end;
	gap: 30px;
`;

const SaveIcons = styled(FaSave)`
	font-size: 25px;
	font-weight: 600;
	cursor: pointer;
`;

const CloseIcons = styled(FaWindowClose)`
	font-size: 25px;
	font-weight: 600;
	cursor: pointer;
`;

const IoMdAddIcons = styled(RiAddBoxFill)`
	font-size: 30px;
	font-weight: 800;
	cursor: pointer;
	margin-left: 10px;
	margin-top: 10px;
`;

export default Tasks;
