import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../redux/model/User";
import { ButtonBack } from "../components/ButtonBack";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../redux/slices/userSlice";

export const UserData = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | undefined>();
  const users: Array<User> = useSelector(selectAllUsers);

  useEffect(() => {
    if (id && users.length > 0) {
      const foundUser = users.find((user) => user.id == id);
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, [id, users]);

  return (
    <div className="user-main">
      <ButtonBack />
      <div className="card-user">
        <div className="img-box-user">
          <img src={user?.image} alt="avatar" />
        </div>
        <div className="info-box-user">
          <div className="label-box">
            <span>
              <b>Name: </b>
              {user?.firstName} {user?.lastName}
            </span>
          </div>
          <div className="label-box">
            <span>
              <b>Username: </b> {user?.username}
            </span>
          </div>
          <div className="label-box">
            <span>
              <b>Email: </b> {user?.email}
            </span>
          </div>
          <div className="label-box">
            <span>
              <b>Phone: </b> {user?.phone}
            </span>
          </div>
          <div className="label-box">
            <span>
              <b>Birth Date: </b>
              {user?.birthDate}
            </span>
          </div>
          <div className="label-box">
            <span>
              <b>Age:</b>
              {user?.age}
            </span>
          </div>
          <div className="label-box">
            <span>
              <b>Adress: </b>
              {user?.address.address}
            </span>
          </div>
          <div className="label-box">
            <span>
              <b>City: </b>
              {user?.address.city}
            </span>
          </div>
          <div className="label-box">
            <span>
              <b>Postal Code:</b>
              {user?.address.postalCode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
