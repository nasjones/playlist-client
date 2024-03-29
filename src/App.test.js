import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createRoot } from "react-dom/client";

it("renders without crashing", () => {
	const div = document.createElement("div");
	const root = createRoot(div);
	root.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
	ReactDOM.unmountComponentAtNode(div);
});
