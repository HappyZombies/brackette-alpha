import React from "react";
import BracketteHero from "./BracketteHero";
import BracketteIntro from './BracketteIntro';
import BracketteFeatures from "./BracketteFeatures";
import BracketteFin from './BracketteFin';
import Footer from "./Footer";

import "./styles.css";

const Home = () => (
  <div>
    <BracketteHero />
    <BracketteIntro />
    <BracketteFeatures />
    <BracketteFin />
    <Footer />
  </div>
);

export default Home;
