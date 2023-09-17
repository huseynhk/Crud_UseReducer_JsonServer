import React, { useReducer } from "react";

const initialValue = {
  count: 0,
  text: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "increament":
      return (state = { ...state, count: state.count + action.payload });

    case "decrement":
      return (state = { ...state, count: state.count - action.payload });

    case "textInput":
      return (state = { ...state, text: action.payload});

    case "reset":
      return {
        count:0,
        text:''
      };

    default:
      break;
  }
}

const Count = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <div>
      <div className="parent">
        <input type="number"  onChange={(e) => dispatch({payload : Number(e.target.value) , type:"textInput"}) }/>
        <button onClick={() => dispatch({ type: "increament",  payload:state.text })}>
          +
        </button>
        <button onClick={() => dispatch({ type: "decrement",  payload:state.text })}>
          -
        </button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        <p>{state.count}</p>
      </div>
    </div>
  );
};

export default Count;
