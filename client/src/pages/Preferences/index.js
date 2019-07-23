import React from "react";
import SwipeableViews from "react-swipeable-views";
import { Typography, Tabs, Tab, AppBar } from "@material-ui/core";

import Settings from "../../components/Settings";
import PasswordUpdate from "../../components/PasswordUpdate";
import ApiKeysUpdate from "../../components/ApiKeysUpdate";

import "./styles.css";

class Preferences extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <div className="settings-banner">
          <Typography component="h1" className="brackette-title">
            PREFERENCES
          </Typography>
        </div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Settings" />
            <Tab label="Password" />
            <Tab label="API Keys" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <Settings />
          <PasswordUpdate />
          <ApiKeysUpdate />
        </SwipeableViews>
      </div>
    );
  }
}

export default Preferences;
