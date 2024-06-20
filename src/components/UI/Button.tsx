import { Button as MuiButton } from "@mui/material";
import React from "react";

type BtnProps = {
	children: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	type?: "button" | "submit" | "reset";
	variant?: "text" | "contained" | "outlined";
};

const Button: React.FC<BtnProps> = ({
	children,
	onClick,
	type = "button",
	variant = "contained",
}) => {
	return (
		<MuiButton onClick={onClick} type={type} variant={variant}>
			{children}
		</MuiButton>
	);
};

export default Button;
