import React, { useState, useRef } from "react";
import {
  Button,
  CircularProgress,
  Typography,
  Box,
  Container,
  Paper,
  Divider,
  Snackbar,
  Alert,
  List,
  Tooltip,
  IconButton,
  Chip,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import TranslateIcon from "@mui/icons-material/Translate";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import BackupIcon from "@mui/icons-material/Backup";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import Cards from "./Cards";
import { snaplangDetectAPI } from "../../../../../apis";

function Snaplang() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  console.log("🚀 ~ Snaplang ~ flashcards:", flashcards);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleImageChange = (event) => {
    handleFile(event.target.files?.[0]);
  };

  const handleFile = (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setAlert({
        open: true,
        message: "Chỉ hỗ trợ định dạng JPEG, PNG, GIF và WEBP",
        severity: "error",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAlert({
        open: true,
        message: "Kích thước ảnh không được vượt quá 5MB",
        severity: "error",
      });
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setTimeout(() => {
        setPreviewUrl(reader.result);
        setImage(file);
        setUploading(false);
        setAlert({
          open: true,
          message: "Tải ảnh lên thành công",
          severity: "success",
        });
      }, 800);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const data = await snaplangDetectAPI(formData);

      if (!data.detections || data.detections.length === 0) {
        setAlert({
          open: true,
          message: "Không nhận diện được vật thể nào.",
          severity: "warning",
        });
        return;
      }

      const newFlashcards = data.detections.map((item) => ({
        id: Date.now() + Math.random(),
        imageUrl: previewUrl,
        object: item.object,
        english: item.english,
        vietnamese: item.vietnamese,
      }));

      setFlashcards([...newFlashcards, ...flashcards]);

      setAlert({
        open: true,
        message: `Đã tạo ${newFlashcards.length} flashcard(s) thành công`,
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        message: "Có lỗi xảy ra khi nhận diện ảnh",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setImage(null);
      setPreviewUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const handleRemoveFlashcard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
    setAlert({
      open: true,
      message: "Đã xóa flashcard",
      severity: "info",
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const triggerCameraInput = () => {
    cameraInputRef.current.click();
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          background: "linear-gradient(to right bottom, #ffffff, #f8f9fa)",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <PhotoCameraIcon sx={{ color: "#3f51b5", mr: 1, fontSize: 28 }} />
          <Typography variant="h5" fontWeight="600" color="#3f51b5">
            Snaplang
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Học ngôn ngữ từ hình ảnh
          </Typography>
        </Box>

        {/* Image Selection Area */}
        <Box
          sx={{
            position: "relative",
            height: 220,
            width: "100%",
            mb: 3,
            borderRadius: 2,
            overflow: "visible",
            border: previewUrl
              ? "none"
              : dragActive
              ? "2px dashed #3f51b5"
              : "2px dashed #bdbdbd",
            bgcolor: previewUrl
              ? "transparent"
              : dragActive
              ? "rgba(63, 81, 181, 0.05)"
              : "#f5f5f5",
            transition: "all 0.3s ease",
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: 2,
              }}
            >
              <CircularProgress size={40} sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Đang tải ảnh lên...
              </Typography>
            </Box>
          )}

          {previewUrl ? (
            <>
              {/* Selected Image */}
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={previewUrl}
                  alt="Selected"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Remove Image Button */}
              <Tooltip title="Xóa ảnh" arrow>
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: -15,
                    right: -15,
                    backgroundColor: "white",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    "&:hover": {
                      backgroundColor: "#f44336",
                      color: "white",
                    },
                    transition: "all 0.2s ease",
                    zIndex: 2,
                  }}
                  onClick={handleRemoveImage}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* Image Info */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 1,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                  borderBottomLeftRadius: 2,
                  borderBottomRightRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" sx={{ color: "white" }}>
                  {image?.name}
                </Typography>
                <Chip
                  label={`${(image?.size / 1024).toFixed(1)} KB`}
                  size="small"
                  sx={{
                    height: 20,
                    backgroundColor: "rgba(255,255,255,0.3)",
                    color: "white",
                    fontSize: 10,
                  }}
                />
              </Box>
            </>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={triggerFileInput}
            >
              <BackupIcon
                sx={{
                  fontSize: 60,
                  color: dragActive ? "#3f51b5" : "#9e9e9e",
                  mb: 1,
                  transition: "color 0.3s ease",
                }}
              />
              <Typography
                variant="body1"
                color={dragActive ? "primary" : "text.secondary"}
                align="center"
                sx={{ transition: "color 0.3s ease" }}
              >
                {dragActive
                  ? "Thả ảnh vào đây"
                  : "Kéo thả hoặc nhấn để chọn ảnh"}
              </Typography>

              <Box sx={{ display: "flex", mt: 3, gap: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<PhotoLibraryIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFileInput();
                  }}
                  sx={{
                    borderRadius: 4,
                    textTransform: "none",
                  }}
                >
                  Thư viện
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<CameraAltIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerCameraInput();
                  }}
                  sx={{
                    borderRadius: 4,
                    textTransform: "none",
                  }}
                >
                  Chụp ảnh
                </Button>
              </Box>

              <Typography
                variant="caption"
                color="text.secondary"
                align="center"
                sx={{ mt: 2 }}
              >
                Hỗ trợ: JPEG, PNG, GIF, WEBP (Tối đa 5MB)
              </Typography>
            </Box>
          )}
        </Box>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        {/* Upload Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={loading ? null : <TranslateIcon />}
          onClick={handleUpload}
          disabled={!previewUrl || loading || uploading}
          sx={{
            borderRadius: 2,
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            background:
              previewUrl && !loading && !uploading
                ? "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)"
                : "#e0e0e0",
            "&:hover": {
              background: "linear-gradient(45deg, #303f9f 30%, #1976d2 90%)",
              boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              <Typography>Đang xử lý...</Typography>
            </Box>
          ) : (
            "Nhận diện & Dịch"
          )}
        </Button>

        {/* Flashcard List */}
        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" color="text.primary">
                Flashcards của bạn
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {flashcards.length} từ vựng
              </Typography>
            </Box>

            <List sx={{ p: 0 }}>
              {flashcards.map((card) => (
                <Cards
                  key={card.id}
                  card={card}
                  onRemove={handleRemoveFlashcard}
                />
              ))}
            </List>

            {/* Save All Flashcards Button */}
            {flashcards.length > 0 && (
              <Button
                variant="outlined"
                fullWidth
                startIcon={<SaveAltIcon />}
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  py: 1,
                  textTransform: "none",
                  borderColor: "#3f51b5",
                  color: "#3f51b5",
                  "&:hover": {
                    borderColor: "#303f9f",
                    bgcolor: "rgba(63, 81, 181, 0.04)",
                  },
                }}
              >
                Lưu tất cả Flashcards
              </Button>
            )}
          </Box>
        )}
      </Paper>

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ top: "80px !important" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Snaplang;
