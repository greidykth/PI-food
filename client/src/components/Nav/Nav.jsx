import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Nav = () => {
  return (
    <div>
      <button>Filters</button>
      <NavLink to="/recipes/create">
        <button>Create Recipe</button>
      </NavLink>
      <SearchBar />
    </div>
  );
};

export default Nav;
