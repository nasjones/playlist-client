import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";
import { createRoot } from "react-dom/client";

it("renders without crashing", () => {
	const div = document.createElement("div");
	const root = createRoot(div);
	root.render(
		<BrowserRouter>
			<Nav />
		</BrowserRouter>
	);
	ReactDOM.unmountComponentAtNode(div);
});
