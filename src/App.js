import { useState, useEffect } from "react";
import FormComponent from "./components/FormComponent";
import styles from "./App.module.css";

function App() {
  const [program, setProgram] = useState("UG");
  const [statement, setStatement] = useState("");

  useEffect(() => {
    setStatement("")
  }, [program]);

  const changeProgram = (event) => {
    setProgram(event.target.value);
  };

  function programSeat(seat, fromTotal) {
    setStatement(`${program} SEATING ${seat > 0 ? seat - 1 : 0}/${fromTotal}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.program}>
        <label htmlFor="program">Choose Program:</label>
        <select
          className={styles.dropdowns}
          id="program"
          onChange={changeProgram}
          value={program}
        >
          <option value="UG">Undergraduate</option>
          <option value="PG">Postgraduate</option>
        </select>
      </div>
      {program === "UG" ? (
        statement !== "" ? (
          <p className={styles.statement}>{statement}</p>
        ) : (
          <p>UG Program Capacity 60</p>
        )
      ) : program === "PG" ? (
        statement !== "" ? (
          <p className={styles.statement}>{statement}</p>
        ) : (
          <p>PG Program Capacity 40</p>
        )
      ) : null}
      <FormComponent choosenProgram={program} programSeat={programSeat} />
    </div>
  );
}

export default App;
