import { useNavigate } from "react-router-dom";

const PageTitleAndBack = ({ title = "Regresar" }) => {
  const navigate = useNavigate();
  
  return (
      <div className="flex">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-secondary"
        >
          <img
            src="/Icons/arrowleft.svg"
            alt="Back arrow button"
            className="mr-10"
          />
        </button>
        <h1 className="text-light-text montserrat font-medium">{title}</h1>
      </div>
  );
};

export default PageTitleAndBack;