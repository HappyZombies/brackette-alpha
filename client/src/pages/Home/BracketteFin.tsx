import React from "react";
import { Typography, Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

const BracketteFin = () => (
    <section className="brackette-intro">
        <div className="intro-wrapper">
            <Typography variant="h5" paragraph>Get started with Brackette today and enjoy the new changes coming for TOs!</Typography>
            <Button color="primary" variant="contained" size="large" component={({ innerRef, ...props }) => <Link {...props} to="/register" />}>
                Register
            </Button>
        </div>
    </section>
);

export default BracketteFin;
