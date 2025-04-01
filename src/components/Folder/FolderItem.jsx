import { Tooltip } from '@mui/material';
import { FolderIcon } from 'lucide-react';
import React from 'react';

function FolderItem({ folder, handleOpenFolder }) {
  return (
    <div>
      <Tooltip key={folder._id} title={folder.title} arrow placement="top">
        <div
          className="bg-white border border-gray-200 rounded-xl 
                         p-4 flex flex-col justify-between h-36 w-full
                         hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer"
          onClick={() => handleOpenFolder(folder)}
        >
          {/* Folder Icon + Title */}
          <div className="flex flex-col items-center">
            <div className="bg-amber-50 p-2 rounded-full mb-2">
              <FolderIcon className="text-amber-500" size={28} />
            </div>
            <h3
              className="font-medium text-sm text-gray-800 text-center leading-tight"
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 2,
                textOverflow: 'ellipsis',
                maxWidth: '100%',
              }}
            >
              {folder.title}
            </h3>
          </div>

          {/* Word Count */}
          <div className="text-xs text-gray-500 text-center mt-2 bg-gray-50 py-1 px-2 rounded-full">
            {folder.flashcard_count !== undefined ? folder.flashcard_count : 0}{' '}
            từ
          </div>
        </div>
      </Tooltip>
    </div>
  );
}

export default FolderItem;
