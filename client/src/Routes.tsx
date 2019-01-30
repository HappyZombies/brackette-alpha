import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { withAuth } from "./components/Auth";
import App from './App';
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const Routes = () => (
    <Router>
        <Switch>
            <App>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={withAuth(Dashboard)} />
            </App>
        </Switch>
    </Router>
);

export default Routes;
