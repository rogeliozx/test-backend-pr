import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Movies } from '../../types';

const API_URL = 'http://localhost:3000/movies'; // Cambia por tu endpoint real

const fetchMovies = async ():Promise<Movies[]> => {
    
  const response = await axios.get(API_URL);
  return response.data;
};

const fetchMovie = async (id:string):Promise<Movies> => {
    
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const useMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
  });
};

export const useMovie = (id:string) => {
  return useQuery({
    queryKey: ['movie',id],
    queryFn: ({ queryKey }) => {
      const movieId = queryKey[1];
      if (!movieId) throw new Error('ID no proporcionado');
      return fetchMovie(movieId);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
  });
};

