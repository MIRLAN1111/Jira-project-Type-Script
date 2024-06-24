import { ReactNode } from "react";

export interface PropsComponent {
	title: string;
	text: string;
	description: string;
	open: boolean;
	onClose: () => void;
	style: any;
}

export interface ChildrenProps {
	children: ReactNode;
}

export interface PropsComponent {
	title: string;
	open: boolean;
	onClose: () => void;
	style: any;
	onDelete: () => void;
}
