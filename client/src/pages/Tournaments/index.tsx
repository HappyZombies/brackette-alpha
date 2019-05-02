import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SelectTournament } from "../../actions/tournamentActions";
import { TournamentStates } from "../../reducers/tournamentReducers";
import Loading from "../../components/Loading";
import { Typography } from "@material-ui/core";
import "./style.css";
import TournamentSegment from "./TournamentSegment";

type Props = {
  selectTournament: (tournamentId: string) => void;
  tournamentsStates: TournamentStates;
  match: any;
};
type State = {};

class Tournaments extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { match, selectTournament } = this.props;
    // retrieve tournament when they go here, see if they have permission to get it or not.
    selectTournament(match.params.id);
  }
  componentDidUpdate(nextProps: Props) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.selectTournament(this.props.match.params.id);
    }
  }
  render() {
    const {
      currentTournament,
      currentTournamentError,
      currentTournamentPending
    } = this.props.tournamentsStates;
    if (currentTournamentPending) {
      return <Loading />;
    }
    if (currentTournamentError) {
      return <h1>{currentTournamentError}</h1>;
    }
    return (
      <div>
        <div className="tournament-wrapper">
          <Typography component="h1" className="brackette-title">
            {currentTournament.nickname}
          </Typography>
        </div>
        <TournamentSegment />
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
  )(Tournaments)
);
