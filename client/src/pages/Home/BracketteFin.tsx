import React from "react";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const BracketteFin = () => (
  <section className="brackette-intro">
    <div className="intro-wrapper">
      <Typography variant="h5" paragraph>
        <FormattedMessage id="app.fin" />
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
    </div>
  </section>
);

export default BracketteFin;
