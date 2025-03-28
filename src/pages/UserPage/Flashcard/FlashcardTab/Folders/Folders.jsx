import React, { useState, useEffect } from "react";
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
import {
  createFolderAPI,
  getFoldersAPI,
  updateFolderAPI,
  deleteFolderAPI,
} from "../../../../../apis";
import FolderDetailModal from "./FolderDetailModal/FolderDetailModal";

const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [newFolderTitle, setNewFolderTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // State cho folder detail modal
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderDetailOpen, setFolderDetailOpen] = useState(false);

  // Fetch folders on component mount
  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const response = await getFoldersAPI();
      console.log("API Response:", response);

      if (response && response.folders) {
        // Log each folder to check flashcard_count
        response.folders.forEach((folder) => {
          console.log(
            "Folder:",
            folder.title,
            "Count:",
            folder.flashcard_count
          );
        });
        setFolders(response.folders);
      } else {
        console.warn("Unexpected API response format:", response);
        setFolders([]);
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
      setFolders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderTitle.trim()) return;

    setCreating(true);
    try {
      const response = await createFolderAPI({
        title: newFolderTitle.trim(),
        description: "",
        is_public: false,
      });

      console.log("Create folder response:", response);

      if (response && response.folder) {
        setFolders((prevFolders) => [response.folder, ...prevFolders]);
      }

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
        // Cập nhật state folders
        setFolders(
          folders.map((f) => (f._id === folderId ? { ...f, ...data } : f))
        );

        // Cập nhật selectedFolder
        setSelectedFolder((prev) => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error("Error updating folder:", error);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      await deleteFolderAPI(folderId);

      // Cập nhật state folders
      setFolders(folders.filter((f) => f._id !== folderId));
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  // Thêm hàm xử lý thay đổi số lượng flashcard
  const handleFlashcardChange = (folderId, newCount) => {
    console.log(`Updating folder ${folderId} count to ${newCount}`);

    // Cập nhật state folders
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder._id === folderId
          ? { ...folder, flashcard_count: newCount }
          : folder
      )
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-4 md:p-6 min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Đang tải thư mục...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 min-h-screen ">
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
        onFlashcardChange={handleFlashcardChange} // Thêm prop mới
      />
    </div>
  );
};

export default Folders;
