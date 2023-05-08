import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../redux/actions/actions";
import style from "./searchBar.module.css"

const SearchBar = () => {
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");

  const handleChange = (event) => {
    setInputSearch(event.target.value);
    if (event.target.value.length >= 3 || event.target.value.length === 0) {
      dispatch(getRecipesByName(event.target.value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getRecipesByName(inputSearch));
  };

  const handleKeyUp = (event) => {
    if ( event.keyCode === 13 || event.charCode === 13 ) {
      dispatch(getRecipesByName(inputSearch));
    }
  };

  return (
    <div className={style.searchContainer}>
      <input
        className=""
        value={inputSearch}
        type="text"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Find a recipe"
      />
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
};

export default SearchBar;
