import React from "react";
import { Typography, Button, Paper, Grid, CardMedia } from "@material-ui/core";

const BracketteHero = () => (
  <section className="brackette-hero">
    <Paper>
      <Grid>
        <Typography component="h1" variant="h3" gutterBottom>
          Brackette
        </Typography>
        <Typography variant="h5" paragraph>
          Make tournament management even easier with Brackette by realising the full potential of Challonge and
          Smash.gg
        </Typography>
        <Button color="primary" variant="contained" size="large">
          Sign Up
        </Button>
        <Button color="secondary" variant="outlined" size="large" id="about">
          About Brackette
        </Button>
        <img src="https://via.placeholder.com/750x450" alt="something" />
      </Grid>
    </Paper>
  </section>
);

export default BracketteHero;
