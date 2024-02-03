import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const ButtonBack: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="icon-back-box" onClick={handleGoBack}>
      <IoArrowBackCircleOutline />
    </div>
  );
};
