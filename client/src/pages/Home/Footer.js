import React from "react";
import { Paper, Typography } from "@material-ui/core";

import "./styles.css";
const Footer = () => (
  <footer>
    <Paper className="brackette-footer">
      <Typography>
        © {new Date().getFullYear()} Brackette - v0.0.0-alpha&nbsp;/&nbsp;
        <a
          href="https://github.com/HappyZombies/brackette-alpha/blob/master/CHANGELOG.md"
          target="_blank"
        >
          Changelog
        </a>
        &nbsp;/&nbsp;Contact
      </Typography>
    </Paper>
  </footer>
);

export default Footer;
