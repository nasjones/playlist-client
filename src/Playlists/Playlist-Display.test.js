import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import PlaylistDisplay from "./Playlist-Display";
import { createRoot } from "react-dom/client";

it("renders without crashing", () => {
	const div = document.createElement("div");
	const root = createRoot(div);
	root.render(
		<BrowserRouter>
			<PlaylistDisplay match={{ params: { playlistId: 1 } }} />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
