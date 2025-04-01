import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Divider,
  Paper,
  CircularProgress,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  Stack,
} from '@mui/material';
import {
  Delete,
  MoreVert,
  Add,
  FolderOutlined,
  Edit,
  Close,
} from '@mui/icons-material';
import { routes } from '../../utils/constants';
import { mockAdminFolderAPI } from '../../mock/adminFolderData';
import FlashcardList from './FlashcardList';
import EmptyFlashcardState from './EmptyFlashcardState';
import FlashcardForm from './FlashcardForm';

const AdminFolderDetailModal = ({
  open,
  onClose,
  folder,
  onEdit,
  onDelete,
  onFlashcardChange,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [folderTitle, setFolderTitle] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (open && folder && folder._id) {
      setFolderTitle(folder.title);
      setSelectedFolder(folder);
      setEditMode(false);
      fetchFlashcards();
    } else {
      // Reset states when modal is closed or folder is deleted
      setFlashcards([]);
      setSelectedFolder(null);
      setFolderTitle('');
      setEditMode(false);
    }
  }, [folder, open]);

  const fetchFlashcards = async () => {
    if (!folder?._id) return;

    setLoading(true);
    try {
      const response = await mockAdminFolderAPI.getFlashcardsByFolder(
        folder._id
      );
      setFlashcards(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setEditMode(true);
    handleMenuClose();
  };

  const handleSaveEdit = async () => {
    if (folderTitle.trim() && onEdit && selectedFolder && selectedFolder._id) {
      try {
        setIsUpdating(true);
        if (folderTitle.trim() !== selectedFolder.title) {
          await onEdit(selectedFolder._id, {
            title: folderTitle.trim(),
            isPublic: true,
          });
          setSelectedFolder((prev) => ({
            ...prev,
            title: folderTitle.trim(),
          }));
        }
      } catch (error) {
        console.error('Error updating folder:', error);
      } finally {
        setIsUpdating(false);
        setEditMode(false);
      }
    } else {
      setEditMode(false);
    }
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (onDelete && selectedFolder) {
      try {
        setDeleteDialogOpen(false);
        onClose();
        await onDelete(selectedFolder._id);
      } catch (error) {
        console.error('Error deleting folder:', error);
      }
    }
  };

  const handleRemoveCard = async (cardId) => {
    try {
      await mockAdminFolderAPI.deleteFlashcard(cardId);
      setFlashcards(flashcards.filter((card) => card._id !== cardId));
      const updatedCount = (selectedFolder.flashcard_count || 0) - 1;
      const updatedFolder = {
        ...selectedFolder,
        flashcard_count: updatedCount,
      };
      setSelectedFolder(updatedFolder);

      if (onFlashcardChange) {
        onFlashcardChange(selectedFolder._id, updatedCount);
      }
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const handleCreateFlashcard = () => {
    setIsFormOpen(true);
  };

  const handleSubmitFlashcard = async (newFlashcard) => {
    if (
      newFlashcard.front.trim() &&
      newFlashcard.back.trim() &&
      selectedFolder &&
      selectedFolder._id
    ) {
      try {
        setIsUpdating(true);

        // Generate a simple ID for the new flashcard
        const newId = `${selectedFolder._id}-${Date.now()}`;
        const newCard = {
          _id: newId,
          front: newFlashcard.front.trim(),
          back: newFlashcard.back.trim(),
          image_url: newFlashcard.image_url,
          folder_id: selectedFolder._id,
          isPublic: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Add to local state first for immediate UI update
        setFlashcards([...flashcards, newCard]);

        // Update folder count
        const updatedCount = (selectedFolder.flashcard_count || 0) + 1;
        const updatedFolder = {
          ...selectedFolder,
          flashcard_count: updatedCount,
        };
        setSelectedFolder(updatedFolder);

        if (onFlashcardChange) {
          onFlashcardChange(selectedFolder._id, updatedCount);
        }

        // Close form
        setIsFormOpen(false);
      } catch (error) {
        console.error('Error adding flashcard:', error);
      } finally {
        setIsUpdating(false);
      }
    } else {
      setIsFormOpen(false);
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
  };

  if (!selectedFolder) return null;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            height: '80vh',
            maxHeight: '800px',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: '16px 24px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <Box>
            {editMode ? (
              <TextField
                value={folderTitle}
                onChange={(e) => setFolderTitle(e.target.value)}
                variant="outlined"
                size="small"
                autoFocus
                inputProps={{ maxLength: 50 }}
                fullWidth
                sx={{
                  minWidth: '260px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                  },
                }}
              />
            ) : (
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: '#1e293b' }}
              >
                {folder?.title || 'Thư mục'}
              </Typography>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <Chip
                size="small"
                label={`${folder?.flashcard_count || 0} từ vựng`}
                sx={{
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: 'rgb(59, 130, 246)',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  height: '24px',
                }}
              />
              <Typography
                variant="caption"
                sx={{ ml: 2, color: '#64748b', fontStyle: 'italic' }}
              >
                Danh sách từ vựng công khai
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {editMode ? (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setEditMode(false);
                    setFolderTitle(folder?.title || '');
                  }}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    mr: 1,
                    borderColor: 'rgba(0,0,0,0.12)',
                    color: '#64748b',
                  }}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSaveEdit}
                  disabled={
                    !folderTitle.trim() ||
                    folderTitle.trim() === folder?.title ||
                    isUpdating
                  }
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    boxShadow: 'none',
                    bgcolor: '#3b82f6',
                    '&:hover': {
                      bgcolor: '#2563eb',
                      boxShadow: 'none',
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'rgba(59, 130, 246, 0.4)',
                      color: '#fff',
                    },
                  }}
                >
                  Lưu
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Add />}
                  onClick={handleCreateFlashcard}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    mr: 1,
                    boxShadow: 'none',
                    bgcolor: '#3b82f6',
                    '&:hover': {
                      bgcolor: '#2563eb',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Thêm từ mới
                </Button>
                <IconButton
                  onClick={handleMenuOpen}
                  size="small"
                  sx={{ mr: 1 }}
                >
                  <MoreVert fontSize="small" />
                </IconButton>
                <IconButton onClick={onClose} size="small">
                  <Close fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ flexGrow: 1, overflow: 'auto', bgcolor: '#f9fafb', p: 3 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={32} sx={{ color: '#3b82f6' }} />
            </Box>
          ) : flashcards.length === 0 ? (
            <EmptyFlashcardState onAddFirst={handleCreateFlashcard} />
          ) : (
            <FlashcardList
              flashcards={flashcards}
              loading={loading}
              onDeleteCard={handleRemoveCard}
            />
          )}
        </Box>

        {/* Flashcard Form */}
        {isFormOpen && (
          <FlashcardForm
            onSubmit={handleSubmitFlashcard}
            onCancel={handleCancelForm}
            isSubmitting={isUpdating}
          />
        )}
      </Dialog>

      {/* Menu for folder actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            borderRadius: '12px',
            minWidth: '160px',
          },
        }}
      >
        <MenuItem
          onClick={handleEditClick}
          sx={{
            py: 1.5,
            px: 2,
            '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.08)' },
          }}
        >
          <Edit fontSize="small" sx={{ mr: 1.5, color: '#3b82f6' }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Đổi tên thư mục
          </Typography>
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={handleDeleteClick}
          sx={{
            color: '#ef4444',
            py: 1.5,
            px: 2,
            '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.08)' },
          }}
        >
          <Delete fontSize="small" sx={{ mr: 1.5 }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Xóa thư mục
          </Typography>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          },
        }}
      >
        <Box sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                width: 36,
                height: 36,
              }}
            >
              <Delete fontSize="small" />
            </Avatar>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, fontSize: '1.1rem' }}
            >
              Xóa thư mục
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: '#475569', mb: 1 }}>
            Bạn có chắc chắn muốn xóa thư mục{' '}
            <span style={{ fontWeight: 600 }}>"{selectedFolder.title}"</span>?
          </Typography>
          <Typography variant="body2" sx={{ color: '#475569', mb: 3 }}>
            Tất cả flashcards trong thư mục này sẽ bị xóa và không thể khôi
            phục.
          </Typography>

          <Stack direction="row" spacing={1.5}>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              variant="outlined"
              color="inherit"
              fullWidth
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 500,
                p: 1,
              }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
              fullWidth
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: 'none',
                p: 1,
              }}
            >
              Xóa thư mục
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
};

export default AdminFolderDetailModal;
