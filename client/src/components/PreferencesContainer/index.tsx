import React from "react";
import { Paper } from "@material-ui/core";
import "./styles.css";

const PreferencesContainer = ({ children }: { children: JSX.Element }) =>

    <Paper className="pref-container">
        {children}
    </Paper>

export default PreferencesContainer;
