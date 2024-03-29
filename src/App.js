import React, { Component } from "react";
import { Route, Link, Routes } from "react-router-dom";
import "./App.css";
import config from "./config";
import PlaylistContext from "./PlaylistContext";
import Landing from "./Landingpage/Landing";
import Homepage from "./Homepage/Homepage";
import PlaylistDisplay from "./Playlists/Playlist-Display";
import ExistingPlaylists from "./Playlists/Existing-playlists";
import NotFoundPage from "./NotFoundPage";

class App extends Component {
	state = {
		genres: [],
		playlists: [],
		user: null,
		error: null,
		loaded: null,
	};

	setGenres = (genres) => {
		this.setState({
			genres,
		});
	};

	setPlaylists = (playlists) => {
		this.setState({
			playlists,
		});
	};

	setLoaded() {
		this.setState({
			loaded: true,
		});
	}

	fetcher = () => {
		let endpoint = config.ENDPOINT;
		const options = {
			method: "GET",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${config.API_KEY}`,
			},
		};
		Promise.all([
			fetch(endpoint + "/playlists", options),
			fetch(endpoint + "/genres", options),
			fetch(endpoint + "/auth", options),
		])
			.then(([playlistRes, genreRes, authRes]) => {
				if (!playlistRes.ok)
					return playlistRes.json().then((error) => Promise.reject(error));
				if (!genreRes.ok)
					return genreRes.json().then((error) => Promise.reject(error));
				if (!authRes.ok)
					return authRes.json().then((error) => Promise.reject(error));
				return Promise.all([
					playlistRes.json(),
					genreRes.json(),
					authRes.json(),
				]);
			})
			.then(([playlist, genres, auth]) => {
				this.setPlaylists(playlist);
				this.setGenres(genres);
				this.setLoaded();
			})
			.catch((error) => {
				console.error({ error });
			});
	};

	componentDidMount() {
		this.fetcher();
	}

	render() {
		const contextValue = {
			genres: this.state.genres,
			playlists: this.state.playlists,
			pageUpdate: this.fetcher,
			loaded: this.state.loaded,
		};

		return (
			<div className="App">
				<header className="App-header">
					<Link to={"/"} id="home-link">
						<h1>ShowTunes</h1>
					</Link>
					<hr />
				</header>
				<PlaylistContext.Provider value={contextValue}>
					<main id="stage">
						<Routes>
							<Route exact path="/" element={<Landing />} />
							<Route path="/homepage" element={<Homepage />} />
							<Route
								path="/existing-playlists"
								element={<ExistingPlaylists />}
							/>
							<Route
								path="/playlist-display/:playlistId"
								element={<PlaylistDisplay />}
							/>
							<Route element={<NotFoundPage />} />
						</Routes>
					</main>
				</PlaylistContext.Provider>
			</div>
		);
	}
}

export default App;
