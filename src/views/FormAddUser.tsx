import { useState, useEffect, FormHTMLAttributes } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ButtonBack } from "../components/ButtonBack";
import { useNavigate } from "react-router-dom";
import { selectAllUsers, addUser } from "../redux/slices/userSlice";
import { User } from "../redux/model/User";
import axios from "axios";
import { TbPhotoPlus } from "react-icons/tb";
import toast, { Toaster } from "react-hot-toast";

const UPLOAD_PRESET = "mi_preset_elvis";
const CLOUD_NAME = "dn7huh1uz";

export const FormAddUser = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    email: "",
    birthDate: "",
    age: "",
    image: "",
    address: {
      address: "",
      city: "",
      postalCode: "",
    },
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [imageView, setImageView] = useState<File | null>(null);

  const users: Array<User> = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const validateForm = () => {
    let valid = true;
    const errors = { ...formErrors };
    if (!newUser.firstName.trim()) {
      valid = false;
      errors.firstName = "first name is required";
    }
    if (!newUser.lastName.trim()) {
      valid = false;
      errors.lastName = "last name is required";
    }
    if (!newUser.username.trim()) {
      valid = false;
      errors.username = "username is required";
    }
    if (!newUser.phone.trim()) {
      valid = false;
      errors.phone = "phone is required";
    }
    if (!newUser.email.trim()) {
      valid = false;
      errors.email = "email is required";
    }
    if (!newUser.birthDate.trim()) {
      valid = false;
      errors.birthDate = "birth date is required";
    }
    if (!newUser.age.trim()) {
      valid = false;
      errors.age = "age is required";
    }
    if (!newUser.address.address.trim()) {
      valid = false;
      errors.address = "address is required";
    }
    if (!newUser.address.city.trim()) {
      valid = false;
      errors.city = "city is required";
    }
    if (!newUser.address.postalCode.trim()) {
      valid = false;
      errors.postalCode = "postal code is required";
    }
    if (!imageView) {
      valid = false;
      errors.image = "image is required";
    }
    setFormErrors(errors);
    return valid;
  };

  const uploadImage = async () => {
    if (!imageView) {
      return;
    }
    const data = new FormData();
    data.append("file", imageView);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUD_NAME);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        data
      );

      return response.data.secure_url;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const postUser = async () => {
      try {
        const imageUrl: string = await uploadImage();

        const updatedUser = { ...newUser, image: imageUrl };

        const response = await axios.post(
          "https://dummyjson.com/users/add",
          updatedUser
        ); //it doesnt add anything in the server, only add an id.

        const user = response.data;
        dispatch(addUser(user));
      } catch (error) {
        console.log(error);
      }
    };
    postUser();
    toast.success("User added successfully");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const copyErrors = { ...formErrors } as { [key: string]: string };
    copyErrors[name] = "";

    if (name === "address" || name === "city" || name === "postalCode") {
      setNewUser({
        ...newUser,
        address: { ...newUser.address, [name]: value },
      });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
    setFormErrors(copyErrors);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const image = files[0];
      setImageView(image);
    } else {
      setImageView(null);
    }
  };

  return (
    <main className="form-add-user">
      <div className="form-and-button-box">
        <ButtonBack></ButtonBack>
        <form onSubmit={handleOnSubmit}>
          <div className="form-group-image">
            <div className="container-img">
              {imageView ? (
                <img
                  src={imageView ? URL.createObjectURL(imageView) : ""}
                  alt="image"
                />
              ) : (
                <TbPhotoPlus />
              )}
            </div>

            <input type="file" name="image" onChange={handleImageChange} />
            {formErrors.image && (
              <span className="error-message">{formErrors.image}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name="firstName"
              value={newUser.firstName}
              onChange={handleOnChange}
            />
            {formErrors.firstName && (
              <span className="error-message">{formErrors.firstName}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Apellido"
              name="lastName"
              value={newUser.lastName}
              onChange={handleOnChange}
            />
            {formErrors.lastName && (
              <span className="error-message">{formErrors.lastName}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="username"
              name="username"
              value={newUser.username}
              onChange={handleOnChange}
            />
            {formErrors.username && (
              <span className="error-message">{formErrors.username}</span>
            )}
          </div>
          <div className="form-group-email">
            <input
              type="email"
              className="form-control"
              placeholder="Correo"
              name="email"
              value={newUser.email}
              onChange={handleOnChange}
            />
            {formErrors.email && (
              <span className="error-message">{formErrors.email}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              placeholder="phone"
              name="phone"
              value={newUser.phone}
              onChange={handleOnChange}
            />
            {formErrors.phone && (
              <span className="error-message">{formErrors.phone}</span>
            )}
          </div>
          <div className="form-group-birthday">
            <input
              type="date"
              className="form-control"
              name="birthDate"
              value={newUser.birthDate}
              onChange={handleOnChange}
            />
            {formErrors.birthDate && (
              <span className="error-message">{formErrors.birthDate}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              placeholder="age"
              name="age"
              value={newUser.age}
              onChange={handleOnChange}
            />
            {formErrors.age && (
              <span className="error-message">{formErrors.age}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="address"
              name="address"
              value={newUser.address.address}
              onChange={handleOnChange}
            />
            {formErrors.address && (
              <span className="error-message">{formErrors.address}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="city"
              name="city"
              value={newUser.address.city}
              onChange={handleOnChange}
            />
            {formErrors.city && (
              <span className="error-message">{formErrors.city}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="postal code"
              name="postalCode"
              value={newUser.address.postalCode}
              onChange={handleOnChange}
            />
            {formErrors.postalCode && (
              <span className="error-message">{formErrors.postalCode}</span>
            )}
          </div>
          <button type="submit" className="button-submit">
            Agregar
          </button>
        </form>
      </div>
      <Toaster />
    </main>
  );
};
