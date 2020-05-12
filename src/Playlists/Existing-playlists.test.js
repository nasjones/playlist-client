import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import ExistingPlaylists from './Existing-playlists';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <ExistingPlaylists />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});