import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	board: [
		{
			id: 1,
			title: "Доска 1",
			items: [
				{ id: 1, title: "Lorem ipsum dolor sit amet " },
				{ id: 2, title: "Lorem ipsum dolor sit amet " },
			],
		},
		{
			id: 2,
			title: "Доска 2",
			items: [
				{ id: 4, title: "Lorem ipsum dolor sit amet " },
				{ id: 5, title: "Lorem ipsum dolor sit amet " },
			],
		},
		{
			id: 3,
			title: "Доска 3",
			items: [
				{ id: 7, title: "Lorem ipsum dolor sit amet " },
				{ id: 8, title: "Lorem ipsum dolor sit amet " },
			],
		},
	],
};

export const jiraSlice = createSlice({
	name: "jira",
	initialState,
	reducers: {setBoard:(state,{payload})=>{
    state.board = payload;
  }},
});

export const { setBoard } = jiraSlice.actions;
