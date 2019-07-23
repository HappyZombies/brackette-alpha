import React from "react";
import {
  Drawer,
  List,
  Tooltip,
  IconButton,
  Avatar,
  Divider
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { mdiPlus, mdiHome } from "@mdi/js";
import Icon from "@mdi/react";
import { DRAWER_WIDTH } from "../../utils/constants";
import { intToRGB, hashCode } from "../../utils";
import { connect } from "react-redux";
import { RetrieveTournaments } from "../../actions/tournamentActions";
import NewTournamentModal from "../../components/NewTournamentModal";
import { withRouter } from "react-router";

const styles = theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH
  }
});

class SideNav extends React.Component {
  state = {
    open: false
  };
  toggleModal = () => this.setState({ open: !this.state.open });
  render() {
    // @ts-ignore
    const { classes, tournamentsStates, history, match } = this.props;
    const { open } = this.state;
    return (
      <Drawer
        variant="permanent"
        anchor="left"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <List>
          <Tooltip title="Updates and Activity" placement="right">
            <IconButton
              className="grow"
              onClick={() => history.push(`${match.url}/activity`)}
            >
              <Avatar
                style={{
                  backgroundColor: "transparent"
                }}
              >
                <Icon path={mdiHome} size={1} />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Divider />
          {tournamentsStates.availableTournaments.map(t => (
            <Tooltip title={t.nickname} placement="right" key={t.id}>
              <IconButton
                className="grow"
                onClick={() => history.push(`${match.url}/t/${t.id}`)}
              >
                <Avatar
                  style={{
                    backgroundColor: `#${intToRGB(hashCode(t.nickname))}`
                  }}
                >
                  {t.nickname.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          ))}
          <Tooltip title="New Tournament" placement="right">
            <IconButton className="grow" onClick={this.toggleModal}>
              <Avatar
                style={{
                  backgroundColor: "transparent",
                  border: "1px dashed black",
                  borderRadius: "50%"
                }}
              >
                <Icon path={mdiPlus} size={1} />
              </Avatar>
            </IconButton>
          </Tooltip>
        </List>
        <NewTournamentModal open={open} toggleModal={this.toggleModal} />
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  tournamentsStates: state.tournaments
});

const mapDispatchToProps = dispatch => ({
  retrieveAvailableTournaments: () => dispatch(new RetrieveTournaments())
});

export default withRouter(
  //@ts-ignore
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(SideNav))
);
