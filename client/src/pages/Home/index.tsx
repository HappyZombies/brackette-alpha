import React from "react";
import { Typography, Button } from "@material-ui/core";

const Home = () => (
    <div>
        <Typography variant="h5" >
            This is the home page yayyyy
  </Typography>
        <Button variant="contained" >
            Default
      </Button>
        <Button variant="contained" color="primary">
            Primary
      </Button>
        <Button variant="contained" color="secondary" >
            Secondary
      </Button>
        <Button variant="contained" color="secondary" disabled >
            Disabled
      </Button>
        <Button variant="contained" href="#contained-buttons" >
            Link
      </Button>
    </div>
);

export default Home;
