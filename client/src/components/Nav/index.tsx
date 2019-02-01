import React from "react";
import { AppBar, Button, Toolbar, Typography, IconButton } from "@material-ui/core";
import Icon from '@mdi/react'
import { mdiGithubFace, mdiTwitter, mdiReddit, mdiDiscord, mdiAccount } from '@mdi/js'
import { Link } from "react-router-dom";

import "./styles.css";
import { TOKEN } from "../../utils/Constants";
import store from 'store';
import DropdownAccount from "./DropdownAccount";

const Nav = () => {
  const token = store.get(TOKEN);
  return (
    <div className="app-bar-wrapper">
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <span className="grow">
            <Typography
              variant="h5"
              color="inherit"
              id="logo"
              component={({ innerRef, ...props }) => <Link {...props} to="/" />}
            >
              Brackette
          </Typography>
            <IconButton href="https://github.com/happyzombies/brackette-alpha" target="_blank" className="grow">
              <Icon
                path={mdiGithubFace}
                size={1}
                color="#24292D"
              />
            </IconButton>
            <IconButton href="https://github.com/happyzombies/brackette-alpa" target="_blank" className="grow">
              <Icon
                path={mdiTwitter}
                size={1}
                color="#24292D"
              />
            </IconButton>
            <IconButton href="https://github.com/happyzombies/brackette-alpa" target="_blank" className="grow">
              <Icon
                path={mdiDiscord}
                size={1}
                color="#24292D"
              />
            </IconButton>
            <IconButton href="https://reddit.com/r/brackette" target="_blank" className="grow">
              <Icon
                path={mdiReddit}
                size={1}
                color="#24292D"
              />
            </IconButton>
          </span>
          {
            token ?
              <DropdownAccount /> :
              <Button color="inherit" component={({ innerRef, ...props }) => <Link {...props} to="/login" />}>
                Login/Register
          </Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
