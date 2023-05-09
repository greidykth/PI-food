import React from "react";
import { NavLink } from "react-router-dom";
import style from "./notfound.module.css";

const NotFound = () => {
  return (
    <div className={style.principalContainer}>
      <div className={style.textContainer}>
        <h1>ERROR</h1>
        <h1>404</h1>
        <h3>This page is outside of the universe</h3>
        <p>
          The page you are trying to access does not exist or has been moved.
          Try going back to our homepage.
        </p>
        <NavLink to="/home">
          <button className={style.buttonHome}>Go Home!</button>
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
