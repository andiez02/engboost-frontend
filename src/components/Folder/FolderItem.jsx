import { Tooltip } from '@mui/material';
import { FolderIcon } from 'lucide-react';
import React from 'react';
import {
  Public as PublicIcon,
  PublicOff as PublicOffIcon,
} from '@mui/icons-material';

function FolderItem({ folder, handleOpenFolder, onPublicToggle }) {
  return (
    <div>
      <Tooltip key={folder._id} title={folder.title} arrow placement="top">
        <div
          className="bg-white border border-gray-200 rounded-xl 
                         p-4 flex flex-col justify-between h-36 w-full
                         hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer relative"
          onClick={() => handleOpenFolder(folder)}
        >
          {/* Public/Private Toggle Button */}
          {onPublicToggle && (
            <button
              className={`absolute top-2 right-2 p-1.5 rounded-lg text-xs font-medium flex items-center gap-1
                ${
                  folder.isPublic
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              onClick={(e) => {
                e.stopPropagation();
                onPublicToggle(folder._id);
              }}
            >
              {folder.isPublic ? (
                <>
                  <PublicIcon fontSize="small" />
                  Công khai
                </>
              ) : (
                <>
                  <PublicOffIcon fontSize="small" />
                  Riêng tư
                </>
              )}
            </button>
          )}

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
