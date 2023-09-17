import React, { useContext } from "react";
import { TableContext } from "./TableContext";

const LogIn = () => {
  const { addLog, handleInputChange, email, password } =
    useContext(TableContext);
  return (
    <div className="logInParent">
      <h3 className="ms-4 mt-3">Login Page</h3>
      <form className="py-5 text-center">
        <div className="w-75 bg-primary d-flex align-items-center justify-content-center flex-column py-3 rounded">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className="w-50"
          />
          <input
            type="password"
            placeholder="Password"
            className="mx-2 w-50"
            name="password"
            value={password}
            onChange={handleInputChange}
            
          />
          <button
            className="btn btn-info text-white  py-2 px-5 w-50"
            type="button"
            onClick={addLog}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
