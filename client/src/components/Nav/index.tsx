import React from "react";
import { AppBar, Button, Icon, Toolbar, Typography } from "@material-ui/core";

import "./styles.css";

const ButtonAppBar = () => {
  return (
    <div className="app-bar-wrapper">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit" className="grow">
            Brackette
          </Typography>
          <Icon className="grow" fontSize="large">
            laptop
          </Icon>
          <Button color="inherit">Login/Register</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ButtonAppBar;
