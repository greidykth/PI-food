import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "./nav.module.css";
import Filters from "../Filters/Filters";

const Nav = () => {
  const [showFilters, setShowFilters] = useState(false);

  const showFiltersHandler = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.navigation}>
        <Link to="/home" onClick={() => setShowFilters(false)}>
          <h2>Flavor Fusion</h2>
        </Link>
        <Link to="/home" onClick={() => setShowFilters(false)}>
          Home
        </Link>
        <Link to="/recipes/create">Create Recipe</Link>
        <Link onClick={showFiltersHandler}>Filters</Link>
        <SearchBar />
      </div>
      <div className="">{showFilters && <Filters />}</div>
    </div>
  );
};

export default Nav;
