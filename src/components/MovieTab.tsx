import React from "react";
import styles from "../styles/MovieTabs.module.css";

interface Props {
  selectedDay: number;
  onChange: (day: number) => void;
}

const days = ["15 MAR", "16 MAR", "17 MAR", "18 MAR", "19 MAR", "20 MAR"];

const MovieTabs: React.FC<Props> = ({ selectedDay, onChange }) => {
  return (
    <div className={styles.tabs}>
      {days.map((day, index) => (
        <button
          key={index}
          className={`${styles.tab} ${selectedDay === index ? styles.active : ""}`}
          onClick={() => onChange(index)}
        >
          {day}
        </button>
      ))}
    </div>
  );
};

export default MovieTabs;
