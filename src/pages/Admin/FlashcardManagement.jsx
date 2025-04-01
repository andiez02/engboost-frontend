import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import CreateFolderDialog from '../../components/Folder/CreateFolderDialog';
import CreateFolderButton from '../../components/Folder/CreateFolderButton';
import FolderItem from '../../components/Folder/FolderItem';
import AdminFolderDetailModal from '../../components/Folder/AdminFolderDetailModal';
import { mockAdminFolderAPI } from '../../mock/adminFolderData';

const FlashcardManagement = () => {
  const [folders, setFolders] = useState([]);
  const [newFolderTitle, setNewFolderTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folderDetailOpen, setFolderDetailOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  // Fetch folders only on initial mount
  useEffect(() => {
    if (!hasFetched.current) {
      fetchFolders();
      hasFetched.current = true;
    }
  }, []);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const response = await mockAdminFolderAPI.getPublicFolders();
      setFolders(response);
    } catch (error) {
      console.error('Error fetching folders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderTitle.trim()) return;

    setCreating(true);
    try {
      const response = await mockAdminFolderAPI.createPublicFolder({
        title: newFolderTitle.trim(),
      });
      setFolders([...folders, response]);
      setNewFolderTitle('');
      setOpen(false);
    } catch (error) {
      console.error('Error creating folder:', error);
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
      const response = await mockAdminFolderAPI.updateFolder(folderId, data);
      if (response) {
        setFolders(
          folders.map((folder) => (folder._id === folderId ? response : folder))
        );
        setSelectedFolder(response);
      }
    } catch (error) {
      console.error('Error updating folder:', error);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      const success = await mockAdminFolderAPI.deleteFolder(folderId);
      if (success) {
        setFolders(folders.filter((folder) => folder._id !== folderId));
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const handleFlashcardChange = (folderId, newCount) => {
    setFolders(
      folders.map((folder) =>
        folder._id === folderId
          ? { ...folder, flashcard_count: newCount }
          : folder
      )
    );
  };

  return (
    <div className="p-4 md:p-6 min-h-screen">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: '#1e293b',
            mb: 1,
          }}
        >
          Quản lý Flashcard Công khai
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#64748b',
          }}
        >
          Tạo và quản lý các thư mục flashcard công khai cho người dùng
        </Typography>
      </Box>

      {/* Folder Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* Create Folder Button */}
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <CreateFolderButton setOpen={setOpen} />
          </Grid>

          {/* Existing Folders */}
          {folders.map((folder) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={folder._id}>
              <FolderItem folder={folder} handleOpenFolder={handleOpenFolder} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Empty state if no folders */}
      {!loading && folders.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#64748b',
              mb: 1,
            }}
          >
            Chưa có thư mục công khai nào
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#94a3b8',
            }}
          >
            Tạo thư mục đầu tiên để bắt đầu quản lý flashcard công khai
          </Typography>
        </Box>
      )}

      {/* Dialog for Creating Folder */}
      <CreateFolderDialog
        open={open}
        onClose={() => setOpen(false)}
        newFolderTitle={newFolderTitle}
        setNewFolderTitle={setNewFolderTitle}
        creating={creating}
        handleCreateFolder={handleCreateFolder}
      />

      {/* Folder Detail Modal */}
      <AdminFolderDetailModal
        open={folderDetailOpen}
        onClose={() => setFolderDetailOpen(false)}
        folder={selectedFolder}
        onEdit={handleEditFolder}
        onDelete={handleDeleteFolder}
        onFlashcardChange={handleFlashcardChange}
      />
    </div>
  );
};

export default FlashcardManagement;
