import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { routes } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMyCoursesAPI } from '../../apis';

function UserCourseOverview() {
  const navigate = useNavigate();
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        setLoading(true);
        const data = await getMyCoursesAPI();
        setUserCourses(data.courses || []);
      } catch (error) {
        console.error('Failed to fetch user courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, []);

  const handleCourseClick = () => {
    navigate(`${routes.MY_COURSE}`);
  };

  const handleViewAll = () => {
    navigate(routes.COURSE);
  };

  const displayedCourses = userCourses.slice(0, 3);

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Khoá học của tôi</h3>
      <div className="w-full h-auto min-h-[160px] bg-gray-100 mt-4 rounded-2xl border border-gray-300 p-4 flex flex-col justify-between">
        {loading ? (
          <p className="text-base text-gray-500">Đang tải dữ liệu...</p>
        ) : (
          <div>
            <p className="text-base font-light text-gray-500 mb-2">
              {userCourses.length === 0
                ? 'Bạn chưa sở hữu khoá học nào cho chương trình này. Hãy để EngBoost giúp bạn lựa chọn khoá học phù hợp với trình độ và mục tiêu của bạn nhé!'
                : `Bạn đã đăng ký ${userCourses.length} khoá học. Tiếp tục học tập để đạt được mục tiêu của bạn!`}
            </p>
            {userCourses.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-700">
                    Danh sách khoá học:
                  </p>
                  <span className="text-xs text-gray-500">
                    {userCourses.length} khoá học
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {displayedCourses.map((course) => (
                    <div
                      key={`${course.id}-${course.title}`}
                      onClick={() => handleCourseClick(course.id)}
                      className="bg-white px-4 py-3 rounded-lg text-sm text-gray-600 border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer transition-all duration-200 flex items-center gap-3 shadow-sm hover:shadow-md"
                    >
                      <MenuBookIcon className="text-indigo-500 text-xl" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 text-base truncate">
                          {course.title}
                        </div>
                      </div>
                    </div>
                  ))}
                  {userCourses.length > 3 && (
                    <div
                      onClick={handleViewAll}
                      className="bg-white px-4 py-3 rounded-lg text-sm text-gray-600 border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                    >
                      <MoreHorizIcon className="text-indigo-500 text-xl" />
                      <div className="font-medium text-gray-800 text-base">
                        Xem tất cả
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {!loading && userCourses.length === 0 && (
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              alignSelf: 'start',
              '&:hover': { bgcolor: '#4F46E5' },
              marginTop: '1rem',
            }}
            onClick={() => navigate(routes.COURSE)}
          >
            Khám phá ngay
          </Button>
        )}
      </div>
    </div>
  );
}

export default UserCourseOverview;
