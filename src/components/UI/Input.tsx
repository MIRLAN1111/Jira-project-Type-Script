import { TextField } from "@mui/material";

interface InputRezmo {
	onChange: () => void;
	type: string;
	value: string;
	placholder: string;
	variant: any;
}
const Input = ({ onChange, type, value, placholder, variant }: InputRezmo) => {
	return (
		<div>
			<TextField
				onChange={onChange}
				value={value}
				placeholder={placholder}
				variant={variant}
				type={type}
			/>
		</div>
	);
};

export default Input;
