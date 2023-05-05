const regexHealthScore = /^(100|\d{1,2})$/;
const regexImage = /\.(jpg|jpeg|png)$/i;

export default function validationForm(form, setErrors, errors, property) {
  //name validation
  if (property === "name") {
    if (!form.name) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        name: "Name must be provided",
      }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, name: "" }));
    }
  }

  //health score validation
  if (property === "healthScore") {
    if (!form.healthScore) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        healthScore: "Health score must be provided",
      }));
    } else if (!regexHealthScore.test(form.healthScore)) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        healthScore: "Health score must be a number between 0 and 100",
      }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, healthScore: "" }));
    }
  }

  //summary validation
  if (property === "summary") {
    if (!form.summary) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        summary: "Summary must be provided",
      }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, summary: "" }));
    }
  }

  //image validation
  if (property === "image") {
    if (!form.image) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        image: "Image must be provided",
      }));
    } else if (!regexImage.test(form.image)) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        image: "It must be a valid image",
      }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, image: "" }));
    }
  }

  //diets validation
  if (property === "diets") {
    if (form.diets.length < 1) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        diets: "At least one diet must be added",
      }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, diets: "" }));
    }
  }

  //procedure validation
  if (property === "procedure") {
    if (form.diets.length < 1) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        procedure: "At least one step must be added",
      }));
    } else {
      setErrors((oldErrors) => ({ ...oldErrors, procedure: "" }));
    }
  }
}
