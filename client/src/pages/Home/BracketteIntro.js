import React from "react";
import { Typography, Grid } from "@material-ui/core";
import Icon from "@mdi/react";
import {
  mdiClipboardTextOutline,
  mdiAccountGroupOutline,
  mdiThumbUpOutline
} from "@mdi/js";

const BracketteIntro = () => (
  <section className="brackette-intro">
    <Typography component="h2" variant="h2" color="secondary" gutterBottom>
      what
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
            manageTitle
          </Typography>
          <Typography paragraph>manageDesc</Typography>
        </Grid>
        <Grid item xs>
          <Icon path={mdiAccountGroupOutline} size={1.5} />
          <Typography
            component="h4"
            variant="h4"
            color="secondary"
            gutterBottom
          >
            collabTitle
          </Typography>
          <Typography>collabDesc</Typography>
        </Grid>
        <Grid item xs>
          <Icon path={mdiThumbUpOutline} size={1.5} />
          <Typography
            component="h4"
            variant="h4"
            color="secondary"
            gutterBottom
          >
            happyTitle
          </Typography>
          <Typography>happyDesc</Typography>
        </Grid>
      </Grid>
    </div>
  </section>
);

export default BracketteIntro;
