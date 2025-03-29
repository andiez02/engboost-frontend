import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Folder as FolderIcon } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { updateFolderAPI } from "../../../../../apis";
import FolderDetailModal from "./FolderDetailModal/FolderDetailModal";
import {
  fetchFolders,
  deleteFolder,
  createFolder,
} from "../../../../../redux/folder/folderSlice";

const Folders = () => {
  const dispatch = useDispatch();
  const { folders, isLoading } = useSelector((state) => state.folders);
  const [newFolderTitle, setNewFolderTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderDetailOpen, setFolderDetailOpen] = useState(false);
  const hasFetched = useRef(false);

  // Fetch folders only on initial mount
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchFolders());
      hasFetched.current = true;
    }
  }, [dispatch]);

  const handleCreateFolder = async () => {
    if (!newFolderTitle.trim()) return;

    setCreating(true);
    try {
      const response = await dispatch(
        createFolder({
          title: newFolderTitle.trim(),
        })
      ).unwrap();

      setNewFolderTitle("");
      setOpen(false);
    } catch (error) {
      console.error("Error creating folder:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleOpenFolder = (folder) => {
    setSelectedFolder(folder);
    setFolderDetailOpen(true);
  };

  const handleEditFolder = async (folderId, data) => {
    try {
      const response = await updateFolderAPI(folderId, data);
      if (response && response.folder) {
        dispatch(fetchFolders()); // Refresh folders after edit
      }
    } catch (error) {
      console.error("Error updating folder:", error);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      await dispatch(deleteFolder(folderId)).unwrap();
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4 md:p-6 min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 min-h-screen">
      {/* Folder Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {/* Create Folder Button */}
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

        {/* Existing Folders */}
        {folders.map((folder) => (
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
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {folder.title}
                </h3>
              </div>

              {/* Word Count */}
              <div className="text-xs text-gray-500 text-center mt-2 bg-gray-50 py-1 px-2 rounded-full">
                {folder.flashcard_count !== undefined
                  ? folder.flashcard_count
                  : 0}{" "}
                từ
              </div>
            </div>
          </Tooltip>
        ))}
      </div>

      {/* Empty state if no folders */}
      {folders.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          Bạn chưa có thư mục nào. Hãy tạo thư mục đầu tiên!
        </div>
      )}

      {/* Dialog for Creating Folder */}
      <Dialog
        open={open}
        onClose={() => !creating && setOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          className: "rounded-xl",
        }}
      >
        <DialogTitle className="pb-1">Tạo Folder Mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Tên Folder"
            variant="outlined"
            value={newFolderTitle}
            onChange={(e) => setNewFolderTitle(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && !creating && handleCreateFolder()
            }
            margin="dense"
            inputProps={{ maxLength: 30 }}
            disabled={creating}
          />
          <div className="text-xs text-gray-500 mt-1 text-right">
            {newFolderTitle.length}/30
          </div>
        </DialogContent>
        <DialogActions className="p-3">
          <Button
            onClick={() => setOpen(false)}
            color="inherit"
            size="small"
            disabled={creating}
          >
            Hủy
          </Button>
          <Button
            onClick={handleCreateFolder}
            variant="contained"
            color="primary"
            size="small"
            disabled={!newFolderTitle.trim() || creating}
          >
            {creating ? "Đang tạo..." : "Tạo"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Folder Detail Modal */}
      <FolderDetailModal
        open={folderDetailOpen}
        onClose={() => setFolderDetailOpen(false)}
        folder={selectedFolder}
        onEdit={handleEditFolder}
        onDelete={handleDeleteFolder}
      />
    </div>
  );
};

export default Folders;
