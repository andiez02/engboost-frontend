import { useEffect, useState } from "react";
import engboostLogo from "../../assets/home/engboost-logo.png";
import { routes } from "../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/userSlice";
import Profiles from "../AppBar/Profile";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === routes.HOME;
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dashboardItem = [
    { path: routes.HOME, name: "Trang chủ" },
    { path: routes.COURSE, name: "Khoá học" },
    { path: routes.BLOG, name: "Blog" },
  ];

  return (
    <header
      className={`h-[var(--height-header)] fixed top-0 left-0 w-screen flex justify-around transition-colors duration-500 ease-in-out z-1000 ${
        !isScrolled && isHome
          ? "bg-transparent text-white"
          : "bg-blue-200 shadow-lg opacity-95 text-black"
      }`}
    >
      <div>
        <img
          src={engboostLogo}
          className="h-full cursor-pointer"
          alt="Logo"
          onClick={() => navigate("/")}
        />
      </div>
      <div>
        <ul className="flex items-center gap-4 h-full">
          {dashboardItem.map((item) => {
            const isActive = location.pathname === item.path;
            const textColor = isHome
              ? isScrolled
                ? "text-black"
                : "text-white"
              : "text-gray-800";
            return (
              <li
                key={item.name}
                onClick={() => navigate(item.path)}
                className="relative cursor-pointer px-4 py-2"
              >
                <div
                  className={`text-center text-lg  flex items-center justify-center transition-all duration-300 uppercase ${textColor}
                  ${
                    isActive
                      ? "font-semibold after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:bg-current after:rounded-full after:transition-all after:duration-300 after:ease-in-out after:-translate-x-1/2 after:w-full"
                      : "hover:text-blue-500 hover:after:absolute hover:after:bottom-0 hover:after:left-1/2 hover:after:h-[3px] hover:after:bg-current hover:after:rounded-full hover:after:transition-all hover:after:duration-300 hover:after:ease-in-out hover:after:-translate-x-1/2 hover:after:w-full"
                  }`}
                >
                  <div>{item.name}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {currentUser ? (
        <div className="flex items-center h-full">
          <Profiles />
        </div>
      ) : (
        <div className="flex gap-4 items-center justify-evenly h-full">
          <button
            className={`h-[60%] border px-4 rounded-xl cursor-pointer shadow-md transition-all hover:translate-y-1 hover:shadow-sm ${
              isScrolled || !isHome
                ? "bg-white text-black border-transparent"
                : "bg-transparent border border-white text-white"
            }`}
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </button>

          <button
            className={`h-[60%] px-4 rounded-xl cursor-pointer shadow-md transition-all hover:translate-y-1 hover:shadow-sm ${
              isScrolled || !isHome
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => navigate("/register")}
          >
            Bắt đầu
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
