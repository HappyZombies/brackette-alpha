import React from "react";
import { Paper } from "@material-ui/core";
import "./styles.css";

const PreferencesContainer = ({ children }: { children: JSX.Element }) => (
  <div className="pref-container">{children}</div>
);

export default PreferencesContainer;
