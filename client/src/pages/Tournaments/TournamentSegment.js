import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import io from "socket.io-client";
import { Dispatch } from "redux";
import { SelectTournament } from "../../actions/tournamentActions";
import { TournamentStates } from "../../reducers/tournamentReducers";
import "./style.css";
import { AppBar, Tab } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

class TournamentSegment extends React.Component {
  constructor(props) {
    super(props);
    console.log("Contruct");
    //this.socket = io.connect();
  }
  componentDidMount() {
    // this.socket.emit(
    //   "enter room",
    //   this.props.tournamentsStates.currentTournament.roomCode
    // );
    // this.socket.on("welcome", function(data) {
    //   console.log("Incoming message!!!:", data);
    // });
  }
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentWillUnmount() {
    console.log("unmounting");
    // this.socket.emit("disconnecting");
    // this.socket.disconnect();
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { value } = this.state;
    return (
      <div className="tournament-appBar">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Matches" />
            <Tab label="Bracket" />
            <Tab label="Devices" />
            <Tab label="TOs" />
            <Tab label="Logs" />
            <Tab label="Settings" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <div>Matches</div>
          <div>Bracket</div>
          <div>Devices</div>
          <div>TOs</div>
          <div>Logs/Events</div>
          <div>Settings</div>
        </SwipeableViews>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  selectTournament: tournamentId => dispatch(new SelectTournament(tournamentId))
});

const mapStateToProps = state => ({
  tournamentsStates: state.tournaments
});

export default withRouter(
  //@ts-ignore
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentSegment)
);
