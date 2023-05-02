import React from "react";
import { NavLink } from "react-router-dom";

const Form = () => {
  return (
    <div>
      <NavLink to="/home">
        <button>Back to home</button>
      </NavLink>
      <form action="">
        <div>
          <label htmlFor="">Name: </label>
          <input
            className=""
            type="text"
            placeholder="Name"
            onChange=""
            value=""
          />
        </div>
        <div>
          <label htmlFor="">Health Score: </label>
          <input
            className=""
            type="number"
            placeholder="Health Score"
            onChange=""
            value=""
          />
        </div>
        <div>
          <label htmlFor="">Summary: </label>
          <textarea
            className=""
            type="text"
            placeholder="Summary"
            value=""
            onChange=""
            rows={5}
          />
        </div>
        <div>
          <label htmlFor="">Image: </label>
          <textarea
            className=""
            type="text"
            placeholder="Summary"
            value=""
            onChange=""
          />
        </div>
        <div>
          <label htmlFor="">Diets: </label>
          <textarea
            className=""
            type="text"
            placeholder="Summary"
            value=""
            onChange=""
          />
        </div>
        <div>
          <label htmlFor="">Step by step: </label>
          <input
            className=""
            type="text"
            placeholder="Summary"
            value=""
            onChange=""
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
