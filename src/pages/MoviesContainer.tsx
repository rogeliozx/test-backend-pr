import MovieList from '../components/Movielist'
import { useMovies } from '../features/movies';

export default function MoviesContainer() {
    const { data: movies, isLoading, isError } = useMovies();
    if (isLoading) return <p>Cargando películas...</p>;
    if (isError) return <p>Error al cargar las películas.</p>;
  return (
    <div><MovieList movies={movies ?? []}/></div>
  )
}
