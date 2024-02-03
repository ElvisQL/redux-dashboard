import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../components/DataTable";
import { useSelector } from "react-redux";
import { getBlockedUsers } from "../redux/slices/userSlice";
export const BlockedUsersList = () => {
  const navigate = useNavigate();
  const blockedUsers = useSelector(getBlockedUsers);
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
        {blockedUsers.length > 0 ? (
          <DataTable users={blockedUsers} />
        ) : (
          <div>
            <span>there aren't blocked users</span>
          </div>
        )}
      </div>
    </main>
  );
};
