import React from "react";
import { Grid, Typography } from "@material-ui/core";

import "./styles.css";

const About = () => (
  <section className="about-us">
    <Grid container>
      <Grid item xs>
        <Typography component="h1" variant="h3" gutterBottom>
          About Brackette
        </Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt t labore et dolore magna aliqua. Auctor elit
          sed vulputate mi. Sagittis id consectetur purus ut faucibus pulvinar
          elementum integer enim Fermentum odio eu feugiat pretium nibh ipsum
          consequat nisl Vulputate sapien nec sagittis aliquam malesuada.
          Volutpat consequa mauris nunc congue nisi vitae suscipit tellus
          mauris. Quis commodo odio aene n sed. Donec adipiscing tristique risus
          nec. Est pellentesque elit ullamcorper dignissim cras tincidunt
          lobortis feugiat vivamus. Phasellus egestas tellus rutrum tellus. Sem
          null a pharetra diam sit amet. Molestie a iaculis at erat pellentesque
          adipiscing commodo elit.
          <br />
          <br />
          Egestas integer eget aliquet nibh praesent tristique magna sit amet
          Suspendisse potenti nullam ac tortor vitae purus faucibus. Feugiat in
          ant metus dictum at tempor commodo. Commodo nulla facilisi nullam
          vehicula ipsum. At element um eu facilisis sed odio. Laoreet id donec
          ultrices tincidunt arcu non. Praesent elementum faci lisis leo vel
          fringilla est ullamcorper eget. Pharetra diam sit amet nisl. Vitae
          justo eget magna f ermentum iaculis eu non diam. Arcu ac tortor
          dignissim convallis aenean et tortor at risus.
        </Typography>
      </Grid>
    </Grid>
  </section>
);

export default About;
