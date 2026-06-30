import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import App from "./App";
import { store } from "./store/persistence";
import { BrowserRouter } from "react-router";
import { LineOSThemeProvider } from "./theme/provider";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<LineOSThemeProvider>
						<App />
					</LineOSThemeProvider>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
