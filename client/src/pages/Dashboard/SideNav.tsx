import React from "react";
import {
  Drawer,
  List,
  Tooltip,
  ListItem,
  ListItemIcon,
  IconButton,
  Avatar
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { DRAWER_WIDTH } from "../../utils/Constants";
import { intToRGB, hashCode } from "../../utils";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RetrieveTournaments } from "../../actions/tournamentActions";
import {
  TournamentStates,
  Tournaments
} from "../../reducers/tournamentReducers";

type Props = {
  tournamentsStates: TournamentStates;
  retrieveAvailableTournaments: () => any;
  classes: any;
};
type State = {};

const styles = (theme: any) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH
  }
});

class SideNav extends React.Component<Props, State> {
  render() {
    const { classes, tournamentsStates } = this.props;
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
          {tournamentsStates.availableTournaments.map((t: Tournaments) => (
            <Tooltip title={t.nickname} placement="right" key={t.id}>
              <IconButton className="grow">
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
            <IconButton className="grow">
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
      </Drawer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  tournamentsStates: state.tournaments
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  retrieveAvailableTournaments: () => dispatch(new RetrieveTournaments())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SideNav));
