import React from "react";
import { AppBar, Button, Icon, Toolbar, Typography } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import "./styles.css";

const Nav = () => {
  return (
    <div className="app-bar-wrapper">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            color="inherit"
            className="grow"
            component={({ innerRef, ...props }) => <Link {...props} to="/" />}
          >
            Brackette
          </Typography>
          <Button color="inherit" component={({ innerRef, ...props }) => <Link {...props} to="/login" />}>
            Login/Register
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
