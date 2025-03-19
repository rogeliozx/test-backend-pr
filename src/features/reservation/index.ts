import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import axios from "axios";

const API_URL = "http://localhost:3000/reservations";
const createReservation = async (postData: any): Promise<any> => {
    console.log("creando Post")
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/reservations`, postData);
  return response.data;
};

export const useReservation = () => {
    return useMutation({
      mutationFn: createReservation, // No es necesario pasar el parámetro aquí
      onSuccess: (reservationData) => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        console.log("Reserva creada:", reservationData);
      },
      onError: (error) => {
        console.error("Error al crear reserva:", error.message);
      },
    });
  };
