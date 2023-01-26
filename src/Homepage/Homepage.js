import React, { useCallback, useEffect, useState } from "react";
import PlaylistContext from "../PlaylistContext";
import "./Homepage.css";
import GenreCheck from "./GenreCheck";
import ValidationError from "../ValidationError";
import config from "../config";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
	const [homeState, setHomeState] = useState({
		title: "",
		titleTouch: false,
		selectedId: null,
		selectedGen: null,
		genTouch: false,
		hour: NaN,
		timeTouch: false,
		min: NaN,
		windowHeight: 0,
		scrollErr: false,
	});
	const navigate = useNavigate();

	const fieldChange = useCallback(
		(e) => {
			setHomeState({
				...homeState,
				selectedId: e.target.id,
				selectedGen: e.target.value,
			});
		},
		[homeState]
	);

	const titleChange = useCallback(
		(e) => {
			setHomeState({
				...homeState,
				title: e.target.value,
				titleTouch: true,
			});
		},
		[homeState]
	);

	const minChange = useCallback(
		(e) => {
			setHomeState({
				...homeState,
				min: parseInt(e.target.value),
				timeTouch: true,
			});
		},
		[homeState]
	);

	const hourChange = useCallback(
		(e) => {
			setHomeState({
				...homeState,
				hour: parseInt(e.target.value),
				timeTouch: true,
			});
		},
		[homeState]
	);

	const minArr = useCallback(() => {
		let arr = new Array(60);
		for (let i = 0; i <= 59; i++) arr[i] = i;
		return arr;
	}, []);

	const hourArr = useCallback(() => {
		let arr = new Array(2);
		for (let i = 0; i <= 2; i++) arr[i] = i;
		return arr;
	}, []);

	const validateTime = useCallback(() => {
		const hourSelect = homeState.hour;
		const minSelect = homeState.min;
		if (
			(isNaN(hourSelect) && isNaN(minSelect)) ||
			(isNaN(hourSelect) && minSelect === 0) ||
			(isNaN(minSelect) && hourSelect === 0) ||
			(minSelect === 0 && hourSelect === 0)
		)
			return "Select a valid time.";
	}, [homeState.hour, homeState.min]);

	const validateGenre = useCallback(() => {
		const genre = homeState.selectedId;
		if (genre === null) return "You must select a genre.";
	}, [homeState.selectedId]);

	const validateTitle = useCallback(() => {
		const titleInput = homeState.title.trim();
		if (titleInput.length === 0) {
			return "Title is required.";
		} else if (titleInput.length < 3) {
			return "Title must be atleast 3 characters long.";
		}
	}, [homeState.title]);

	const subHandle = useCallback(
		(e, value) => {
			e.preventDefault();
			let time = (3600000 * homeState.hour || 0) + 60000 * (homeState.min || 0);
			let newPlaylist = {
				title: homeState.title.trim(),
				length: time,
				genre_id: homeState.selectedId,
				author: 1,
			};

			fetch(`${config.ENDPOINT}/playlists`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${config.API_KEY}`,
				},
				body: JSON.stringify(newPlaylist),
			})
				.then((res) => {
					if (!res.ok) return res.json().then((e) => Promise.reject(e));
					return res.json();
				})
				.then((res) => {
					value.pageUpdate();
					navigate(`/playlist-display/${res.id}`, {
						genres: value.genres,
						time: time,
					});
				})
				.catch((error) => {
					console.error({ error });
				});
		},
		[
			homeState.hour,
			homeState.min,
			homeState.selectedId,
			homeState.title,
			navigate,
		]
	);

	const goLand = useCallback(
		(e) => {
			e.preventDefault();
			navigate("/");
		},
		[navigate]
	);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return window.removeEventListener("scroll", handleScroll);
	});

	const errActivate = useCallback(() => {
		if (window.innerWidth < 450) {
			if (homeState.windowHeight >= window.innerHeight / 3) {
				setHomeState({
					...homeState,
					titleTouch: true,
					timeTouch: true,
					genTouch: true,
				});
			}
		} else if (homeState.windowHeight >= window.innerHeight / 2) {
			setHomeState({
				...homeState,
				titleTouch: true,
				timeTouch: true,
				genTouch: true,
			});
		}
	}, [homeState]);
	const handleScroll = useCallback(
		(e) => {
			setHomeState({
				...homeState,
				windowHeight: window.pageYOffset,
			});
			errActivate();
		},
		[errActivate, homeState]
	);

	return (
		<PlaylistContext.Consumer>
			{(value) => {
				let genres = value.genres.map((genre) => (
					<GenreCheck
						id={genre.id}
						name={genre.name}
						selected={homeState.selectedGen}
						key={genre.id}
					/>
				));

				if (genres.length === 0) return <h1 className="loading">Loading</h1>;

				let minutes = minArr().map((min) => {
					if (min < 10)
						return (
							<option value={min} key={min}>
								0{min}
							</option>
						);
					else
						return (
							<option value={min} key={min}>
								{min}
							</option>
						);
				});

				let hours = hourArr().map((min) => {
					return (
						<option value={min} key={min}>
							{min}
						</option>
					);
				});

				const timeError = validateTime();
				const genreError = validateGenre();
				const titleError = validateTitle();

				return (
					genres && (
						<div id="play-stage">
							<form>
								<div id="input-wrap">
									<div className="inputs">
										<label htmlFor="title-input">Playlist Name: </label>
										<input
											type="text"
											id="title-input"
											onChange={titleChange}
											className="user-inputs"
										/>
										{homeState.titleTouch && (
											<ValidationError message={titleError} />
										)}
									</div>
									<div className="inputs">
										<label htmlFor="hour-length">Playlist length: </label>
										<select onChange={hourChange} className="user-inputs">
											<option value={null}>Hr(s)</option>
											{hours}
										</select>
										:
										<select onChange={minChange} className="user-inputs">
											<option value={null}>Min(s)</option>
											{minutes}
										</select>
										{homeState.timeTouch && (
											<ValidationError message={timeError} />
										)}
									</div>
								</div>
								<fieldset onChange={fieldChange}>
									<legend>Choose your genre!</legend>
									{homeState.genTouch && (
										<ValidationError message={genreError} />
									)}
									<div id="genres">{genres}</div>
								</fieldset>
								<div id="button-wrap">
									<button
										type="submit"
										id="create"
										onClick={(e) => subHandle(e, value)}
										disabled={timeError || genreError || titleError}
									>
										Create your playlist!
									</button>
									<button id="create" onClick={(e) => goLand(e)}>
										Return Home
									</button>
								</div>
							</form>
						</div>
					)
				);
			}}
		</PlaylistContext.Consumer>
	);
}
