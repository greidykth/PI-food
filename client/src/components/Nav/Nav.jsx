import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./nav.module.css";

const Nav = () => {
  return (
    <div className={style.mainContainer}>
      <Link to="/home">Home</Link>
      <Link to="/recipes/create">Create Recipe</Link>
      <Link to="/home">Filters</Link>
      <SearchBar />
    </div>
  );
};

export default Nav;
