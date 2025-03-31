import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Paper,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  IconButton,
  alpha,
  FormHelperText,
} from "@mui/material";
import {
  Folder as FolderIcon,
  SaveAlt as SaveAltIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  CreateNewFolder as CreateNewFolderIcon,
} from "@mui/icons-material";
import { fetchFolders } from "../../redux/folder/folderSlice";

const SaveFlashcardModal = ({
  open,
  onClose,
  flashcards = [],
  onSave,
  initialFolderId = null,
  initialFolderTitle = null,
}) => {
  const dispatch = useDispatch();
  const { folders, isLoading: isLoadingFolders } = useSelector(
    (state) => state.folders
  );
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(initialFolderId || "");
  const [createNewFolder, setCreateNewFolder] = useState(!initialFolderId);
  const [newFolderName, setNewFolderName] = useState(initialFolderTitle || "");
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [folderNameExists, setFolderNameExists] = useState(false);

  // Fetch folders when modal opens
  useEffect(() => {
    if (open) {
      dispatch(fetchFolders());
      setError(""); // Reset error khi mở modal
    }
  }, [open, dispatch]);

  // Kiểm tra tên folder đã tồn tại chưa
  useEffect(() => {
    if (createNewFolder && newFolderName.trim()) {
      const exists = folders.some(
        (folder) =>
          folder.title.toLowerCase() === newFolderName.trim().toLowerCase()
      );
      setFolderNameExists(exists);

      if (exists) {
        setError(
          `Folder "${newFolderName.trim()}" already exists. Please choose a different name.`
        );
      } else {
        setError("");
      }
    } else {
      setFolderNameExists(false);
    }
  }, [newFolderName, folders, createNewFolder]);

  const handleSave = useCallback(async () => {
    if (
      (!selectedFolder && !createNewFolder) ||
      (createNewFolder && !newFolderName.trim())
    ) {
      setError("Please select a folder or create a new one");
      return;
    }

    if (createNewFolder && folderNameExists) {
      setError(
        `Folder "${newFolderName.trim()}" already exists. Please choose a different name.`
      );
      return;
    }

    setIsSaving(true);
    try {
      const folderInfo = {
        id: selectedFolder,
        isNew: createNewFolder,
        title: createNewFolder
          ? newFolderName.trim()
          : folders.find((f) => f._id === selectedFolder)?.title || "Unknown",
      };

      if (onSave) {
        await onSave(folderInfo);
      }

      onClose();
    } catch (error) {
      console.error("Error saving flashcards:", error);
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || error.response.data.error;
        if (errorMessage && errorMessage.includes("already exists")) {
          setError(
            `Folder "${newFolderName.trim()}" already exists. Please choose a different name.`
          );
          setFolderNameExists(true);
          dispatch(fetchFolders());
        } else {
          setError(
            errorMessage || "Failed to save flashcards. Please try again."
          );
        }
      } else {
        setError("Failed to save flashcards. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  }, [
    selectedFolder,
    createNewFolder,
    newFolderName,
    folderNameExists,
    folders,
    onSave,
    onClose,
    dispatch,
  ]);

  const handleFolderNameChange = (e) => {
    const value = e.target.value;
    setNewFolderName(value);

    // Kiểm tra trùng tên khi người dùng nhập
    if (value.trim()) {
      const exists = folders.some(
        (folder) => folder.title.toLowerCase() === value.trim().toLowerCase()
      );
      setFolderNameExists(exists);

      if (exists) {
        setError(
          `Folder "${value.trim()}" already exists. Please choose a different name.`
        );
      } else {
        setError("");
      }
    } else {
      setFolderNameExists(false);
      setError("");
    }
  };

  const toggleCreateNewFolder = () => {
    setCreateNewFolder(!createNewFolder);
    if (!createNewFolder) {
      setSelectedFolder("");
      setNewFolderName("");
    } else {
      setNewFolderName("");
    }
    setError("");
    setFolderNameExists(false);
  };

  return (
    <Dialog
      open={open}
      onClose={!isSaving ? onClose : undefined}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          p: 3,
          pb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              bgcolor: alpha("#8B5CF6", 0.1),
              color: "#8B5CF6",
              width: 42,
              height: 42,
            }}
          >
            <SaveAltIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Save Flashcards
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {flashcards.length} flashcard{flashcards.length !== 1 ? "s" : ""}{" "}
              to save
            </Typography>
          </Box>
        </Box>
        {!isSaving && (
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{ color: "text.secondary" }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        {/* Folder Selection Section */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
          >
            <FolderIcon fontSize="small" sx={{ color: "#8B5CF6" }} />
            Select Destination
          </Typography>

          {!createNewFolder ? (
            <FormControl fullWidth error={!!error && !selectedFolder}>
              <InputLabel id="folder-select-label">Choose a folder</InputLabel>
              <Select
                labelId="folder-select-label"
                value={selectedFolder}
                onChange={(e) => {
                  setSelectedFolder(e.target.value);
                  setError("");
                }}
                label="Choose a folder"
                disabled={isLoadingFolders || isSaving}
                sx={{
                  borderRadius: "12px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      !!error && !selectedFolder ? "error.main" : undefined,
                  },
                }}
              >
                {isLoadingFolders ? (
                  <MenuItem value="" disabled>
                    <Box sx={{ display: "flex", alignItems: "center", py: 1 }}>
                      <CircularProgress size={20} sx={{ mr: 2 }} />
                      Loading folders...
                    </Box>
                  </MenuItem>
                ) : folders?.length > 0 ? (
                  folders.map((folder) => (
                    <MenuItem key={folder._id} value={folder._id}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FolderIcon
                          sx={{ mr: 1.5, color: "#8B5CF6", fontSize: 20 }}
                        />
                        {folder.title}
                      </Box>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    No folders available
                  </MenuItem>
                )}
              </Select>
              {!!error && !selectedFolder && (
                <FormHelperText>{error}</FormHelperText>
              )}
            </FormControl>
          ) : (
            <TextField
              fullWidth
              label="New folder name"
              variant="outlined"
              value={newFolderName}
              onChange={handleFolderNameChange}
              disabled={isSaving}
              error={!!error && createNewFolder}
              helperText={!!error && createNewFolder ? error : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <CreateNewFolderIcon
                    sx={{ mr: 1, color: "#8B5CF6", opacity: 0.7 }}
                  />
                ),
              }}
              autoFocus
            />
          )}

          <Button
            variant="text"
            color="primary"
            onClick={toggleCreateNewFolder}
            disabled={isSaving}
            startIcon={
              createNewFolder ? <FolderIcon /> : <CreateNewFolderIcon />
            }
            sx={{
              mt: 1.5,
              textTransform: "none",
              fontWeight: 500,
              color: "#8B5CF6",
              "&:hover": {
                backgroundColor: alpha("#8B5CF6", 0.05),
              },
            }}
          >
            {createNewFolder
              ? "Select from existing folders"
              : "Create a new folder"}
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Flashcards Preview Section */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <CheckCircleIcon fontSize="small" sx={{ color: "#8B5CF6" }} />
              Flashcards to Save
            </Typography>
            <Button
              variant="text"
              size="small"
              onClick={() => setShowPreview(!showPreview)}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              {showPreview ? "Hide preview" : "Show preview"}
            </Button>
          </Box>

          <Paper
            variant="outlined"
            sx={{
              borderRadius: "16px",
              borderColor: "rgba(0,0,0,0.1)",
              bgcolor: alpha("#8B5CF6", 0.02),
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: showPreview
                  ? "1px solid rgba(0,0,0,0.08)"
                  : "none",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Total flashcards:
              </Typography>
              <Chip
                label={flashcards.length}
                size="small"
                sx={{
                  fontWeight: 600,
                  bgcolor: alpha("#8B5CF6", 0.1),
                  color: "#8B5CF6",
                }}
              />
            </Box>

            {showPreview && (
              <List
                sx={{
                  maxHeight: "200px",
                  overflow: "auto",
                  p: 0,
                }}
              >
                {flashcards.map((card, index) => (
                  <ListItem
                    key={card.id || index}
                    divider={index < flashcards.length - 1}
                    sx={{
                      px: 2,
                      py: 1.5,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                    }}
                  >
                    <Avatar
                      src={card.imageUrl}
                      variant="rounded"
                      sx={{ width: 48, height: 48, borderRadius: "8px" }}
                    />
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        sx={{
                          mb: 0.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {card.english}
                        {card.object && (
                          <Chip
                            label={card.object}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.65rem",
                              bgcolor: alpha("#8B5CF6", 0.1),
                              color: "#8B5CF6",
                            }}
                          />
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {card.vietnamese}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          pt: 1,
        }}
      >
        <Button
          onClick={onClose}
          disabled={isSaving}
          variant="outlined"
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 500,
            borderColor: "#E5E7EB",
            color: "#6B7280",
            "&:hover": {
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
            },
            px: 2,
            py: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={
            isSaving ||
            (createNewFolder && (!newFolderName.trim() || folderNameExists)) ||
            (!createNewFolder && !selectedFolder)
          }
          variant="contained"
          startIcon={
            isSaving ? <CircularProgress size={20} /> : <SaveAltIcon />
          }
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 500,
            backgroundColor: "#8B5CF6",
            boxShadow: `0 4px 12px ${alpha("#8B5CF6", 0.3)}`,
            "&:hover": {
              backgroundColor: "#7C3AED",
            },
            px: 2,
            py: 1,
          }}
        >
          {isSaving ? "Saving..." : "Save Flashcards"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(SaveFlashcardModal);
