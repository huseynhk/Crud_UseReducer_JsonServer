import TableReducer from "./components/TableReducer";
import { TableProvider } from "./components/TableContext";
import Account from "./components/Account";
import User from "./components/User";
import LogIn from "./components/LogIn";
import Error from "./Pages/Error";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <TableProvider>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/account" element={<Account />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="table" element={<TableReducer />} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </TableProvider>
    </>
  );
}

export default App;
