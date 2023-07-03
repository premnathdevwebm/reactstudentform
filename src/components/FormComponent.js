import { useEffect, useReducer } from "react";
import styles from "./FormComponent.module.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  welcomeMsg: "",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, firstName: action.payload };
    case "SET_LAST_NAME":
      return { ...state, lastName: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_WELCOME_MSG":
      return { ...state, welcomeMsg: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

function FormComponent(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    if(props.dataEnrolMent){
      dispatch({ type: "SET_FIRST_NAME", payload: props.dataEnrolMent.fname });
      dispatch({ type: "SET_LAST_NAME", payload: props.dataEnrolMent.lname });
      dispatch({ type: "SET_EMAIL", payload: props.dataEnrolMent.email });
      dispatch({ type: "SET_WELCOME_MSG", payload: "" });
    }
  }, [props])

  const handleInputReset = (fname, lname, email) => {
    dispatch({ type: "SET_FIRST_NAME", payload: fname });
    dispatch({ type: "SET_LAST_NAME", payload: lname });
    dispatch({ type: "SET_EMAIL", payload: email });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomKey = Math.floor(1 + Math.random() * 9000);
    // Perform validation
    if (
      state.firstName.trim() === "" ||
      state.lastName.trim() === "" ||
      state.email.trim() === ""
    ) {
      dispatch({ type: "SET_ERROR", payload: "Please fill in all fields" });
      return;
    }
    dispatch({ type: "SET_ERROR", payload: "" });
    handleInputReset("", "", "");
    dispatch({
      type: "SET_WELCOME_MSG",
      payload: `${state.firstName} ${state.lastName} enrolled with Email ${state.email}`,
    });
    props.setUpdateSeats(
      props.currentSeats - 1 > 0 ? props.currentSeats - 1 : 0
    );
    props.setStudentDetails({
      key: randomKey,
      fname: state.firstName,
      lname: state.lastName,
      program: props.chosenProgram,
      email: state.email,
    });
  };

  return (
    <>
      <h2>{props.chosenProgram} Student details</h2>
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
        <div className={styles.input}>
          <label htmlFor="email" className={styles.formLabel}>
            email:
          </label>
          <input
            type="email"
            id="email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
            className={styles.formInput}
          />
        </div>
        {state.welcomeMsg && (
          <p className={styles.welcomemsg}>{state.welcomeMsg}</p>
        )}
        {state.error && <p className={styles.formError}>{state.error}</p>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default FormComponent;
