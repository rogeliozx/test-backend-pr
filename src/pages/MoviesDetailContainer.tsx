import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import { useMovie } from "../features/movies";

export default function MoviesDetailContainer() {
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, isError } = useMovie(id!);

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar la película</p>;

  return <div> {movie && <MovieDetail movie={movie} />}</div>;
}
