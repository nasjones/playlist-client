import React from 'react'
const PlaylistContext = React.createContext({
    genres: [],
    playlists: [],
    pageUpdate: () => { },
})
export default PlaylistContext
