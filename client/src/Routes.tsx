import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import App from './App';

const Routes = () => (
    <Router>
        <Switch>
            <App>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </App>
        </Switch>
    </Router>
);

export default Routes;
