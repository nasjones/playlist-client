import React from 'react'
const PlaylistContext = React.createContext({
    genres: [],
    playlists: [],
    pageUpdate: () => { },
    loaded: null
})
export default PlaylistContext
