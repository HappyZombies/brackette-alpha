import React from "react";
import { Typography, Button, Paper, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const BracketteHero = () => (
  <section className="brackette-hero">
    <Paper className="brackette-hero-paper">
      <Grid>
        <Typography component="h1" variant="h3" gutterBottom>
          Brackette
        </Typography>
        <Typography variant="h5" paragraph>
          Make tournament management even easier with Brackette by realeasing
          the full potential of Challonge and Smash.gg
        </Typography>
        <Button
          color="primary"
          variant="contained"
          size="large"
          component={({ innerRef, ...props }) => (
            <Link {...props} to="/register" />
          )}
        >
          Register
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
          About Brackette
        </Button>
        <img src="https://via.placeholder.com/750x450" alt="something" />
      </Grid>
    </Paper>
  </section>
);

export default BracketteHero;
