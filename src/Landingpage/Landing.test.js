import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Landing from "./Landing";

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
