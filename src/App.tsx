import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { Layout } from "./components/Layout";
import { UserList } from "./views/UserList";
import { UserData } from "./views/UserData";
import { FormAddUser } from "./views/FormAddUser";
import { BlockedUsersList } from "./views/BlockedUsersList";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/user/:id" element={<UserData />} />
          <Route path="/user/add" element={<FormAddUser />} />
          <Route path="/user/blocked" element={<BlockedUsersList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
