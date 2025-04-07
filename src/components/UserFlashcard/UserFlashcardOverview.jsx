import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FolderIcon from '@mui/icons-material/Folder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { routes } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFolders } from '../../redux/folder/folderSlice';

function UserFlashcardOverview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { folders } = useSelector((state) => state.folders);

  useEffect(() => {
    dispatch(fetchFolders());
  }, [dispatch]);

  const totalFlashcards = folders.reduce(
    (acc, folder) => acc + (folder.flashcard_count || 0),
    0
  );

  const handleFolderClick = () => {
    navigate(routes.FLASHCARD_FOLDERS);
  };

  const handleViewAll = () => {
    navigate(routes.FLASHCARD_FOLDERS);
  };

  const displayedFolders = folders.slice(0, 3);

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800">Flashcard của tôi</h3>
      <div className="w-full h-auto min-h-[160px] bg-gray-100 mt-4 rounded-2xl border border-gray-300 p-4 flex flex-col justify-between">
        <div>
          <p className="text-base font-light text-gray-500 mb-2">
            {folders.length === 0
              ? 'Bạn chưa học list từ nào. Khám phá ngay hoặc bắt đầu tạo các list từ mới.'
              : `Bạn đã có ${folders.length} thư mục với tổng cộng ${totalFlashcards} từ vựng.`}
          </p>
          {folders.length > 0 && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">
                  Danh sách thư mục:
                </p>
                <span className="text-xs text-gray-500">
                  {folders.length} thư mục
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {displayedFolders.map((folder) => (
                  <div
                    key={`${folder.id}-${folder.title}`}
                    onClick={() => handleFolderClick(folder.id)}
                    className="bg-white px-4 py-3 rounded-lg text-sm text-gray-600 border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer transition-all duration-200 flex items-center gap-3 shadow-sm hover:shadow-md"
                  >
                    <FolderIcon className="text-indigo-500 text-xl" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-base">
                        {folder.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {folder.flashcard_count || 0} từ vựng
                      </div>
                    </div>
                  </div>
                ))}
                {folders.length > 3 && (
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
        {folders.length === 0 && (
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              alignSelf: 'start',
              '&:hover': { bgcolor: '#4F46E5' },
              marginTop: '1rem',
            }}
            onClick={() => navigate(routes.FLASHCARD_SNAPLANG)}
          >
            Khám phá ngay
          </Button>
        )}
      </div>
    </div>
  );
}

export default UserFlashcardOverview;
