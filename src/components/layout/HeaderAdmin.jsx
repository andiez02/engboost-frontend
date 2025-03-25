import { X, Menu } from "lucide-react";
import engboostLogo from "../../assets/home/engboost-logo.png";
import Profiles from "../AppBar/Profile";
import { useNavigate } from "react-router-dom";

function HeaderAdmin() {
  const navigate = useNavigate();
  return (
    <header className="h-[var(--height-header)] fixed top-0 left-0 w-screen flex justify-between items-center transition-colors duration-500 ease-in-out z-1000 bg-blue-200 shadow-lg opacity-95 text-black px-5">
      <div className="flex items-center h-full">
        <img
          src={engboostLogo}
          className="h-full ml-10 cursor-pointer"
          alt="Logo"
          onClick={() => navigate("/admin/dashboard")}
        />
      </div>
      <div className="mr-20">
        <Profiles />
      </div>
    </header>
  );
}

export default HeaderAdmin;
