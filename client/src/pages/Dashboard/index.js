import React from "react";
import { connect } from "react-redux";
import { RetrieveTournaments } from "../../actions/tournamentActions";
import Loading from "../../components/Loading";
import SideNav from "./SideNav";
import "./styles.css";
import { Route } from "react-router-dom";
import DashboardActivity from "../DashboardActivity";
import Tournaments from "../Tournaments";
import { withRouter } from "react-router";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    props.retrieveAvailableTournaments();
  }
  render() {
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

const mapDispatchToProps = dispatch => ({
  retrieveAvailableTournaments: () => dispatch(new RetrieveTournaments())
});

const mapStateToProps = state => ({
  tournamentsStates: state.tournaments
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
