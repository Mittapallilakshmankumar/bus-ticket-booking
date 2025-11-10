import React from "react";

const SeatSelector = ({ selectedSeats, onSeatToggle }) => {
  const seatNumbers = Array.from({ length: 24 }, (_, i) => i + 1); // 24 seats

  const getSeatStyle = (seatNumber) => ({
    width: "40px",
    height: "40px",
    margin: "5px",
    backgroundColor: selectedSeats.includes(seatNumber)
      ? "#28a745" // green
      : "#ccc", // gray
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  });

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Select Seats:</h4>
      <div style={styles.grid}>
        {seatNumbers.map((seatNumber) => (
          <button
            key={seatNumber}
            style={getSeatStyle(seatNumber)}
            onClick={() => onSeatToggle(seatNumber)}
          >
            {seatNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)", // 6 seats per row
    gap: "10px",
    marginTop: "10px",
  },
};

export default SeatSelector;
