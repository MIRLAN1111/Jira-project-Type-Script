import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todoSlice/todoSlice";

export const store = configureStore({
	reducer: {
		[todoSlice.name]: todoSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
