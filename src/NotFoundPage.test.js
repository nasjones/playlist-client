import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

it("renders without crashing", () => {
	const div = document.createElement("div");
	const root = createRoot(div);
	root.render(
		<BrowserRouter>
			<NotFoundPage />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
