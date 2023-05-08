import React from "react";
import { NavLink } from "react-router-dom";
import style from "./landingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.principalContainer}>
      <div className={style.textContainer}>
        <h1>Flavor Fusion</h1>
        <p>
          Welcome to our delicious world of recipes! This app is here to provide
          you with endless inspiration and ideas for your next meal. Explore our
          collection of recipes from around the world.
        </p>
        <NavLink to="/home">
          <button className={style.buttonHome}>Let's get stared!</button>
        </NavLink>
        <p>Individual project made by Greidy Peña</p>
      </div>
    </div>
  );
};

export default LandingPage;
