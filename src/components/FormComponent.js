import { useReducer, useEffect } from "react";
import styles from "./FormComponent.module.css";

const initialState = {
  firstName: "",
  lastName: "",
  ugSeat: 60,
  pgSeat: 40,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, firstName: action.payload };
    case "SET_LAST_NAME":
      return { ...state, lastName: action.payload };
    case "DECREASE_UG_SEAT":
      const updatedUgSeat = state.ugSeat - 1 < 0 ? 0 : state.ugSeat - 1;
      return { ...state, ugSeat: updatedUgSeat };
    case "DECREASE_PG_SEAT":
      const updatedPgSeat = state.pgSeat - 1 < 0 ? 0 : state.pgSeat - 1;
      return { ...state, pgSeat: updatedPgSeat };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

function FormComponent(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_FIRST_NAME", payload: "" });
    dispatch({ type: "SET_LAST_NAME", payload: "" });
    dispatch({ type: "SET_ERROR", payload: "" });
  }, [props.choosenProgram]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (state.firstName.trim() === "" || state.lastName.trim() === "") {
      dispatch({ type: "SET_ERROR", payload: "Please fill in all fields" });
      return;
    }
    dispatch({ type: "SET_ERROR", payload: "" });
    if (props.choosenProgram === "UG") {
      dispatch({ type: 'DECREASE_UG_SEAT' });
      props.programSeat(state?.ugSeat, 60)
    } else if (props.choosenProgram === "PG") {
      dispatch({ type: 'DECREASE_PG_SEAT' });
      props.programSeat(state?.pgSeat, 40)
    }
    
  };

  return (
    <>
       <h2>{props.choosenProgram} Student details</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <label htmlFor="firstName" className={styles.formLabel}>
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={state.firstName}
            onChange={(e) =>
              dispatch({ type: "SET_FIRST_NAME", payload: e.target.value })
            }
            className={styles.formInput}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="lastName" className={styles.formLabel}>
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={state.lastName}
            onChange={(e) =>
              dispatch({ type: "SET_LAST_NAME", payload: e.target.value })
            }
            className={styles.formInput}
          />
        </div>
        {state.error && <p className={styles.formError}>{state.error}</p>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default FormComponent;
