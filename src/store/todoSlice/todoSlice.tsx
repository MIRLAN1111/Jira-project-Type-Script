import { createSlice } from "@reduxjs/toolkit";
interface Todo {
	id: number;
	text: string;
	completed: boolean;
}
interface Type {
	todos: Todo[];
}
const initialState: Type = {
	todos: [],
};
export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, { payload }) => {
			state.todos.push(payload);
		},
	},
});

export const { addTodo } = todoSlice.actions;
