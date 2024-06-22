import  { useState } from "react";
import { Box, TextField, styled } from "@mui/material";
import { RiAddBoxFill } from "react-icons/ri";
import { FaSave, FaWindowClose } from "react-icons/fa";

const Tasks: React.FC = () => {
	const [isInputVisible, setIsInputVisible] = useState(false);

	const handleButtonClick = () => {
		setIsInputVisible(true);
	};

	const handleClose = () => {
		setIsInputVisible(false);
	};
	return (
		<div >
			{isInputVisible ? (
				<div>
					<TextField type="text" />
          <GradiantMui>

          <CloseIcons onClick={handleClose} />
					<SaveIcons>Save</SaveIcons>
          </GradiantMui>

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

`
const SaveIcons = styled(FaSave)`
font-size: 25px;
font-weight: 600;
`
const CloseIcons = styled(FaWindowClose)`
font-size: 25px;
font-weight: 600;
`
const IoMdAddIcons = styled(RiAddBoxFill)`
  font-size: 30px;
  font-weight: 800;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 10px;
`;

export default Tasks;
