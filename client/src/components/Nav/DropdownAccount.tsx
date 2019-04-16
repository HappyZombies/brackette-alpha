import React, { Component } from "react";
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  IconButton
} from "@material-ui/core";
import Icon from "@mdi/react";
import {
  mdiAccount,
  mdiViewDashboard,
  mdiSettings,
  mdiBug,
  mdiLogoutVariant
} from "@mdi/js";
import { withRouter, RouteComponentProps } from "react-router";
import store from "store";
import { TOKEN } from "../../utils/Constants";

type State = {
  open: boolean;
};

type PathParamsType = {};

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {};

class DropdownAccount extends Component<PropsType, State> {
  state = {
    open: false
  };

  anchorEl: any = null;

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = (event: any) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  navigate = (event: any, path: string) => {
    this.handleClose(event);
    if (path === "logout") {
      store.remove(TOKEN);
    }
    this.props.history.push(`/${path}`);
  };

  redirect = () => {};

  render() {
    const { open } = this.state;
    return (
      <div>
        <IconButton
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          <Icon path={mdiAccount} size={1} color="#24292D" />
        </IconButton>
        <Popper
          id="popper-account"
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            // @ts-ignore
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem
                      onClick={e => {
                        this.navigate(e, "dashboard");
                      }}
                    >
                      <Icon path={mdiViewDashboard} size={1} color="#24292D" />
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      onClick={e => {
                        this.navigate(e, "preferences");
                      }}
                    >
                      <Icon path={mdiSettings} size={1} color="#24292D" />
                      Preferences
                    </MenuItem>
                    <MenuItem
                      onClick={e => {
                        e.preventDefault();
                        window.open(
                          "https://github.com/HappyZombies/brackette-alpha/issues/new",
                          "_blank"
                        );
                      }}
                    >
                      <Icon path={mdiBug} size={1} color="#24292D" />
                      Bug Report
                    </MenuItem>
                    <MenuItem
                      onClick={e => {
                        this.navigate(e, "logout");
                      }}
                    >
                      <Icon path={mdiLogoutVariant} size={1} color="#24292D" />
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

export default withRouter(DropdownAccount);
