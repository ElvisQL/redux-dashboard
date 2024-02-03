import { Link } from "react-router-dom";
import { fetchUsers } from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsersStatus } from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store";
export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(getUsersStatus);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, []);
  return (
    <main className="home-main">
      <h1>DASHBOARD</h1>
      <div className="grid-box">
        <Link to={"/user"}>
          <div className="card-box">
            <span>VER USUARIOS</span>
          </div>
        </Link>
        <Link to={"/user/add"}>
          <div className="card-box">
            <span>AGREGAR USUARIOS</span>
          </div>
        </Link>

        <Link to={"/user/blocked"}>
          <div className="card-box">
            <span>VER USUARIOS BLOQUEADOS</span>
          </div>
        </Link>
      </div>
    </main>
  );
};
