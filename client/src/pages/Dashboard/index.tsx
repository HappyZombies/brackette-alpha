import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RetrieveTournaments } from "../../actions/tournamentActions";
import { TournamentStates } from "../../reducers/tournamentReducers";
import Loading from "../../components/Loading";
import { withAuth } from "../../components/Auth";
import SideNav from "./SideNav";
import "./styles.css";

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
    const { tournamentsStates, children } = this.props;
    if (tournamentsStates.pending) {
      return <Loading />;
    }
    return (
      <div>
        <SideNav />
        {children}
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

export default withAuth(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
