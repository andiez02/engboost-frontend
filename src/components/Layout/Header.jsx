import { useEffect, useState } from 'react';
import engboostLogo from '../../assets/home/engboost-logo.png';
import { routes } from '../../utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/userSlice';
import Profiles from '../AppBar/Profile';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === routes.HOME;
  const currentUser = useSelector(selectCurrentUser);

  // Use throttling to prevent too many updates during scroll
  useEffect(() => {
    // For non-home pages, always use the scrolled style
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial scroll state
    setIsScrolled(window.scrollY > 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]); // Re-run effect when isHome changes

  const dashboardItems = [
    { path: routes.HOME, name: 'Trang chủ' },
    { path: routes.COURSE, name: 'Khoá học' },
    { path: routes.CHATBOT_INTRO, name: 'AI' },
  ];

  // Determine header background class
  const headerBgClass =
    !isScrolled && isHome
      ? 'bg-transparent'
      : 'bg-indigo-50 border-b border-indigo-100 shadow-sm';

  // Determine text color class
  const textColorClass = !isScrolled && isHome ? 'text-white' : 'text-black';

  return (
    <header
      className={`h-[var(--height-header)] fixed top-0 left-0 right-0 flex justify-between items-center z-50 px-4 md:px-6 ${headerBgClass} ${textColorClass}`}
      style={{
        transition:
          'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div className="flex items-center">
        {/* Fixed height and width container for logo */}
        <div className="h-[calc(var(--height-header)-16px)] w-auto flex items-center">
          <img
            src={engboostLogo}
            className="h-full w-auto object-contain"
            alt="Logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      <div className="hidden md:block">
        <ul className="flex items-center gap-4 h-full">
          {dashboardItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={item.name}
                onClick={() => navigate(item.path)}
                className="relative cursor-pointer px-4 py-2"
              >
                <div
                  className={`text-center text-base font-medium flex items-center justify-center
                  ${
                    isActive
                      ? 'after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:bg-current after:rounded-full after:transition-all after:duration-300 after:ease-in-out after:-translate-x-1/2 after:w-full'
                      : 'hover:text-indigo-600 hover:after:absolute hover:after:bottom-0 hover:after:left-1/2 hover:after:h-[3px] hover:after:bg-current hover:after:rounded-full hover:after:transition-all hover:after:duration-300 hover:after:ease-in-out hover:after:-translate-x-1/2 hover:after:w-full'
                  }`}
                >
                  {item.name}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center">
        {currentUser ? (
          <Profiles />
        ) : (
          <div className="flex gap-3 items-center">
            <button
              className={`py-2 px-4 rounded-lg text-sm font-medium ${
                isScrolled || !isHome
                  ? 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30'
              }`}
              style={{
                transition:
                  'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
              }}
              onClick={() => navigate('/login')}
            >
              Đăng nhập
            </button>

            <button
              className={`py-2 px-4 rounded-lg text-sm font-medium ${
                isScrolled || !isHome
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
              style={{
                transition: 'background-color 0.2s ease, color 0.2s ease',
              }}
              onClick={() => navigate('/register')}
            >
              Bắt đầu
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
