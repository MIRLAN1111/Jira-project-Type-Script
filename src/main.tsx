import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./components/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<PersistGate persistor={persistor}></PersistGate>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
