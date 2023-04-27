import React from "react";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>Flavor Fusion</h1>
      <h2>
        Welcome to our delicious world of recipes! This app is here to provide
        you with endless inspiration and ideas for your next meal. Explore our
        collection of recipes from around the world.
      </h2>
      <NavLink to="/home">
        <button>Let's get stared!</button>
      </NavLink>
    </div>
  );
};

export default LandingPage;
