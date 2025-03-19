import React, { useState } from "react";
import styles from "../styles/MovieDetail.module.css";
import { Movies } from "../types";
import { Link } from "react-router-dom";

interface MovieDetailProps {
  movie: Movies;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  const [showTime, setShowTime] = useState("");
  const isStateComplete = !!showTime;
  return (
    <div className={styles.container}>
      <img src={movie.img} alt={movie.title} className={styles.poster} />
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <div className={styles.details}>
          <span className={styles.tag}>Tradicional</span>
          <span className={styles.tag}>PLUUS</span>
        </div>
        <p className={styles.meta}>{movie.duration}</p>
        <div className={styles.buttons}>
          {isStateComplete ? (
            <Link
              to={{
                pathname: `/seats`,
              }}
              state={{ movieId: movie.id, scheduleId: showTime }}
              className={styles.buyButton}
            >
              Comprar boletos
            </Link>
          ) : (
            <button className={styles.buyButton} disabled>
              Selecciona una hora
            </button>
          )}

          <button className={styles.trailerButton}>🎬 Ver tráiler</button>
        </div>
        <h3 className={styles.synopsisTitle}>Sinopsis</h3>
        <p className={styles.synopsis}>{movie.sypnosis}</p>
        <div className={styles.showtimes}>
          {movie.schedules?.map((schedule: any, index: number) => (
            <button
              key={index}
              onClick={() => setShowTime(schedule.id)}
              className={styles.showtimeButton}
            >
              {schedule.time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
