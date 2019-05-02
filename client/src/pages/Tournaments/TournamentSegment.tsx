import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SelectTournament } from "../../actions/tournamentActions";
import { TournamentStates } from "../../reducers/tournamentReducers";
import "./style.css";
import { AppBar, Tab } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

type Props = {
  selectTournament: (tournamentId: string) => void;
  tournamentsStates: TournamentStates;
};
type State = {
  value: number;
};

class TournamentSegment extends React.Component<Props, State> {
  state = {
    value: 0
  };

  handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  handleChangeIndex = (index: number) => {
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectTournament: (tournamentId: string) =>
    dispatch(new SelectTournament(tournamentId))
});

const mapStateToProps = (state: any) => ({
  tournamentsStates: state.tournaments
});

export default withRouter(
  //@ts-ignore
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentSegment)
);
