import React, { useState } from "react";
import axios from "axios";
import SeatSelector from "./SeatSelector";

const BookingForm = () => {
  const [passengerName, setPassengerName] = useState("");
  const [age, setAge] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [busType, setBusType] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ac, setAc] = useState(false);
  const [sleeper, setSleeper] = useState(false);

  const handleSeatToggle = (seatNumber) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatNumber)
        ? prevSeats.filter((s) => s !== seatNumber)
        : [...prevSeats, seatNumber]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !passengerName ||
      !age ||
      !fromLocation ||
      !toLocation ||
      !travelDate ||
      !busType ||
      selectedSeats.length === 0
    ) {
      alert("Please fill all required fields and select at least one seat.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/bookings/", {
        passenger_name: passengerName,
        age,
        from_location: fromLocation,
        to_location: toLocation,
        seat_number: selectedSeats.join(", "),
        travel_date: travelDate,
        bus_type: busType,
        seat_type: `${ac ? "AC" : "Non-AC"} ${sleeper ? "Sleeper" : "Seater"}`
      });

      alert("Booking Successful!");

      // Clear form
      setPassengerName("");
      setAge("");
      setFromLocation("");
      setToLocation("");
      setTravelDate("");
      setBusType("");
      setSelectedSeats([]);
      setAc(false);
      setSleeper(false);
    } catch (error) {
      console.error("Booking failed", error);
      alert("Booking Failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Bus Ticket Booking</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Passenger Name:</label>
        <input
          type="text"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>From:</label>
        <input
          type="text"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>To:</label>
        <input
          type="text"
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Travel Date:</label>
        <input
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Select Bus:</label>
        <select
          value={busType}
          onChange={(e) => setBusType(e.target.value)}
          style={styles.input}
        >
          <option value="">-- Select a Bus --</option>
          <option value="Bus 1">Bus 1</option>
          <option value="Bus 2">Bus 2</option>
        </select>

        <div style={{ marginTop: 10 }}>
          <label>
            <input
              type="checkbox"
              checked={ac}
              onChange={(e) => setAc(e.target.checked)}
            />{" "}
            AC
          </label>
          <label style={{ marginLeft: 20 }}>
            <input
              type="checkbox"
              checked={sleeper}
              onChange={(e) => setSleeper(e.target.checked)}
            />{" "}
            Sleeper
          </label>
        </div>

        <SeatSelector selectedSeats={selectedSeats} onSeatToggle={handleSeatToggle} />

        <button type="submit" style={styles.button}>
          Book Now
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f8f8f8",
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginTop: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    marginTop: "15px",
    cursor: "pointer",
  },
};

export default BookingForm;
