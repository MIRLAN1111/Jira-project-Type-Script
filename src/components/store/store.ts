import { configureStore } from "@reduxjs/toolkit";
import { jiraSlice } from "./jiraSlice/jiraSlice";

export const store = configureStore({
	reducer: {
		[jiraSlice.name]: jiraSlice.reducer,
	},
});
