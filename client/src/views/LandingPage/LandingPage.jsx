import React from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./landingPage.module.css";
import { ReactComponent as Github } from "../../icons/icons8-github.svg";
import { ReactComponent as Linkedin } from "../../icons/icons8-linkedin.svg";

const LandingPage = () => {
  return (
    <div className={style.principalContainer}>
      <div className={style.textContainer}>
        <h1>Fusion of Flavores</h1>
        <p>
          Welcome to our delicious world of recipes! This app is here to provide
          you with endless inspiration and ideas for your next meal. Explore our
          collection of recipes from around the world.
        </p>
        <p>Individual project made by <b>Greidy Peña.</b></p>
        <div>
          <Link
            className={style.brandIcon}
            to="https://www.linkedin.com/in/greidypena/"
            target="_blank"
          >
            <Linkedin />
          </Link>
          <Link
            className={style.brandIcon}
            to="https://github.com/greidykth"
            target="_blank"
          >
            <Github />
          </Link>
        </div>
        <NavLink to="/home">
          <button className={style.buttonHome}>Let's get stared!</button>
        </NavLink>
      </div>
    </div>
  );
};

export default LandingPage;
