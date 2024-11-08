import styles from "./Card.module.css";

function Card({ name, color, age }) {
  const regexColor = /^#([A-Fa-f0-9]{6})$/;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Hola {name}!</h2>
      <p className={styles.text}>
        Tu color favorito es {color} y tienes {age} años
      </p>
      {regexColor.test(color) ? (
        <p className={styles.colour} style={{ backgroundColor: color }}></p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Card;
