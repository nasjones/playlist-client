import React, { useCallback, useEffect, useState } from "react";
import config from "../config";
import Song from "./Song";
import Nav from "../Nav";
import "./Playlist-Display.css";
import { useParams } from "react-router-dom";

export default function PlaylistDisplay() {
	const { playlistId } = useParams();

	const [playlistState, setPlaylistState] = useState({
		playlistId: playlistId,
		genreName: null,
		playlist: null,
		songs: [],
		loaded: false,
		error: null,
		hidden: true,
	});

	const setErrorTrue = useCallback(() => {
		setPlaylistState(prev => ({ ...prev, error: true }));
	}, []);

	const fetcher = useCallback(
		(playlistId) => {
			setPlaylistState(prev => ({ ...prev, playlist: null, songs: [], loaded: false, error: null }));


			//this makes the first get request to the playlist endpoint to get the playlist information
			fetch(config.ENDPOINT + `/playlists/${playlistId}`, {
				method: "GET",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${config.API_KEY}`,
				},
			})
				.then((res) => {
					if (!res.ok) return res.json().then((e) => Promise.reject(e));
					return res.json();
				})
				.then((playlist) => {

					//this rand value is made to offset the songs chosen to keep them random
					let rand = Math.floor(Math.random() * 400);
					let queryString =
						"genre:%20" +
						playlist.genre_name +
						"&type=track&limit=50&offset=" +
						rand;

					let fetchData = {
						qString: queryString,
					};
					//this post request is what is made to the spotify api with the genre information
					fetch(`${config.ENDPOINT}/data`, {
						method: "POST",
						headers: {
							"content-type": "application/json",
							Authorization: `Bearer ${config.API_KEY}`,
						},
						body: JSON.stringify(fetchData),
					})
						.then((res3) => {
							if (!res3.ok) return res3.json().then((e) => Promise.reject(e));
							return res3.json();
						})
						.then((response) => {
							let runtime = 0;
							let chosen = [];
							let songList = [];
							//this adds songs to the playlist until the runtime criteria is met
							while (runtime < playlist.length) {
								let trackChoice = Math.floor(Math.random() * 50);

								if (!chosen.includes(trackChoice)) {
									chosen.push(trackChoice);
									let artists = [];
									for (const element of response.tracks.items[trackChoice].artists)
										artists.push(element.name);

									console.log(response);
									let song = {
										id: response.tracks.items[trackChoice].id,
										url: response.tracks.items[trackChoice].external_urls
											.spotify,
										title: response.tracks.items[trackChoice].name,
										length: response.tracks.items[trackChoice].duration_ms,
										explicit: response.tracks.items[trackChoice].explicit,
										artist: artists,
									};
									runtime += song.length;
									songList.push(song);
								}
							}
							console.log(playlist);
							setPlaylistState(prev => ({
								...prev,
								playlist: playlist,
								genreName: playlist.genre_name,
								songs: songList,
								loaded: true
							}));
						})
						.catch((error2) => {
							console.error({ error2 });
							setErrorTrue();
						});
				})
				.catch((error) => {
					console.error({ error });
					setErrorTrue();
				});
		}, [setErrorTrue]
	);

	const resize = useCallback(() => {
		let display = window.innerWidth >= 850;

		setPlaylistState(prev => ({ ...prev, hidden: !display }));

	}, []);

	useEffect(() => {
		fetcher(playlistId);
		resize();

		window.addEventListener("resize", resize);
		return () => window.removeEventListener("resize", resize);
	}, [playlistId, fetcher, resize]);

	if (!playlistState.loaded && playlistState.error === null)
		return <h1 className="loading">Loading..</h1>;

	if (playlistState.error === true)
		return (
			<div className="error-wrap">
				<h1 className="error">
					Sorry there was an error with this request. Maybe try again later or
					try something else.
				</h1>
				<a href="/">Return home</a>
			</div>
		);

	let songDisplay = playlistState.songs.map((song) => {
		return <Song track={song} key={song.id} />;
	});

	return (
		<div id="playlistDisplay">
			<Nav clicker={fetcher} />
			<div id="playlistContent">
				<h2 id="playlist-title">{playlistState.playlist.title}</h2>
				<h3>{playlistState.genreName}</h3>
				{songDisplay}
			</div>
		</div>
	);
}
