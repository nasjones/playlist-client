## Name: Showtunes

### Link: [https://showtunes.vercel.app/](https://showtunes.vercel.app/)

### Api:

- my api has 4 endpoints that the user interacts with directly: genres , playlists, auth, and data
- genres: loads the genres onto the genre selection page
- playlists: allows the user to post the playlist info to the endpoint and pull all playlists from the endpoint
- auth: since this app also utilizes the spotify api this endpoint checks on load that the authorization is ready to go on load and if it isnt makes the proper request to the spotify api to get the authorization needed
- data: this is the endpoint that makes the request to get the songs from the spotify api for each playlist

### Summary :

This app allows users to submit a genre and runtime the app then takes this and makes a call to the spotify api and creates a playlist with songs whose total runtime is approximately the same length as specified.

### Screenshots:

![mobile landing](public/landing-ss-mobile.png)

![desktop landing](public/landing-SS-Desktop.png)

![mobile genre select](public/genreSelect-ss-mobile.png)

![desktop genre select](public/genreSelect-SS-desktop.png)

![mobile playlist display](public/playlistDisplay-ss-mobile.png)

![desktop playlist display](public/PlaylistDisplay-SS-desktop.png)

![desktop highlighted option](public/highlighted-option-ss.png)

![desktop existing display](public/existingDisplay-ss-desktop.png)

![desktop empty genre](public/emptyGenre-ss-desktop.png)

![nav display mobile](public/navDisplay-ss-mobile.png)

![playlist filter desktop](public/landing-SS-Desktop.png)

### technology used:

- React, CSS, Node, Express, and PostgreSQL
