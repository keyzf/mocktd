
import React from 'react';
import ReactDOM from 'react-dom';
import createRouter from './router';
import { Provider } from './createProvider';
ReactDOM.render(
    <Provider>
        {createRouter()}
    </Provider>,
    document.getElementById('app')
);