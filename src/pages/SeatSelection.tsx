import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../styles/SeatSelection.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSeats } from "../features/seats";
import { Seat } from "../types";
import { useReservation } from "../features/reservation";

const SeatSelection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // Use useState for seats state initialization before the conditional logic
  const [seats, setSeats] = useState<Seat[]>([]); // Default as empty array
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [name, setName] = useState("");
  const {
    data: dataSeats,
    isLoading,
    isError,
  } = useSeats(state.movieId ?? "", state.scheduleId ?? "");
  const { mutate } = useReservation();
  // Only update the seats once dataSeats is available
  useEffect(() => {
    if (dataSeats) {
      setSeats(dataSeats);
    }
  }, [dataSeats]);

  if (isLoading) return <p>Cargando asientos...</p>;
  if (isError) return <p>Error al cargar los asientos.</p>;

  const selectSeat = (row: number, col: number) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.row_number === row &&
        seat.seat_number === col &&
        seat.status !== "occupied"
          ? {
              ...seat,
              status: seat.status === "selected" ? "available" : "selected",
            }
          : seat
      )
    );

    // Actualizar el estado de los asientos seleccionados
    setSelectedSeats((prevSelectedSeats) => {
      const seatToToggle = seats.find(
        (seat) => seat.row_number === row && seat.seat_number === col
      );
      if (seatToToggle) {
        // Si el asiento está seleccionado, deseleccionarlo
        if (seatToToggle.status === "selected") {
          return prevSelectedSeats.filter(
            (seat) => seat.row_number !== row || seat.seat_number !== col
          );
        } else {
          // Si no está seleccionado, agregarlo a los asientos seleccionados
          return [...prevSelectedSeats, seatToToggle];
        }
      }
      return prevSelectedSeats;
    });
  };

  const renderGrid = () => {
    const rows = Math.max(...seats.map((s) => s.row_number));
    const groupedSeats: { [key: number]: Seat[] } = {};

    // Agrupar los asientos por fila
    seats.forEach((seat) => {
      if (!groupedSeats[seat.row_number]) {
        groupedSeats[seat.row_number] = [];
      }
      groupedSeats[seat.row_number].push(seat);
    });

    // Crear la cuadrícula con las filas y asientos correctamente organizados
    const grid = [];

    for (let row = 1; row <= rows; row++) {
      const rowSeats = groupedSeats[row];

      if (rowSeats) {
        grid.push(
          <div key={row} className={styles.row}>
            {rowSeats.map((seat) => (
              <div
                key={`${seat.row_number}-${seat.seat_number}`}
                className={`${styles.seat} ${
                  seat ? styles[seat.status] : styles.available
                }`}
                onClick={() => selectSeat(seat.row_number, seat.seat_number)}
              >
                {`${seat.row_number}-${seat.seat_number}`}
              </div>
            ))}
          </div>
        );
      }
    }

    return grid;
  };

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function setReservation(): void {
    mutate({ name, seats: selectedSeats, scheduleId: state.scheduleId });
    navigate("/confirmed", {
      state: {
        name,
        seats: selectedSeats,
        scheduleId: state.scheduleId,
      },
    });
  }

  return (
    <div>
      <div className={styles.buttons}>
        {!!name && selectedSeats.length > 0 ? (
          <Link
            onClick={setReservation}
            to={{
              pathname: `/confirmed`,
            }}
            state={{ name, seats: selectedSeats, scheduleId: state.scheduleId }}
            className={styles.buyButton}
          >
            Comprar boletos
          </Link>
        ) : (
          <button className={styles.buyButton} disabled>
            Selecciona un asiento
          </button>
        )}
        <div className={styles.nameInputContainer}>
          <input
            type="text"
            id="name"
            className={styles.nameInput}
            value={name}
            onChange={handleNameChange}
            placeholder="Introduce tu nombre"
          />
        </div>
      </div>

      <div className={styles.container}>
        {/* Leyenda */}
        <div className={styles.legend}>
          <LegendItem color={styles.selected} label="Seleccionado" />
          <LegendItem color={styles.available} label="Disponible" />
          <LegendItem color={styles.occupied} label="Ocupado" />
        </div>

        {/* Pantalla */}
        <div className={styles.screen}>Pantalla</div>

        {/* Mapa de Asientos */}
        <div className={styles.grid}>{renderGrid()}</div>
      </div>
    </div>
  );
};

// Componente para la Leyenda
const LegendItem: React.FC<{ color: string; label: string }> = ({
  color,
  label,
}) => (
  <div className={styles.legendItem}>
    <div className={`${styles.legendBox} ${color}`} />
    <span>{label}</span>
  </div>
);

export default SeatSelection;
