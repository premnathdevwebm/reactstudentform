import { useState, useEffect } from "react";
import FormComponent from "./components/FormComponent";
import EnrolList from "./components/EnrolList";
import styles from "./App.module.css";

function App() {
  const [program, setProgram] = useState("UG");
  const [ugSeat, setUgSeat] = useState(60);
  const [pgSeat, setPgSeat] = useState(40);
  const [studentDetails, setStudentDetails] = useState({});
  const [dataEnrolMent, setDataEnrolMent] = useState({});

  useEffect(() => {
    if (dataEnrolMent) {
      dataEnrolMent.program === "UG" ? setProgram("UG") : dataEnrolMent.program === "PG" ? setProgram("PG"): setProgram("UG");
    }
  }, [dataEnrolMent]);

  const handleChange = (event) => {
    setProgram(event.target.value);
    setUgSeat(ugSeat);
    setPgSeat(pgSeat);
  };

  function setUpdateSeats(updatedSeats) {
    if (program === "UG") {
      setUgSeat(updatedSeats);
      return;
    }
    setPgSeat(updatedSeats);
    return;
  }

  return (
    <div className={styles.App}>
      <div className={styles.programs}>
        <h3 className={styles.title}>STUDENT ENROLLMENT FORM</h3>
        <ul className={styles.ulEnrol}>
          <li className={styles.parentlabels} onChange={handleChange}>
            <input
              type="radio"
              className={styles.radiosel}
              value="UG"
              onSelect={(event)=>setProgram(event.target.value)}
              name="programGroup"
              defaultChecked
            />
            Undergraduate
            <input
              type="radio"
              className={styles.radiosel}
              value="PG"
              onSelect={(event)=>setProgram(event.target.value)}
              name="programGroup"
            />
            Postgraduate
          </li>
          <li className={styles.parentlabels}>
            Remaining {program} seats - {program === "UG" ? ugSeat : pgSeat}
          </li>
        </ul>
      </div>
      <FormComponent
        chosenProgram={program}
        setUpdateSeats={setUpdateSeats}
        currentSeats={program === "UG" ? ugSeat : pgSeat}
        setStudentDetails={setStudentDetails}
        dataEnrolMent={dataEnrolMent}
      />
      <EnrolList
        studentDetails={studentDetails}
        setStudentDetails={setStudentDetails}
        setUgSeat={setUgSeat}
        setPgSeat={setPgSeat}
        dataToEnrolForm={setDataEnrolMent}
      />
    </div>
  );
}

export default App;
