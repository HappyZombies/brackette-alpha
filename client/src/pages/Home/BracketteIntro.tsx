import React from "react";
import { Typography, Grid, Paper, Icon } from "@material-ui/core";

const BracketteIntro = () => (
    <section className="brackette-intro">
        <Typography component="h2" variant="h2" color="primary" gutterBottom>
            What is Brackette?
        </Typography>
        <div className="intro-wrapper">
            <Grid container spacing={24}>
                <Grid item xs>
                    <Icon color="secondary" className="fa fa-clipboard-list" fontSize="large" />
                    <Typography component="h4" variant="h4" color="primary" gutterBottom>
                        Manageable
                    </Typography>
                    <Typography paragraph>
                        Manage every player without losing track.
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Icon color="secondary" className="fa fa-users" fontSize="large" />
                    <Typography component="h4" variant="h4" color="primary" gutterBottom>
                        Collaboration
                    </Typography>
                    <Typography>
                        Collaborate better with your TOs to make your tournaments run faster.
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Icon color="secondary" className="fa fa-handshake" fontSize="large" />
                    <Typography component="h4" variant="h4" color="primary" gutterBottom>
                        Happiness
                    </Typography>
                    <Typography>
                        The tournaments will run itself.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    </section>
);

export default BracketteIntro;
