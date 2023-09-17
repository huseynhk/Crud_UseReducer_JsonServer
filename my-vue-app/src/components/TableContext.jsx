import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const TableContext = createContext();
const initialState = {
  data: [],
  firstName: "",
  lastName: "",
  email: "",
  age: 0,
  password: "",
  editedId: null,
  isEditModalOpen: false,
  filteredData: [],
  selectedUserData: [], //null
  isLoggedIn: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };

    case "SET_FIRSTNAME":
      return { ...state, firstName: action.payload };

    case "SET_LASTNAME":
      return { ...state, lastName: action.payload };

    case "SET_EMAIL":
      return { ...state, email: action.payload };

    case "SET_AGE":
      return { ...state, age: action.payload };

    case "SET_PASSWORD":
      return { ...state, password: action.payload };

    case "SET_EDITED_ID":
      return { ...state, editedId: action.payload };

    case "SET_IS_EDIT_MODAL_OPEN":
      return { ...state, isEditModalOpen: action.payload };

    case "SET_FILTER":
      return { ...state, filteredData: action.payload };

    case "SET_SELECTEDUSER":
      return { ...state, selectedUserData: action.payload };

    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload };

    case "RESET":
      return {
        ...state,
        firstName: "",
        age: "",
        lastName: "",
        email: "",
        password: "",
      };

    default:
      return state;
  }
};

const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(baseUrl);
      if (response.status != 200) {
        throw new Error("Something went wrong!");
      } else {
        // return response.data;
        dispatch({type:"SET_DATA" , payload:response.data})
        dispatch({type:"SET_FILTER" , payload:response.data})

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addLog = async () => {
    const { email, password } = state;
    if (!email || !password) {
      alert("Fill all inputs please");
      return;
    }
    const isUser = await isExist(email);
    console.log(isUser);
    if (isUser) {
      dispatch({ type: "SET_SELECTEDUSER", payload: isUser });
      dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
      setTimeout(() => {
        navigate(`/user/${isUser.id}`);
      }, 1500);
    } else {
      dispatch({ type: "SET_IS_LOGGED_IN", payload: false });
      setTimeout(() => {
        navigate(`/account`);
      }, 1500);
    }
  };

  const addForUser = async () => {
    const { firstName, lastName, email, age, password } = state;
    if (!firstName || !lastName || !email || !age || !password) {
      alert("Fill all inputs please");
      return;
    }
    const isUser = await isExist(email);
    if (isUser) {
      alert(`${email} is already exist`);
      return;
    }
    const newUser = {
      firstName,
      lastName,
      email,
      age,
      password,
      isAdmin:false
    };
    try {
      const response = await axios.post(baseUrl, newUser);
      if (!response) {
        console.log("Something went wrong");
        return;
      }
      await fetchData();
      dispatch({ type: "SET_SELECTEDUSER", payload: newUser });
      dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
      setTimeout(() => {
        navigate(`/`); //user/${newUser.id}
      }, 1500);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addUser = async () => {
    const { firstName, lastName, email, age, password } = state;
    if (!firstName || !lastName || !email || !age) {
      alert("Fill all inputs please");
      return;
    }
    const isUser = await isExist(email);

    if (isUser) {
      alert(`${email} is already exist`);
    }
    const newUser = {
      firstName,
      lastName,
      email,
      age,
      password,
    };

    try {
      const response = await axios.post(baseUrl, newUser);
      if (!response) {
        throw new Error("Something went wrong!");
      } else {
        await fetchData();
        dispatch({ type: "RESET" });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const isExist = async (userEmail) => {
    let response = await axios.get(baseUrl);
    try {
      if (!response) {
        throw new Error("Something went wrong!");
      } else {
        let findUser = state.data.find((user) => user.email === userEmail);
        return findUser;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        dispatch({ type: "SET_FIRSTNAME", payload: value });
        break;
      case "lastName":
        dispatch({ type: "SET_LASTNAME", payload: value });
        break;
      case "email":
        dispatch({ type: "SET_EMAIL", payload: value });
        break;
      case "age":
        dispatch({ type: "SET_AGE", payload: parseInt(value) });
        break;
      case "password":
        dispatch({ type: "SET_PASSWORD", payload: value });
        break;
      default:
        break;
    }
  };

  const deleteAllUsers = async () => {
    dispatch({ type: "SET_DATA", payload: [] });
    dispatch({ type: "SET_FILTER", payload: [] });
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${baseUrl}/${userId}`);
      if (!response) {
        throw new Error("Something went wrong!");
      } else {
        const updatedData = state.data.filter((user) => user.id !== userId);
        dispatch({ type: "SET_DATA", payload: updatedData });
        dispatch({ type: "SET_FILTER", payload: updatedData });
        dispatch({ type: "SET_SELECTEDUSER", payload: updatedData });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const editUser = async () => {
    const editedUser = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      age: state.age,
      password: state.password,
    };
    try {
      const response = await axios.put(
        `${baseUrl}/${state.editedId}`,
        editedUser
      );
      if (!response) {
        throw new Error("Something went wrong!");
      } else {
       await  fetchData();
        dispatch({ type: "SET_SELECTEDUSER", payload: editedUser });
        closeEditModal();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openEditModal = (userId) => {
    const userEdit = state.data.find((user) => user.id === userId);
    // console.log(userEdit);
    if (userEdit) {
      dispatch({ type: "SET_FIRSTNAME", payload: userEdit.firstName }); //firstName userEdit.firstName === olacaq
      dispatch({ type: "SET_LASTNAME", payload: userEdit.lastName });
      dispatch({ type: "SET_EMAIL", payload: userEdit.email });
      dispatch({ type: "SET_AGE", payload: userEdit.age });
      dispatch({ type: "SET_PASSWORD", payload: userEdit.password });
    }
    dispatch({ type: "SET_EDITED_ID", payload: userId });
    dispatch({ type: "SET_IS_EDIT_MODAL_OPEN", payload: true });
  };

  const closeEditModal = () => {
    dispatch({ type: "SET_EDITED_ID", payload: null });
    dispatch({ type: "SET_IS_EDIT_MODAL_OPEN", payload: false });
  };

  const filterUsers = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredUsers = state.data.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(searchValue) ||
        user.lastName.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
      );
    });
    dispatch({ type: "SET_FILTER", payload: filteredUsers });
  };

  const sortData = (event) => {
    const sortBy = event.target.value;
    const sortedData = [...state.filteredData];
    sortedData.sort((a, b) => {
      if (
        sortBy === "firstName" ||
        sortBy === "lastName" ||
        sortBy === "email"
      ) {
        return a[sortBy].localeCompare(b[sortBy]);
      } else if (sortBy === "age") {
        return a[sortBy] - b[sortBy];
      }
      return null;
    });
    dispatch({ type: "SET_FILTER", payload: sortedData });
  };




  useEffect(() => {
    fetchData()
    dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
  }, []);

  const contextValue = {
    data: state.data,
    addUser,
    handleInputChange,
    deleteUser,
    editUser,
    openEditModal,
    closeEditModal,
    showModal: state.isEditModalOpen,
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    age: state.age,
    password: state.password,
    filteredData: state.filteredData,
    filterUsers,
    sortData,
    deleteAllUsers,
    selectedUserData: state.selectedUserData,
    isLoggedIn: state.isLoggedIn,
    addLog,
    dispatch,
    addForUser,
  };

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableProvider };
