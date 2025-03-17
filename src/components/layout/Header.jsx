import { useEffect, useState } from "react";
import engboostLogo from "../../assets/home/engboost-logo.png";
import { routes } from "../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === routes.HOME;

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
    { path: routes.ABOUT_US, name: "Về chúng tôi" },
  ];

  return (
    <header
      className={`h-[var(--height-header)] fixed top-0 left-0 w-screen flex justify-around transition-colors duration-500 ease-in-out ${
        !isScrolled && isHome
          ? "bg-transparent text-white"
          : "bg-blue-200 shadow-lg opacity-95 text-black"
      }`}
    >
      <div>
        <img src={engboostLogo} className="h-full" alt="Logo" />
      </div>
      <div className="w-[40%]">
        <ul className="flex items-center justify-evenly h-full">
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
                  className={`text-center text-lg flex items-center justify-center transition-all duration-300 ${textColor}
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

      <div className="flex gap-4 items-center justify-evenly h-full">
        <button
          className={`h-[60%] px-4 rounded-xl cursor-pointer shadow-md transition-all hover:translate-y-1 hover:shadow-sm ${
            isScrolled || !isHome
              ? "bg-white text-black"
              : "bg-transparent border border-white text-white"
          }`}
        >
          Đăng nhập
        </button>

        <button
          className={`h-[60%] px-4 rounded-xl cursor-pointer shadow-md transition-all hover:translate-y-1 hover:shadow-sm ${
            isScrolled || !isHome
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          Bắt đầu
        </button>
      </div>
    </header>
  );
}

export default Header;
