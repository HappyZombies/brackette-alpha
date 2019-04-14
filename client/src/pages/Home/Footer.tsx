import React from "react";
import { Paper, Typography, IconButton, Icon } from "@material-ui/core";

import "./styles.css";
const Footer = () => (
  <footer>
    <Paper className="brackette-footer">
      <Typography>
        © {new Date().getFullYear()} Brackette - v0.0.0-alpha / Changelog /
        Terms and Conditions / Privacy Policy / Contact
      </Typography>
    </Paper>
  </footer>
);

export default Footer;
