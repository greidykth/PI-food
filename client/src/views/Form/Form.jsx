import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import validationForm from "../../validationForm";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, showNotification } from "../../redux/actions/actions";
import style from "./form.module.css";
import axios from "axios";
import { ReactComponent as Add } from "../../icons/mas.svg";
import { ReactComponent as Delete } from "../../icons/cruz.svg";
import { ReactComponent as Edit } from "../../icons/lapiz.svg";
import { ReactComponent as Back } from "../../icons/tarjeta-de-direccion.svg";
import { ReactComponent as Check } from "../../icons/check.svg";

const Form = () => {
  const dispatch = useDispatch();
  const { allDiets } = useSelector((state) => state);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    healthScore: "",
    summary: "",
    image: "",
    diets: [],
    procedure: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    healthScore: "",
    summary: "",
    image: "",
    diets: "",
    procedure: "",
  });

  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState({ id: 0, name: "" });
  const [listDiets, setListDiets] = useState([]);
  const [newStep, setNewStep] = useState({ number: 1, step: "" });
  const [editStep, setEditStep] = useState({ number: 0, step: "" });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  useEffect(() => {
    setListDiets(allDiets);
  }, [allDiets]);

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    validationForm({ ...form, [property]: value }, setErrors, errors, property);
  };

  const changeSelectHandler = (e) => {
    setSelectedDiet({
      id: e.target.value,
      name: e.target.selectedOptions[0].text,
    });
  };

  const stepChangeHandler = (e) => {
    setNewStep({
      ...newStep,
      step: e.target.value,
    });
  };

  const addStepHandler = () => {
    if (newStep.step.trim() !== "") {
      setForm({ ...form, procedure: [...form.procedure, { ...newStep }] });
      setNewStep({ number: ++newStep.number, step: "" });
      setErrors({ ...errors, procedure: "" });
    } else {
      setErrors({ ...errors, procedure: "Step can not be empty" });
    }
  };

  const addDietHandler = () => {
    setSelectedDiets((prevDiets) => [...prevDiets, selectedDiet]);
    setErrors({ ...errors, diets: "" });
    const updatedListDiets = listDiets.filter(
      //Se borra de la lista la dieta seleccionada
      (diet) => diet.id != selectedDiet.id
    );
    setListDiets(updatedListDiets);
    setSelectedDiet({ id: 0, name: "" });
  };

  const onDeleteDietHandler = (dietDelete) => {
    let updatedListDiets = [...listDiets, dietDelete];

    updatedListDiets = updatedListDiets.sort((a, b) => {
      //Se ordenan por orden alfabetico
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    setListDiets(updatedListDiets); //Se agrega a la lista de dietas la dieta que se eliminó del div
    const updatedSelectedTags = selectedDiets.filter(
      (diet) => diet.id != dietDelete.id
    );
    setSelectedDiets(updatedSelectedTags); //Se borra la dieta de las dietas seleccionadas y del div
  };

  const onEditStepHandler = (step) => {
    saveChangesEditStepHandler({ ...editStep });
    setEditStep(step);
  };

  const editStepChangeHandler = (e) => {
    setEditStep({
      ...editStep,
      step: e.target.value,
    });
  };

  const saveChangesEditStepHandler = (stepToSave) => {
    setForm({
      ...form,
      procedure: form.procedure.map((step) =>
        step.number === stepToSave.number ? { ...stepToSave } : { ...step }
      ),
    });
  };

  const onDeleteStepHandler = (stepDelete) => {
    const deleteStep = form.procedure.filter(
      (step) => step.number != stepDelete.number
    );
    const updatedSteps = deleteStep.map((stepUpdate, i) => {
      return { number: i + 1, step: stepUpdate.step };
    });

    setForm({ ...form, procedure: updatedSteps });
    setNewStep({ number: updatedSteps.length + 1, step: "" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    form.diets = selectedDiets.map((diet) => diet.id);

    const errosEmpty = Object.values(errors).every((value) => value === "");

    //verificar que no hay errores y que el form esta lleno con toda la data
    if (
      errosEmpty &&
      form.procedure.length &&
      form.diets.length &&
      form.name !== "" &&
      form.image !== "" &&
      form.healthScore !== "" &&
      form.summary !== ""
    ) {
      setErrors((oldErrors) => ({ ...oldErrors, diets: "" }));
      setErrors((oldErrors) => ({ ...oldErrors, procedure: "" }));

      axios
        .post("http://localhost:3001/recipes/", form)
        .then((response) => {
          dispatch(
            showNotification({
              message: "Recipe created successfully",
              type: "success",
            })
          );
          navigate("/home");
        })
        .catch((error) => {
          dispatch(
            showNotification({
              message: error.response.data.error,
              type: "error",
            })
          );
        });
    } else {
      if (form.diets.length === 0) {
        setErrors((oldErrors) => ({
          ...oldErrors,
          diets: "Please add at least one diet",
        }));
      }
      if (form.procedure.length === 0) {
        setErrors((oldErrors) => ({
          ...oldErrors,
          procedure: "Please add at least one step",
        }));
      }
    }
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.container}>
        <div className={style.formContainer}>
          <div className={style.formDiv}>
            
            <form autoComplete="off" onSubmit={submitHandler}>
              <h2>New Recipe </h2>
              <div className={style.nameScoreImageContainer}>
                <div className={style.nameScoreContainer}>
                  {/* Name */}
                  <div className={style.inputsContainer}>
                    <label htmlFor="name">Name: </label>
                    <input
                      className=""
                      name="name"
                      type="text"
                      placeholder="Name"
                      onChange={changeHandler}
                      value={form.name}
                    />
                    {errors.name && (
                      <span className={style.inputError}>{errors.name}</span>
                    )}
                  </div>

                  {/* Health Score */}
                  <div className={style.inputsContainer}>
                    <label htmlFor="healthScore">Health Score: </label>
                    <input
                      className=""
                      name="healthScore"
                      type="number"
                      placeholder="Health Score"
                      onChange={changeHandler}
                      value={form.healthScore}
                    />
                    {errors.healthScore && (
                      <span className={style.inputError}>
                        {errors.healthScore}
                      </span>
                    )}
                  </div>
                </div>
                {/* Image */}
                <div className={style.infoImageContainer}>
                  <div className={style.inputsContainer}>
                    <label htmlFor="image">Image: </label>
                    <input
                      className=""
                      name="image"
                      type="text"
                      placeholder="Image"
                      onChange={changeHandler}
                      value={form.image}
                    />
                    {errors.image && (
                      <span className={style.inputError}>{errors.image}</span>
                    )}
                  </div>
                  <div className={style.imageContainer}>
                    {form.image && <img src={form.image} alt="new recipe" />}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className={style.inputsContainer}>
                <label htmlFor="summary">Summary: </label>
                <textarea
                  className=""
                  name="summary"
                  type="text"
                  placeholder="Summary"
                  onChange={changeHandler}
                  value={form.summary}
                  rows={5}
                />
                {errors.summary && (
                  <span className={style.inputError}>{errors.summary}</span>
                )}
              </div>

              {/* Diets */}
              <div className={style.dietsContainer}>
                <div className={style.inputsContainer}>
                  <label htmlFor="diet_id" className="">
                    Diets:
                  </label>
                  <select
                    type="text"
                    name="diet_id"
                    value={selectedDiet.id}
                    placeholder="Diets"
                    onChange={changeSelectHandler}
                    className=""
                  >
                    <option key="0" value="0" disabled>
                      Select a diet
                    </option>
                    {listDiets &&
                      listDiets.map((diet) => (
                        <option key={diet.id} value={diet.id}>
                          {diet?.name}
                        </option>
                      ))}
                  </select>
                  {errors.diets && (
                    <span className={style.inputError}>{errors.diets}</span>
                  )}
                </div>
                <button
                  className={style.addButton}
                  onClick={addDietHandler}
                  disabled={selectedDiet.id === 0}
                >
                  <Add />
                </button>
              </div>

              {/* Selected Diets */}
              <div className={style.dietsSelectedContainer}>
                {selectedDiets &&
                  selectedDiets.map((diet) => (
                    <span key={diet.id} className={style.spanDiet}>
                      {diet.name}
                      <button
                        key={diet.id}
                        type="button"
                        onClick={() => onDeleteDietHandler(diet)}
                        className={style.delete}
                      >
                        <Delete />
                      </button>
                    </span>
                  ))}
                {selectedDiets.length === 0 && (
                  <p className="">Add diets to recipe</p>
                )}
              </div>

              <hr />

              {/* Step by step */}
              <div>
                <label className={style.stepTitle} htmlFor="step">
                  Step by step:{" "}
                </label>
                {/* Added steps */}
                <div className={style.addedStepsContainer}>
                  {form.procedure &&
                    form.procedure.map((stepAdded) => (
                      <div
                        className={style.addedStep}
                        key={`div${stepAdded.number}`}
                      >
                        <div className={style.stepAndCloseContainer}>
                          <label htmlFor={`stepLabel_${stepAdded.number}`}>
                            Step {stepAdded.number} :{" "}
                          </label>
                          <div>
                            {editStep.number === stepAdded.number ? (
                              <button
                                type="button"
                                onClick={() =>
                                  saveChangesEditStepHandler(editStep)
                                }
                                className={style.check}
                              >
                                <Check />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => onEditStepHandler(stepAdded)}
                                className={style.edit}
                              >
                                <Edit />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => onDeleteStepHandler(stepAdded)}
                              className={style.delete}
                            >
                              <Delete />
                            </button>
                          </div>
                        </div>
                        {editStep.number === stepAdded.number ? (
                          <textarea
                            className=""
                            value={editStep.step}
                            onChange={editStepChangeHandler}
                            onBlur={() =>
                              onEditStepHandler({ number: 0, step: "" })
                            }
                          />
                        ) : (
                          <p className={style.paragraphStep}>
                            {stepAdded.step}
                          </p>
                        )}
                      </div>
                    ))}
                  {form.procedure.length === 0 && (
                    <p className="">No steps in recipe</p>
                  )}
                </div>

                {/* New step */}
                <div className={style.newStepContainer}>
                  <div className={style.inputsContainer}>
                    <textarea
                      className=""
                      name="step"
                      type="text"
                      placeholder="Add a step"
                      onChange={stepChangeHandler}
                      value={newStep.step}
                      rows={2}
                    />
                    {errors.procedure && (
                      <span className={style.inputError}>
                        {errors.procedure}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className={style.addButton}
                    onClick={addStepHandler}
                    disabled={!newStep.step}
                  >
                    <Add />
                  </button>
                </div>
              </div>
              <button className={style.createButton} type="submit">
                Create Recipe
              </button>
            </form>
          </div>
            <div className={style.backButtonDiv}>
              <NavLink to="/home">
                {" "}
                <Back /> Back to home
              </NavLink>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
