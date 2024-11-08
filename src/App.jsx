import { useState } from "react";
import Card from "./Card";
import styles from "./App.module.css";

function App() {
  //Aqui deberias agregar los estados y los handlers para los inputs
  const [formData, setFormData] = useState({
    name: "",
    color: "",
    age: "",
  });
  const [submittedData, setSubmittedData] = useState({});
  const [errors, setErrors] = useState({
    name: false,
    color: false,
    age: false,
  });
  const [isShown, setIsShown] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setWasSubmitted(true);
    e.preventDefault();

    const regexName = /^[A-Za-z\s]+$/;
    const regexColor = /^#([A-Fa-f0-9]{6})$/;
    const regexAge = /^[0-9]+$/;

    let customErrors = {
      name: !regexName.test(formData.name) || formData.name.trim().length <= 2,
      color:
        !regexColor.test(formData.color) || formData.color.trim().length <= 5,
      age: !regexAge.test(formData.age),
    };

    setErrors(customErrors);

    if (Object.values(customErrors).some((error) => error)) {
      setIsShown(false);
      return;
    }

    setIsShown(true);
    setSubmittedData(formData);
  };

  return (
    <div className="App">
      <h1 className={styles.title}>Elige un color</h1>
      <form className={styles.formWrapper} action="" onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Ingresa tu nombre"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className={styles.inputError}>
            El nombre debe ser mayor a 3 caracteres sin números
          </p>
        )}
        <input
          className={styles.input}
          type="text"
          placeholder="Ingresa tu color (formato HEX)"
          name="color"
          id="color"
          value={formData.color}
          onChange={handleChange}
        />
        {errors.color && (
          <p className={styles.inputError}>
            El color debe ser mayor a 6 caracteres e iniciar con # (ejemplo.
            #FF0000)
          </p>
        )}
        <input
          className={styles.input}
          type="text"
          placeholder="Ingresa tu edad"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && (
          <p className={styles.inputError}>La edad debe ser mayor a 0</p>
        )}
        <input className={styles.submit} type="submit" value="Enviar" />
      </form>
      {isShown ? (
        <Card
          name={submittedData.name}
          color={submittedData.color}
          age={submittedData.age}
        />
      ) : (
        wasSubmitted && (
          <p className={styles.inputError}>
            Por favor chequea que la informacion sea correcta
          </p>
        )
      )}
    </div>
  );
}

export default App;
