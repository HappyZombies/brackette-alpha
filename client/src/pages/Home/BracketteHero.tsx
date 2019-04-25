import React from "react";
import { Typography, Button, Paper, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const BracketteHero = () => (
  <section className="brackette-hero">
    <Paper className="brackette-hero-paper">
      <Grid>
        <Typography component="h1" variant="h3" gutterBottom>
          Brackette
        </Typography>
        <Typography variant="h5" paragraph>
          <FormattedMessage id="app.intro" />
        </Typography>
        <Button
          color="primary"
          variant="contained"
          size="large"
          component={({ innerRef, ...props }) => (
            <Link {...props} to="/register" />
          )}
        >
          <FormattedMessage id="app.registerBttnTxt" />
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          size="large"
          id="about"
          component={({ innerRef, ...props }) => (
            <Link {...props} to="/about" />
          )}
        >
          <FormattedMessage id="app.aboutBttnTxt" />
        </Button>
        <img src="https://via.placeholder.com/750x450" alt="something" />
      </Grid>
    </Paper>
  </section>
);

export default BracketteHero;
