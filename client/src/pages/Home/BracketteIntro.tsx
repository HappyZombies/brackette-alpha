import React from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import Icon from '@mdi/react'
import { mdiClipboardTextOutline, mdiAccountGroupOutline, mdiThumbUpOutline } from '@mdi/js'

const BracketteIntro = () => (
    <section className="brackette-intro">
        <Typography component="h2" variant="h2" color="secondary" gutterBottom>
            What is Brackette?
        </Typography>
        <div className="intro-wrapper">
            <Grid container spacing={24}>
                <Grid item xs>
                    <Icon path={mdiClipboardTextOutline} size={1.5} />
                    <Typography component="h4" variant="h4" color="secondary" gutterBottom>
                        Manageable
                    </Typography>
                    <Typography paragraph>
                        Manage every player without losing track.
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Icon path={mdiAccountGroupOutline} size={1.5} />
                    <Typography component="h4" variant="h4" color="secondary" gutterBottom>
                        Collaboration
                    </Typography>
                    <Typography>
                        Collaborate better with your TOs to make your tournaments run faster.
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Icon path={mdiThumbUpOutline} size={1.5} />
                    <Typography component="h4" variant="h4" color="secondary" gutterBottom>
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
