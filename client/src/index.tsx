import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import { MuiThemeProvider } from '@material-ui/core/styles';

import Routes from './Routes';
import store from "./store";
import { theme } from "./Theme";
import { CssBaseline } from '@material-ui/core';

import "./styles.css";

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme} >
            <CssBaseline />
            <Routes />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
