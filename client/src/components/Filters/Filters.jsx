import React, { useEffect, useState } from "react";
import style from "./filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipes, getDiets } from "../../redux/actions/actions";
import { Link } from "react-router-dom";

const Filters = () => {
  const { allDiets } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialState = {
    origin: { db: true, api: true },
    diets: allDiets.map((diets) => ({ name: diets.name, checked: true })),
    orderName: "DEFAULT",
    orderHealthScore: "DEFAULT",
  };
  const [filters, setFilters] = useState(initialState);
  const [allSelected, setAllSelected] = useState(true);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  useEffect(() => {
    if (allDiets.length > 0) {
      setFilters({
        ...filters,
        diets: allDiets.map((diets) => ({ name: diets.name, checked: true })),
      });
    }
  }, [allDiets]);

  useEffect(() => {
    dispatch(filterRecipes(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    setFilters({
      ...filters,
      diets: filters.diets.map((diets) => ({
        name: diets.name,
        checked: allSelected,
      })),
    });
  }, [allSelected]);

  const handleOnChange = (event) => {
    const property = event.target.name;
    if (property === "dbCheck") {
      setFilters({
        ...filters,
        origin: { ...filters.origin, db: !filters.origin.db },
      });
    }
    if (property === "apiCheck") {
      setFilters({
        ...filters,
        origin: { ...filters.origin, api: !filters.origin.api },
      });
    }
  };

  const handleOrderSelect = (e) => {
    const { value, name } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const allSelectedChangeHandler = (e) => {
    setAllSelected(!allSelected);
  };

  const dietsChangeHandler = (e) => {
    const { name } = e.target;
    const diets = filters.diets.map((diet) =>
      diet.name === name ? { ...diet, checked: !diet.checked } : { ...diet }
    );
    setFilters({ ...filters, diets });
  };

  return (
    <div className={style.container}>
      <div className={style.filtersContainer}>
        <div>
          <h3>Filters by:</h3>
        </div>
        <div className={style.originDietsContainer}>
          <div className={style.originContainer}>
            <h4>Origin:</h4>
            <div className="">
              <input
                type="checkbox"
                value=""
                id="dbCheck"
                name="dbCheck"
                checked={filters.origin.db}
                onChange={handleOnChange}
              />

              <label className="" htmlFor="dbCheck">
                DB
              </label>
            </div>

            <div className="">
              <input
                type="checkbox"
                value=""
                id="apiCheck"
                name="apiCheck"
                checked={filters.origin.api}
                onChange={handleOnChange}
              />
              <label className="" htmlFor="apiCheck">
                API
              </label>
            </div>
          </div>

          <div>
            <h4>Diets:</h4>
            <div className={style.dietsContainer}>
              <div className={style.diet}>
                <input
                  type="checkbox"
                  id="allSelected"
                  name="allSelected"
                  value={allSelected}
                  checked={allSelected}
                  onChange={allSelectedChangeHandler}
                />
                <label htmlFor="allSelected">all selected</label>
              </div>
              {filters.diets.map(({ name }, index) => {
                return (
                  <div className="" key={index}>
                    <div className={style.diet}>
                      <input
                        type="checkbox"
                        id={`diet-checkbox-${index}`}
                        name={name}
                        value={name}
                        checked={filters.diets[index].checked}
                        onChange={dietsChangeHandler}
                      />
                      <label htmlFor={`diet-checkbox-${index}`}>{name}</label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={style.orderContainer}>
        <div>
          <h3>Order by:</h3>
        </div>
        <div className={style.nameHealthScoreContainer}>
          <div className={style.orderSelect}>
            <h4>Name:</h4>
            <select
              onChange={handleOrderSelect}
              name="orderName"
              value={filters.orderName}
            >
              <option value="DEFAULT" disabled>
                Select Order
              </option>
              <option value="ASC">Ascendente</option>
              <option value="DESC">Descendente</option>
            </select>
          </div>

          <div className={style.orderSelect}>
            <h4>Health score:</h4>
            <select
              onChange={handleOrderSelect}
              name="orderHealthScore"
              value={filters.orderHealthScore}
            >
              <option value="DEFAULT" disabled>
                Select Order
              </option>
              <option value="ASC">Ascendente</option>
              <option value="DESC">Descendente</option>
            </select>
          </div>
        </div>
      </div>

      <Link className={style.reset} onClick={() => setFilters(initialState)}>Reset filters</Link>
    </div>
  );
};

export default Filters;
