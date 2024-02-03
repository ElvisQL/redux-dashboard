import { DataTable } from "../components/DataTable";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../redux/slices/userSlice";

import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const UserList = () => {
  const users = useSelector(selectAllUsers);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className="userList">
      <div className="icon-back-box" onClick={handleGoBack}>
        <IoArrowBackCircleOutline />
      </div>
      <div className="list-box">
        <h1>USER LIST: (dummieJSON API)</h1>
        <DataTable users={users} />
      </div>
    </main>
  );
};
