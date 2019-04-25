import React from "react";
import { Typography, Grid, Paper, Button } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

const BracketteFeatures = () => (
  <section className="brackette-features">
    <Paper className="brackette-features-paper">
      <div className="feature-wrapper">
        <Grid>
          <Typography component="h2" variant="h2" gutterBottom>
            <FormattedMessage id="app.FeatureTitle" />
          </Typography>
          <Grid container spacing={24} className="row">
            <Grid item md={6} className="feature-text">
              <Typography component="h5" variant="h5">
                <FormattedMessage id="app.Feature1Title" />
              </Typography>
              <Typography paragraph>
                <FormattedMessage id="app.Feature1Desc" />
              </Typography>
            </Grid>
            <Grid item md={6} className="feature-img">
              <img src="https://via.placeholder.com/600x400" alt="something" />
            </Grid>
          </Grid>
          <Grid container spacing={24} className="row">
            <Grid item md={6} className="feature-img">
              <img
                src="https://via.placeholder.com/600x400"
                alt="something"
                className="opposite"
              />
            </Grid>
            <Grid item md={6} className="feature-text-opposite">
              <Typography component="h5" variant="h5">
                <FormattedMessage id="app.Feature2Title" />
              </Typography>
              <Typography paragraph>
                <FormattedMessage id="app.Feature2Desc" />
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={24} className="row">
            <Grid item md={6} className="feature-text">
              <Typography component="h5" variant="h5">
                <FormattedMessage id="app.Feature3Title" />
              </Typography>
              <Typography paragraph>
                <FormattedMessage id="app.Feature3Desc" />
              </Typography>
            </Grid>
            <Grid item md={6} className="feature-img">
              <img src="https://via.placeholder.com/600x400" alt="something" />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Paper>
  </section>
);

export default BracketteFeatures;
