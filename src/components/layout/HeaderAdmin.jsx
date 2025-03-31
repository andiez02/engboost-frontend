import { X, Menu, ArrowLeft } from 'lucide-react';
import engboostLogo from '../../assets/home/engboost-logo.png';
import Profiles from '../AppBar/Profile';
import { useNavigate, useLocation } from 'react-router-dom';

function HeaderAdmin({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isSettingsPage = location.pathname.includes('/admin/settings');

  return (
    <header className="h-[var(--height-header)] fixed top-0 left-0 w-screen flex justify-between items-center transition-colors duration-500 ease-in-out z-1000 bg-blue-200 shadow-lg opacity-95 text-black px-5">
      <div className="flex items-center h-full">
        {/* Back Button or Sidebar Toggle Button */}
        <button
          onClick={() =>
            isSettingsPage
              ? navigate('/admin/dashboard')
              : setIsSidebarOpen(!isSidebarOpen)
          }
          className="p-2 bg-gray-300 rounded-lg shadow-md mr-4 hover:bg-gray-400 transition-colors"
        >
          {isSettingsPage ? (
            <ArrowLeft size={24} />
          ) : isSidebarOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

        <img
          src={engboostLogo}
          className="h-full ml-10 cursor-pointer"
          alt="Logo"
          onClick={() => navigate('/admin/dashboard')}
        />
      </div>
      <div className="mr-20">
        <Profiles />
      </div>
    </header>
  );
}

export default HeaderAdmin;
