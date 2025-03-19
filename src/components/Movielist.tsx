import React from "react";
import styles from "../styles/MovieList.module.css";
//import MovieTabs from "./MovieTab";
import MovieCard from "./MovieCard";
import { Movies } from "../types";

interface MovieListProps {
  movies: Movies[];
}



const MovieList: React.FC<MovieListProps> = ({movies}) => {
  /* const [selectedDay, setSelectedDay] = useState(0); */
  return (
    <div className={styles.container}>
    {/*   <MovieTabs selectedDay={selectedDay} onChange={setSelectedDay} /> implement select days */}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;