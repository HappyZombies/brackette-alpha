import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

class App extends Component {
  render() {
    return (
      <div>
        <Button variant="contained" color="primary">
          Hello There
        </Button>
        <Icon>star</Icon>
      </div>
    );
  }
}

export default App;
