import React, { useContext, useEffect } from "react";
import { TableContext } from "./TableContext";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const User = () => {
  const {
    // data,
    handleInputChange,
    deleteUser,
    dispatch,
    editUser,
    openEditModal,
    closeEditModal,
    showModal,
    selectedUserData,
    isLoggedIn,
    firstName,
    lastName,
    email,
    age,
    password,
  } = useContext(TableContext);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { userId } = useParams();
  console.log("selectedUserData", selectedUserData);
  console.log("userId:", userId);

  const getUserbyId = async () => {
    try {
      const request = await axios.get(`${baseUrl}/${userId}`);

      if (request.status === 200) {
        dispatch({ type: "SET_SELECTEDUSER", payload: request.data });
      } else {
        throw new Error("Xeta bas verdi");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserbyId();
    }
  }, []);
  return (
    <>
      {selectedUserData.isAdmin && (
        <Link className="btn btn-secondary m-2 px-5 py-2" to="/table">
          Go Table
        </Link>
      )}

      
      {isLoggedIn && (
        <Card style={{ width: "20rem" }} key={selectedUserData.id}>
          <Card.Body>
            <Card.Title>{selectedUserData.firstName} Datas</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Name: {selectedUserData.firstName}</ListGroup.Item>
            <ListGroup.Item>
              SurName: {selectedUserData.lastName}
            </ListGroup.Item>
            <ListGroup.Item>Email: {selectedUserData.email}</ListGroup.Item>
            <ListGroup.Item>Age: {selectedUserData.age}</ListGroup.Item>
            <ListGroup.Item>
              PassWord: {selectedUserData.password}
            </ListGroup.Item>
            <button
              type="button"
              className="btn btn-primary text-white mx-5 mb-1"
              onClick={() => openEditModal(selectedUserData.id)}
            >
              <FiEdit className="fs-5" />
            </button>
            <button
              type="button"
              className="btn btn-danger text-white mx-5  mb-1"
              onClick={() => deleteUser(selectedUserData.id)}
            >
              <BsFillTrashFill className="fs-5" />
            </button>
          </ListGroup>
        </Card>
      )}

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
              <label htmlFor="age" className="form-label">
                PassWord
              </label>
              <input
                type="number"
                className="form-control"
                id="password"
                name="password"
                onChange={handleInputChange}
                value={password}
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

export default User;
