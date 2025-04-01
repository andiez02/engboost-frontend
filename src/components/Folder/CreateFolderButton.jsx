import React from 'react';
import { Plus } from 'lucide-react';

function CreateFolderButton({ setOpen }) {
  return (
    <div>
      <div
        className="bg-blue-50 border-2 border-blue-200 rounded-xl 
                     flex flex-col items-center justify-center cursor-pointer 
                     hover:bg-blue-100 hover:border-blue-300 transition-all h-36 w-full
                     shadow-sm hover:shadow-md"
        onClick={() => setOpen(true)}
      >
        <div className="bg-blue-100 p-2 rounded-full mb-2">
          <Plus className="text-blue-600" size={28} />
        </div>
        <span className="text-sm font-medium text-blue-600">Tạo Folder</span>
      </div>
    </div>
  );
}

export default CreateFolderButton;
