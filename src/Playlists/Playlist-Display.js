import React, { Component } from "react";
import config from "../config";
import Song from "./Song";
import Nav from "../Nav";
import "./Playlist-Display.css";

export default class PlaylistDisplay extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			playlistId: this.props.match.params.playlistId,
			genreName: null,
			playlist: null,
			songs: [],
			loaded: false,
			error: null,
			hidden: true,
		};
	}

	setPlaylistId = (playlistId) => {
		this.setState({ playlistId });
	};

	setPlaylist = (playlist) => {
		this.setState({ playlist });
	};

	setGenre = (genre) => {
		this.setState({
			genreName: genre.name,
		});
	};

	setErrorTrue = () => {
		this.setState({
			error: true,
		});
	};

	addSongs = (song) => {
		this.setState({
			songs: [...this.state.songs, song],
		});
	};

	setLoaded = (bool) => {
		this.setState({
			loaded: bool,
		});
	};

	fetcher = (playlistId) => {
		this.setState({
			playlist: null,
			songs: [],
		});

		this.setState({
			loaded: false,
		});
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
				this.setPlaylist(playlist);
				//this is the second get request to get the genre information
				fetch(config.ENDPOINT + `/genres/${playlist.genre_id}`, {
					method: "GET",
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${config.API_KEY}`,
					},
				})
					.then((res2) => {
						if (!res2.ok)
							return res2.json().then((e) => Promise.reject(e));
						return res2.json();
					})
					.then((genre) => {
						this.setGenre(genre);
						//this rand value is made to offset the songs chosen to keep them random
						let rand = Math.floor(Math.random() * 1950);
						let queryString =
							"genre:%20" +
							genre.name +
							"&type=track&limit=50&offset=" +
							rand;

						let fetData = {
							qString: queryString,
						};
						//this post request is what is made to the spotify api with the genre information
						fetch(`${config.ENDPOINT}/data`, {
							method: "POST",
							headers: {
								"content-type": "application/json",
								Authorization: `Bearer ${config.API_KEY}`,
							},
							body: JSON.stringify(fetData),
						})
							.then((res3) => {
								if (!res3.ok)
									return res3
										.json()
										.then((e) => Promise.reject(e));
								return res3.json();
							})
							.then((response) => {
								let runtime = 0;
								let chosen = [];
								//this adds songs to the playlist until the runtime criteria is met
								while (runtime < playlist.length) {
									let trackChoice = Math.floor(
										Math.random() * 50
									);

									if (!chosen.includes(trackChoice)) {
										chosen.push(trackChoice);
										let artists = [];
										for (
											let i = 0;
											i <
											response.tracks.items[trackChoice]
												.artists.length;
											i++
										)
											artists.push(
												response.tracks.items[
													trackChoice
												].artists[i].name
											);

										let song = {
											id: response.tracks.items[
												trackChoice
											].id,
											url: response.tracks.items[
												trackChoice
											].external_urls.spotify,
											title: response.tracks.items[
												trackChoice
											].name,
											length: response.tracks.items[
												trackChoice
											].duration_ms,
											explicit:
												response.tracks.items[
													trackChoice
												].explicit,
											artist: artists,
										};

										runtime += song.length;
										this.addSongs(song);
									}
								}
								this.setLoaded(true);
							})
							.catch((error3) => {
								console.error({ error3 });
								this.setErrorTrue();
							});
					})
					.catch((error2) => {
						console.error({ error2 });
						this.setErrorTrue();
					});
			})
			.catch((error) => {
				console.error({ error });
				this.setErrorTrue();
			});
	};

	componentDidMount() {
		this._isMounted = true;
		let playlistId = this.props.match.params.playlistId;
		if (this._isMounted) {
			this.fetcher(playlistId);
		}
		window.addEventListener("resize", this.resize.bind(this));
		this.resize();
	}

	resize() {
		let display = window.innerWidth >= 850;
		if (display) {
			this.setState({ hidden: false });
		} else {
			this.setState({ hidden: true });
		}
	}

	render() {
		if (!this.state.loaded && this.state.error === null)
			return <h1 className="loading">Loading..</h1>;

		if (this.state.error === true)
			return (
				<div>
					<h1 className="error">
						Sorry there was an error with this request. Maybe try
						again later or try something else.
					</h1>
					<a href="/">Return home</a>
				</div>
			);

		let songDisplay = this.state.songs.map((song) => {
			return <Song track={song} key={song.id} />;
		});

		return (
			<div id="playlistDisplay">
				<Nav clicker={this.fetcher} />
				<div id="playlistContent">
					<h2 id="playlist-title">{this.state.playlist.title}</h2>
					<h3>{this.state.genreName}</h3>
					{songDisplay}
				</div>
			</div>
		);
	}
}
