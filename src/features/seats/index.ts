import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Seat } from '../../types';


const fetchSeats = async (hallId:string,scheduleId:string):Promise<Seat[]> => {
    console.log(hallId,scheduleId)
    
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/seats`,{
        params:{
            hallId,
            scheduleId
        }
    });
    return response.data;
  };

export const useSeats = (hallId:string,scheduleId:string) => {
    return useQuery({
      queryKey: ['movie',hallId,scheduleId],
      queryFn: ({ queryKey }) => {
        const hallId = queryKey[1];
        const scheduleId=queryKey[2]
        if (!hallId) throw new Error('ID no proporcionado');
        return fetchSeats(hallId,scheduleId);
      },
      enabled: !!hallId&&!!scheduleId,
      staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    });
  };