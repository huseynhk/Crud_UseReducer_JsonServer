import React, { useContext, useEffect, useRef } from "react";
import { TableContext } from "./TableContext";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Modal, Button } from "react-bootstrap";

const TableReducer = () => {
  const {
    // data,
    addUser,
    handleInputChange,
    deleteUser,
    editUser,
    openEditModal,
    closeEditModal,
    showModal,
    firstName,
    lastName,
    email,
    age,
    filterUsers,
    filteredData,
    sortData,
    deleteAllUsers,
  } = useContext(TableContext);

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // console.log("filteredData",filteredData);

  return (
    <>
      <header className="d-flex align-items-center">
        <input
          type="text"
          placeholder="Serach"
          ref={inputRef}
          name="search"
          className="searchInput"
          onChange={filterUsers}
        />
         <button className="btn btn-danger text-white ms-2 px-3" onClick={deleteAllUsers}>Remove</button>

        <select className="py-2 px-1 border rounded ms-2" onChange={sortData}>
          <option value="Title" className="text-body-tertiary">
            Sort User
          </option>
          <option value="firstName">Sort by FirstName</option>
          <option value="lastName">Sort by LastName</option>
          <option value="email">Sort by Email</option>
          <option value="age">Sort by Age</option>
        </select>
      </header>

      <form className="d-flex align-items-center">
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

        <button
          className="btn btn-info text-white  py-2 px-5 ms-4"
          type="button"
          onClick={addUser}
        >
          Add User
        </button>
      </form>

      <div className="table-container">
        <table className="w-100 text-capitalize">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>

              <td>
                <button
                  type="button"
                  className="btn btn-primary text-white mx-3 mb-1"
                  onClick={() => openEditModal(user.id)}
                >
                  <FiEdit className="fs-5" />
                </button>
                <button
                  type="button"
                  className="btn btn-danger text-white mb-1"
                  onClick={() => deleteUser(user.id)}
                >
                  <BsFillTrashFill className="fs-5" />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>

      {/* MODAL */}
      <Modal show={showModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                onChange={handleInputChange}
                value={firstName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                onChange={handleInputChange}
                value={lastName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={handleInputChange}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                onChange={handleInputChange}
                value={age}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={editUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableReducer;
