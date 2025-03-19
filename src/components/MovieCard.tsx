import React from "react";
import styles from "../styles/MovieCard.module.css";
import { Movies } from "../types";
import { Link } from "react-router-dom";

interface Props {
  movie: Movies;
}

const MovieCard: React.FC<Props> = ({ movie }) => {

  return (
    <div className={styles.card}>
      <img src={movie.img} alt={movie.title} className={styles.poster} />
      <div className={styles.details}>
        <span className={styles.rating}>{movie.rating} ★</span>
        <span className={styles.duration}>{movie.duration}m</span>
        <h3>{movie.title}</h3>
        <h4>{movie.sypnosis.slice(0,120)}...</h4>
        <Link to={`/movies/${movie.id}`} className={styles.showtimeButton}>
          Ver detalle
        </Link>
        <div className={styles.showtimes}>
          {movie.schedules.map((schedule, index) => (
            <button key={index} className={styles.showtimeButton}>
              {schedule.time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
