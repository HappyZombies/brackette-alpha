import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RetrieveTournaments } from "../../actions/tournamentActions";
import { TournamentStates } from "../../reducers/tournamentReducers";
import Loading from "../../components/Loading";
import { withAuth } from "../../components/Auth";
import SideNav from "./SideNav";
import "./styles.css";
import { Route } from "react-router-dom";
import DashboardActivity from "./../DashboardActivity";
import Tournaments from "./../Tournaments";
import { withRouter } from "react-router";

type Props = {
  tournamentsStates: TournamentStates;
  retrieveAvailableTournaments: () => any;
  children: JSX.Element[];
};
type State = {};
class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    props.retrieveAvailableTournaments();
  }
  render() {
    // @ts-ignore
    const { tournamentsStates, match } = this.props;
    if (tournamentsStates.pending) {
      return <Loading />;
    }
    return (
      <div>
        <SideNav />
        <Route
          exact
          path={`${match.url}/activity`}
          component={DashboardActivity}
        />
        <Route exact path={`${match.url}/t/:id`} component={Tournaments} />
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

export default withRouter(
  //@ts-ignore
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
