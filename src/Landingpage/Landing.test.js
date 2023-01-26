import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Landing from "./Landing";
import { createRoot } from "react-dom/client";

it("renders without crashing", () => {
	const div = document.createElement("div");
	const root = createRoot(div);
	root.render(
		<BrowserRouter>
			<Landing />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
