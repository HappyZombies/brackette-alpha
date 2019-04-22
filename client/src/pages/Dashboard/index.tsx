import React from "react";
import SideNav from "./SideNav";
import DashboardContent from "./DashboardContent";
import NewTournamentModal from "../../components/NewTournamentModal";

import "./styles.css";
import { Dispatch } from "redux";
import { RetrieveTournaments } from "../../actions/tournamentActions";
import { connect } from "react-redux";
import { render } from "react-dom";
import { TournamentStates } from "../../reducers/tournamentReducers";
import Loading from "../../components/Loading";

type Props = {
  tournamentsStates: TournamentStates;
  retrieveAvailableTournaments: () => any;
};
type State = {};
class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    props.retrieveAvailableTournaments();
  }
  render() {
    const { tournamentsStates } = this.props;
    if (tournamentsStates.pending) {
      return <Loading />;
    }
    return (
      <div>
        <SideNav />
        <DashboardContent />
        <NewTournamentModal />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  retrieveAvailableTournaments: () => dispatch(new RetrieveTournaments())
});

const mapStateToProps = (state: any) => ({
  tournamentsStates: state.tournaments
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
