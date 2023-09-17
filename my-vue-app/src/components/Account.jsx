import React, { useContext } from "react";
import { TableContext } from "./TableContext";
import { useParams } from "react-router-dom";

const Account = () => {
  const {
    addForUser,
    handleInputChange,
    firstName,
    lastName,
    email,
    age,
    password,
  } = useContext(TableContext);
  const { userId } = useParams();
  console.log("userId:", userId);

  return (
    <div>
      <h3 className="ms-4 mt-3">Qeydiyyat</h3>
      <form className="d-flex align-items-center justify-content-center">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="mx-2"
          name="lastName"
          value={lastName}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Age"
          className="mx-2"
          name="age"
          value={age}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="password"
          className="mx-2"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-info text-white  py-2 px-5 ms-4"
          type="button"
          onClick={addForUser}
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default Account;
