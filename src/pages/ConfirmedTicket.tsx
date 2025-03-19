import React from "react";
import styles from "../styles/ConfirmedTicket.module.css";
import { useLocation } from "react-router-dom";
import { Seat } from "../types";

const ConfirmedBuy: React.FC = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div className={styles.container}>
      <div className={styles.confirmationCard}>
        <h2 className={styles.title}>¡Compra Confirmada!</h2>
        <div className={styles.details}>
          <p>
            <strong>
              Asientos:{" "}
              {state.seats
                .map((seat: Seat) => `${seat.row_number}-${seat.seat_number}`)
                .join(", ")}
            </strong>
          </p>
          <p className={styles.total}>
            <strong>Total: {state.seats.length * 50}</strong> $
          </p>
        </div>

        <div className={styles.thankYou}>
          <p>¡Gracias por tu compra!</p>
          <p>Disfruta de la película.</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedBuy;