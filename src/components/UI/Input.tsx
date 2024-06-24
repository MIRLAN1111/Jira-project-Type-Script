import { TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface InputRezmo {
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	type: string;
	value: string;
	placholder: string;
	variant: any;
	label: string;
}
const Input = ({
	onChange,
	type,
	value,
	placholder,
	variant,
	label,
}: InputRezmo) => {
	return (
		<div>
			<TextField
				label={label}
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
