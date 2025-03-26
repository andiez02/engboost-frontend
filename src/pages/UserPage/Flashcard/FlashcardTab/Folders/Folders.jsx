import React, { useState } from "react";
import { Plus, Folder as FolderIcon } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";

const Folders = () => {
  const [folders, setFolders] = useState([
    { id: 1, title: "Học Tập", wordCount: 45 },
    { id: 2, title: "Công Việc", wordCount: 78 },
    { id: 3, title: "Dự án siêu dài mà không thể rút gọn", wordCount: 23 },
  ]);

  const [newFolderTitle, setNewFolderTitle] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreateFolder = () => {
    if (newFolderTitle.trim()) {
      setFolders([
        ...folders,
        { id: folders.length + 1, title: newFolderTitle, wordCount: 0 },
      ]);
      setNewFolderTitle("");
      setOpen(false);
    }
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center">
      {/* Folder Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {/* Create Folder Button */}
        <div
          className="bg-blue-100 border-2 border-blue-300 rounded-xl 
                     flex flex-col items-center justify-center cursor-pointer 
                     hover:bg-blue-200 transition-all h-40 w-40 shadow-md"
          onClick={() => setOpen(true)}
        >
          <Plus className="text-blue-600" size={36} />
          <span className="text-sm text-blue-600 mt-1">Tạo Folder</span>
        </div>

        {/* Existing Folders */}
        {folders.map((folder) => (
          <Tooltip key={folder.id} title={folder.title} arrow>
            <div
              className="bg-white border border-gray-200 rounded-xl 
                         p-4 flex flex-col justify-between h-40 w-40
                         hover:shadow-lg transition-shadow"
            >
              {/* Folder Icon + Title */}
              <div className="flex flex-col items-center">
                <FolderIcon className="text-yellow-500" size={32} />
                <h3
                  className="font-semibold text-base text-gray-800 text-center mt-2 leading-tight"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                    textOverflow: "ellipsis",
                  }}
                >
                  {folder.title}
                </h3>
              </div>

              {/* Word Count */}
              <div className="text-sm text-gray-500 text-center mt-2">
                Từ: {folder.wordCount}
              </div>
            </div>
          </Tooltip>
        ))}
      </div>

      {/* Dialog for Creating Folder */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Tạo Folder Mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Tên Folder"
            variant="outlined"
            value={newFolderTitle}
            onChange={(e) => setNewFolderTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleCreateFolder()}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Hủy
          </Button>
          <Button
            onClick={handleCreateFolder}
            variant="contained"
            color="primary"
          >
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Folders;
