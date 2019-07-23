import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import alphaPic from "../../assets/alpha.png";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

//TODO: Update the dashboard activity with actual news backend support. Hard coded for now.
const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class DashboardActivity extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    //@ts-ignore
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    //@ts-ignore
    const { classes } = this.props;

    return (
      <div className="pref-container">
        <Card className={classes.card}>
          <CardHeader
            title="Brackette Alpha Release"
            subheader="September 14, 2016"
          />
          <CardMedia
            className={classes.media}
            image={alphaPic}
            title="Brackette Alpha Release"
          />
          <CardContent>
            <Typography component="p">Welcome to Brackette Alpha</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button
              color="inherit"
              component={({ innerRef, ...props }) => (
                <Link {...props} to="/news/1" />
              )}
            >
              Read More
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(DashboardActivity);
