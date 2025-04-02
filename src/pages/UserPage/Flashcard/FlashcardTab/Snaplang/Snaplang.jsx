import React, { useState, useRef, useCallback } from 'react';
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
  Fade,
  alpha,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TranslateIcon from '@mui/icons-material/Translate';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Cards from '../../../../../components/Card/Card';
import SaveFlashcardModal from '../../../../../components/SaveFlashcardModal/SaveFlashcardModal';
import {
  snaplangDetectAPI,
  saveFlashcardsToFolderAPI,
} from '../../../../../apis';
import { useLocation } from 'react-router-dom';

function Snaplang() {
  const location = useLocation();
  const { folderId, folderTitle } = location.state || {};
  console.log('🚀 ~ Snaplang ~ folderId:', folderId);
  console.log('🚀 ~ Snaplang ~ folderTitle:', folderTitle);

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleImageChange = useCallback((event) => {
    handleFile(event.target.files?.[0]);
  }, []);

  const handleFile = useCallback((file) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setAlert({
        open: true,
        message: 'Chỉ hỗ trợ định dạng JPEG, PNG, GIF và WEBP',
        severity: 'error',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAlert({
        open: true,
        message: 'Kích thước ảnh không được vượt quá 5MB',
        severity: 'error',
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
          message: 'Tải ảnh lên thành công',
          severity: 'success',
        });
      }, 500);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleUpload = useCallback(async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const data = await snaplangDetectAPI(formData);

      if (!data.detections || data.detections.length === 0) {
        setAlert({
          open: true,
          message: 'Không nhận diện được vật thể nào.',
          severity: 'warning',
        });
        setLoading(false);
        return;
      }

      const newFlashcards = data.detections.map((item) => ({
        id: Date.now() + Math.random(),
        imageUrl: previewUrl,
        object: item.object,
        english: item.english,
        vietnamese: item.vietnamese,
      }));

      setFlashcards((prev) => [...newFlashcards, ...prev]);

      setAlert({
        open: true,
        message: `Đã tạo ${newFlashcards.length} flashcard(s) thành công`,
        severity: 'success',
      });
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        message: 'Có lỗi xảy ra khi nhận diện ảnh',
        severity: 'error',
      });
    } finally {
      setLoading(false);
      setImage(null);
      setPreviewUrl(null);
    }
  }, [image, previewUrl]);

  const handleRemoveImage = useCallback(() => {
    setImage(null);
    setPreviewUrl(null);
  }, []);

  const handleRemoveFlashcard = useCallback((id) => {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
    setAlert({
      open: true,
      message: 'Đã xóa flashcard',
      severity: 'info',
    });
  }, []);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const triggerFileInput = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const triggerCameraInput = useCallback(() => {
    cameraInputRef.current.click();
  }, []);

  const handleCloseAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, open: false }));
  }, []);

  const saveAllFlashcards = useCallback(() => {
    if (flashcards.length === 0) {
      setAlert({
        open: true,
        message: 'Không có flashcard nào để lưu',
        severity: 'warning',
      });
      return;
    }
    setSaveModalOpen(true);
  }, [flashcards.length]);

  const handleSaveFlashcards = async (folderData) => {
    try {
      setSaving(true);

      const data = {
        create_new_folder: folderData.isNew,
        folder_id: folderData.isNew ? null : folderData.id,
        folder_title: folderData.isNew ? folderData.title : null,
        flashcards: flashcards.map((card) => ({
          english: card.english,
          vietnamese: card.vietnamese,
          imageUrl: card.imageUrl,
          object: card.object,
        })),
      };

      const response = await saveFlashcardsToFolderAPI(data);

      if (response && response.flashcards && response.flashcards.length > 0) {
        const successMessage = `Đã lưu thành công ${
          response.flashcards.length
        } flashcard vào ${
          folderData.isNew
            ? `thư mục mới "${folderData.title}"`
            : 'thư mục đã chọn'
        }`;

        setSaveModalOpen(false);

        if (folderData.onFolderUpdate && response.folder) {
          await folderData.onFolderUpdate(response.folder);
        }

        setTimeout(() => {
          setFlashcards([]);

          setTimeout(() => {
            setAlert({
              open: true,
              message: successMessage,
              severity: 'success',
            });
            setSaving(false);
          }, 500);
        }, 300);

        return true;
      } else {
        throw new Error('Không có flashcard nào được lưu. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error saving flashcards:', error);
      setAlert({
        open: true,
        message: error.message || 'Lưu flashcard thất bại. Vui lòng thử lại.',
        severity: 'error',
      });
      setSaving(false);
      return false;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box
        sx={{
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          background: '#FFFFFF',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
            p: 3,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  mr: 1.5,
                }}
              >
                <LanguageIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography
                variant="h5"
                fontWeight="700"
                sx={{ letterSpacing: '-0.01em' }}
              >
                Snaplang
              </Typography>
              <Chip
                label="Beta"
                size="small"
                sx={{
                  ml: 1.5,
                  height: 20,
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  bgcolor: 'rgba(255,255,255,0.25)',
                  color: 'white',
                  backdropFilter: 'blur(8px)',
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: '90%' }}>
              Chụp ảnh, nhận diện và học từ vựng tức thì với công nghệ AI
            </Typography>
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 0,
          }}
        >
          {/* Image Selection Area */}
          <Box
            sx={{
              position: 'relative',
              height: 260,
              width: '100%',
              mb: 3,
              borderRadius: 3,
              overflow: 'hidden',
              border: previewUrl
                ? 'none'
                : dragActive
                ? '2px dashed #8B5CF6'
                : '2px dashed #E5E7EB',
              bgcolor: previewUrl
                ? 'transparent'
                : dragActive
                ? alpha('#8B5CF6', 0.05)
                : '#F9FAFB',
              transition: 'all 0.3s ease',
              boxShadow: previewUrl ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploading && (
              <Fade in={uploading}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <CircularProgress
                    size={44}
                    thickness={4}
                    sx={{
                      mb: 2,
                      color: '#8B5CF6',
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={500}
                  >
                    Đang tải ảnh lên...
                  </Typography>
                </Box>
              </Fade>
            )}

            {previewUrl ? (
              <>
                {/* Selected Image */}
                <Box
                  sx={{
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <img
                    src={previewUrl}
                    alt="Selected"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)',
                    }}
                  />
                </Box>

                {/* Remove Image Button */}
                <Tooltip title="Xóa ảnh" arrow>
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      '&:hover': {
                        backgroundColor: '#EF4444',
                        color: 'white',
                      },
                      transition: 'all 0.2s ease',
                      zIndex: 2,
                      width: 32,
                      height: 32,
                    }}
                    onClick={handleRemoveImage}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                {/* Image Info */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 1.5,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'white',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '70%',
                      fontWeight: 500,
                    }}
                  >
                    {image?.name}
                  </Typography>
                  <Chip
                    label={`${(image?.size / 1024).toFixed(1)} KB`}
                    size="small"
                    sx={{
                      height: 20,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(4px)',
                      color: 'white',
                      fontSize: 10,
                      fontWeight: 500,
                    }}
                  />
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  p: 2,
                }}
                onClick={triggerFileInput}
              >
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: alpha('#8B5CF6', 0.1),
                    mb: 2.5,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '150%',
                      height: '15px',
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                      transform: 'rotate(-45deg)',
                      animation: 'shimmer 2s infinite',
                      '@keyframes shimmer': {
                        '0%': {
                          transform: 'translateX(-100%) rotate(-45deg)',
                        },
                        '100%': {
                          transform: 'translateX(100%) rotate(-45deg)',
                        },
                      },
                    }}
                  />
                  <PhotoCameraIcon
                    sx={{
                      fontSize: 40,
                      color: '#8B5CF6',
                    }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  color={dragActive ? '#8B5CF6' : 'text.primary'}
                  align="center"
                  fontWeight={600}
                  sx={{ mb: 1 }}
                >
                  {dragActive ? 'Thả ảnh vào đây' : 'Tải lên hình ảnh'}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mb: 3, maxWidth: '80%' }}
                >
                  Kéo thả hoặc nhấn để chọn ảnh từ thiết bị
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<PhotoLibraryIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerFileInput();
                    }}
                    sx={{
                      borderRadius: '12px',
                      textTransform: 'none',
                      px: 2,
                      py: 1,
                      borderColor: '#E5E7EB',
                      color: 'text.primary',
                      fontWeight: 500,
                      '&:hover': {
                        borderColor: '#8B5CF6',
                        backgroundColor: alpha('#8B5CF6', 0.05),
                      },
                    }}
                  >
                    Thư viện
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<CameraAltIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerCameraInput();
                    }}
                    sx={{
                      borderRadius: '12px',
                      textTransform: 'none',
                      px: 2,
                      py: 1,
                      backgroundColor: '#8B5CF6',
                      boxShadow: '0 4px 12px ' + alpha('#8B5CF6', 0.3),
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: '#7C3AED',
                      },
                    }}
                  >
                    Chụp ảnh
                  </Button>
                </Box>
              </Box>
            )}
          </Box>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: 'none' }}
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
              borderRadius: '14px',
              py: 1.8,
              textTransform: 'none',
              fontWeight: 600,
              backgroundColor:
                !previewUrl || loading || uploading ? '#E5E7EB' : '#8B5CF6',
              boxShadow:
                !previewUrl || loading || uploading
                  ? 'none'
                  : '0 8px 16px ' + alpha('#8B5CF6', 0.35),
              '&:hover': {
                backgroundColor: '#7C3AED',
                boxShadow: '0 10px 20px ' + alpha('#8B5CF6', 0.4),
              },
              transition: 'all 0.3s ease',
              letterSpacing: 0.3,
              fontSize: '1rem',
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={24} color="inherit" sx={{ mr: 1.5 }} />
                <Typography>Đang xử lý...</Typography>
              </Box>
            ) : (
              'Nhận diện & Dịch'
            )}
          </Button>

          {/* Flashcard List */}
          {flashcards.length > 0 && (
            <Fade in={flashcards.length > 0} timeout={500}>
              <Box sx={{ mt: 4 }}>
                <Divider sx={{ mb: 3 }} />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2.5,
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        background: alpha('#8B5CF6', 0.1),
                        mr: 1.5,
                      }}
                    >
                      <AutoAwesomeIcon
                        sx={{ color: '#8B5CF6', fontSize: 20 }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      color="text.primary"
                      fontWeight={600}
                    >
                      Flashcards của bạn
                    </Typography>
                  </Box>
                  <Chip
                    label={`${flashcards.length} từ vựng`}
                    size="small"
                    sx={{
                      borderRadius: '10px',
                      backgroundColor: alpha('#8B5CF6', 0.1),
                      color: '#8B5CF6',
                      fontWeight: 600,
                      px: 1,
                      height: 24,
                    }}
                  />
                </Box>

                <List
                  sx={{
                    p: 0,
                  }}
                >
                  {flashcards.map((card, index) => (
                    <Fade
                      key={card.id}
                      in={true}
                      timeout={300}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <Box>
                        <Cards card={card} onRemove={handleRemoveFlashcard} />
                      </Box>
                    </Fade>
                  ))}
                </List>

                {/* Save All Flashcards Button */}
                {flashcards.length > 0 && (
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={saving ? null : <SaveAltIcon />}
                    onClick={saveAllFlashcards}
                    disabled={saving}
                    sx={{
                      mt: 3,
                      borderRadius: '14px',
                      py: 1.5,
                      textTransform: 'none',
                      borderColor: '#E5E7EB',
                      color: saving ? '#8B5CF6' : '#6B7280',
                      fontWeight: 500,
                      '&:hover': {
                        borderColor: '#8B5CF6',
                        color: '#8B5CF6',
                        backgroundColor: alpha('#8B5CF6', 0.05),
                      },
                    }}
                  >
                    {saving ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress
                          size={24}
                          color="inherit"
                          sx={{ mr: 1.5 }}
                        />
                        <Typography>Đang lưu...</Typography>
                      </Box>
                    ) : (
                      'Lưu tất cả Flashcards'
                    )}
                  </Button>
                )}
              </Box>
            </Fade>
          )}
        </Paper>
      </Box>

      {/* Save Flashcards Modal */}
      <SaveFlashcardModal
        open={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        flashcards={flashcards}
        onSave={handleSaveFlashcards}
        initialFolderId={folderId}
        initialFolderTitle={folderTitle}
        onFolderUpdate={location.state?.onFolderUpdate}
      />

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ top: '80px !important' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          variant="filled"
          sx={{
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
            fontWeight: 500,
          }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default React.memo(Snaplang);
