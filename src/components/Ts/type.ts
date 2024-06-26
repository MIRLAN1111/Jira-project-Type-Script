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
	select: string;
	option: string;
	open: boolean;
	onClose: () => void;
	style: any;
	onDelete: () => void;
}

export type Board = {
	id: number;
	title: string;
	items: any[];
	columns: any[];
	tasks: any[];
	
};
