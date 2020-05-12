import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import PlaylistDisplay from './Playlist-Display';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <PlaylistDisplay match={{ params: { playlistId: 1 } }} />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});