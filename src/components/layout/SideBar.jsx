import { LayoutDashboard, BookOpen, GraduationCap, Home } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const dashboardItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Flashcard", icon: BookOpen, path: "/flashcard" },
  { name: "My Course", icon: GraduationCap, path: "/my_course" },
];

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`fixed top-20 left-0 h-[calc(100vh-5rem)] bg-white shadow-lg transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } flex flex-col p-3 overflow-y-auto`}
    >
      <ul className="space-y-2 flex-1">
        {dashboardItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <li key={index}>
              <div
                className={`flex items-center gap-4 px-5 py-4 hover:bg-blue-200 rounded-xl cursor-pointer transition-all duration-300 ${
                  isOpen ? "justify-start" : "justify-center"
                } ${isActive ? "bg-blue-200 " : ""}`}
                onClick={() => navigate(item.path)}
              >
                <Icon className="w-6 h-6 flex-shrink-0 text-gray-600" />
                <span
                  className={`text-[15px] w-full text-gray-700 transition-all duration-300 truncate ${
                    isOpen ? "opacity-100" : "opacity-0 hidden"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto mb-10">
        <div
          className={`flex items-center gap-4 px-5 py-4 bg-gray-200 rounded-xl cursor-pointer transition-all duration-300 ${
            isOpen ? "justify-start" : "justify-center"
          }`}
          onClick={() => navigate("/")}
        >
          <Home className="w-6 h-6 flex-shrink-0 text-gray-600" />
          <span
            className={`text-[15px] w-full text-gray-700 transition-all duration-300 truncate ${
              isOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Về trang chủ
          </span>
        </div>
      </div>
    </div>
  );
}
