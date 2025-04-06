import { LayoutDashboard, BookOpen, GraduationCap, Home } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const dashboardItems = [
  { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Flashcard', icon: BookOpen, path: '/flashcard' },
  { name: 'My Course', icon: GraduationCap, path: '/my_course' },
];

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`fixed top-[var(--height-header)] left-0 h-[calc(100vh-var(--height-header))] bg-white shadow-lg transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      } flex flex-col py-3 overflow-hidden`}
    >
      <ul className="space-y-2 flex-1 w-full">
        {dashboardItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <li key={index} className="px-3">
              <div
                className={`flex items-center rounded-xl cursor-pointer ${
                  isActive ? 'bg-blue-200' : 'hover:bg-blue-200'
                }`}
                onClick={() => navigate(item.path)}
              >
                {/* Fixed-width icon container */}
                <div className="h-12 w-10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-gray-600" />
                </div>

                {/* Text container with fixed position */}
                <div
                  className={`h-12 flex items-center overflow-hidden ${
                    isOpen ? 'w-auto' : 'w-0'
                  }`}
                >
                  <span className="text-[15px] text-gray-700 whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto px-3 mb-3">
        <div
          className="flex items-center bg-gray-200 rounded-xl cursor-pointer"
          onClick={() => navigate('/')}
        >
          {/* Fixed-width icon container */}
          <div className="h-12 w-10 flex items-center justify-center flex-shrink-0">
            <Home className="w-6 h-6 text-gray-600" />
          </div>

          {/* Text container with fixed position */}
          <div
            className={`h-12 flex items-center overflow-hidden ${
              isOpen ? 'w-auto' : 'w-0'
            }`}
          >
            <span className="text-[15px] text-gray-700 whitespace-nowrap">
              Về trang chủ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
