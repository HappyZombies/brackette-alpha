import React from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import Icon from "@mdi/react";
import {
  mdiClipboardTextOutline,
  mdiAccountGroupOutline,
  mdiThumbUpOutline
} from "@mdi/js";
import { FormattedMessage } from "react-intl";

const BracketteIntro = () => (
  <section className="brackette-intro">
    <Typography component="h2" variant="h2" color="secondary" gutterBottom>
      <FormattedMessage id="app.what" />
    </Typography>
    <div className="intro-wrapper">
      <Grid container spacing={24}>
        <Grid item xs>
          <Icon path={mdiClipboardTextOutline} size={1.5} />
          <Typography
            component="h4"
            variant="h4"
            color="secondary"
            gutterBottom
          >
            <FormattedMessage id="app.manageTitle" />
          </Typography>
          <Typography paragraph>
            <FormattedMessage id="app.manageDesc" />
          </Typography>
        </Grid>
        <Grid item xs>
          <Icon path={mdiAccountGroupOutline} size={1.5} />
          <Typography
            component="h4"
            variant="h4"
            color="secondary"
            gutterBottom
          >
            <FormattedMessage id="app.collabTitle" />
          </Typography>
          <Typography>
            <FormattedMessage id="app.collabDesc" />
          </Typography>
        </Grid>
        <Grid item xs>
          <Icon path={mdiThumbUpOutline} size={1.5} />
          <Typography
            component="h4"
            variant="h4"
            color="secondary"
            gutterBottom
          >
            <FormattedMessage id="app.happyTitle" />
          </Typography>
          <Typography>
            <FormattedMessage id="app.happyDesc" />
          </Typography>
        </Grid>
      </Grid>
    </div>
  </section>
);

export default BracketteIntro;
