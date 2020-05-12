import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import GenreCheck from './GenreCheck';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <GenreCheck id={1} name={"test"} />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});