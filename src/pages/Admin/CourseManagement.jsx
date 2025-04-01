import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  Tooltip,
  Chip,
  Stack,
  Paper,
  InputAdornment,
  FormControlLabel,
  Switch,
  Divider,
  useTheme,
  alpha,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  PlayCircle as PlayCircleIcon,
  School as SchoolIcon,
  AttachMoney as MoneyIcon,
  Public as PublicIcon,
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
  VideoLibrary as VideoLibraryIcon,
  Compress as CompressIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

// Mock data - replace with actual API data later
const mockCourses = [
  {
    id: 1,
    title: 'IELTS Speaking Masterclass',
    description:
      'Học cách nói tiếng Anh tự tin và trôi chảy với các kỹ thuật IELTS Speaking',
    thumbnail:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://example.com/video1.mp4',
    duration: '8 giờ',
    level: 'Intermediate',
    price: '599.000đ',
    isPublished: true,
    createdAt: '2024-03-15',
    updatedAt: '2024-03-20',
  },
  {
    id: 2,
    title: 'TOEIC Reading Comprehension',
    description: 'Cải thiện kỹ năng đọc hiểu TOEIC với các bài tập thực hành',
    thumbnail:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://example.com/video2.mp4',
    duration: '6 giờ',
    level: 'Beginner',
    price: '499.000đ',
    isPublished: false,
    createdAt: '2024-03-14',
    updatedAt: '2024-03-19',
  },
  {
    id: 3,
    title: 'Business English Writing',
    description: 'Học viết email và tài liệu tiếng Anh chuyên nghiệp',
    thumbnail:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://example.com/video3.mp4',
    duration: '5 giờ',
    level: 'Advanced',
    price: '699.000đ',
    isPublished: true,
    createdAt: '2024-03-13',
    updatedAt: '2024-03-18',
  },
  {
    id: 4,
    title: 'English Pronunciation Guide',
    description: 'Cải thiện phát âm tiếng Anh với các bài tập thực hành',
    thumbnail:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://example.com/video4.mp4',
    duration: '4 giờ',
    level: 'Beginner',
    price: '399.000đ',
    isPublished: true,
    createdAt: '2024-03-12',
    updatedAt: '2024-03-17',
  },
  {
    id: 5,
    title: 'Academic English Writing',
    description: 'Học viết luận văn và báo cáo học thuật bằng tiếng Anh',
    thumbnail:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://example.com/video5.mp4',
    duration: '7 giờ',
    level: 'Advanced',
    price: '799.000đ',
    isPublished: false,
    createdAt: '2024-03-11',
    updatedAt: '2024-03-16',
  },
  {
    id: 6,
    title: 'English Conversation Practice',
    description: 'Thực hành giao tiếp tiếng Anh với các tình huống thực tế',
    thumbnail:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://example.com/video6.mp4',
    duration: '5 giờ',
    level: 'Intermediate',
    price: '499.000đ',
    isPublished: true,
    createdAt: '2024-03-10',
    updatedAt: '2024-03-15',
  },
];

function CourseManagement() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    thumbnail: '',
    videoUrl: '',
    duration: '',
    price: '',
    isPublished: false,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setCourseForm(course);
    setThumbnailPreview(course.thumbnail);
    setVideoPreview(course.videoUrl);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setDeleteDialogOpen(true);
  };

  const handleAddClick = () => {
    setSelectedCourse(null);
    setCourseForm({
      title: '',
      description: '',
      thumbnail: '',
      videoUrl: '',
      duration: '',
      price: '',
      isPublished: false,
    });
    setThumbnailPreview(null);
    setVideoPreview(null);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedCourse(null);
    setCourseForm({
      title: '',
      description: '',
      thumbnail: '',
      videoUrl: '',
      duration: '',
      price: '',
      isPublished: false,
    });
    setThumbnailPreview(null);
    setVideoPreview(null);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setSelectedCourse(null);
  };

  const handleFormChange = (e) => {
    const { name, value, checked } = e.target;
    setCourseForm((prev) => ({
      ...prev,
      [name]: name === 'isPublished' ? checked : value,
    }));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnailPreview(reader.result);
          setCourseForm((prev) => ({ ...prev, thumbnail: reader.result }));
        };
        reader.readAsDataURL(file);
      } else {
        alert('Vui lòng chọn file ảnh');
      }
    }
  };

  const compressVideo = async (file) => {
    // Giả lập quá trình nén video
    setIsCompressing(true);
    setCompressionProgress(0);

    // Tăng progress từ 0 đến 100 trong 2 giây
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setCompressionProgress(i);
    }

    setIsCompressing(false);
    setCompressionProgress(0);
    return file; // Trong thực tế sẽ trả về file đã nén
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        // Kiểm tra kích thước file
        if (file.size > 500 * 1024 * 1024) {
          // 500MB
          alert('File video quá lớn. Vui lòng nén video trước khi upload.');
          return;
        }

        try {
          // Nén video trước khi upload
          const compressedFile = await compressVideo(file);

          const reader = new FileReader();
          reader.onloadend = () => {
            const videoUrl = reader.result;
            setVideoPreview(videoUrl);
            setCourseForm((prev) => ({ ...prev, videoUrl }));

            // Create a video element to get duration
            const video = document.createElement('video');
            video.src = videoUrl;
            video.onloadedmetadata = () => {
              const durationInSeconds = video.duration;
              const hours = Math.floor(durationInSeconds / 3600);
              const minutes = Math.floor((durationInSeconds % 3600) / 60);

              let durationString = '';
              if (hours > 0) {
                durationString += `${hours} giờ `;
              }
              if (minutes > 0) {
                durationString += `${minutes} phút`;
              }

              setCourseForm((prev) => ({ ...prev, duration: durationString }));
            };
          };
          reader.readAsDataURL(compressedFile);
        } catch (error) {
          console.error('Error compressing video:', error);
          alert('Có lỗi xảy ra khi xử lý video. Vui lòng thử lại.');
        }
      } else {
        alert('Vui lòng chọn file video');
      }
    }
  };

  const handleEditSubmit = () => {
    // Handle edit submission
    console.log('Saving course:', courseForm);
    handleEditClose();
  };

  const handleDeleteConfirm = () => {
    // Handle delete confirmation
    handleDeleteClose();
  };

  const filteredCourses = mockCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Search and Add Button */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Tìm kiếm khóa học..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          sx={{ minWidth: 160 }}
        >
          Thêm khóa học
        </Button>
      </Box>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 20px 40px ${alpha(
                    theme.palette.common.black,
                    0.12
                  )}`,
                },
                borderRadius: 3,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                position: 'relative',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={course.thumbnail}
                  alt={course.title}
                  sx={{
                    objectFit: 'cover',
                    aspectRatio: '16/9',
                    width: '100%',
                    height: '180px',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                {/* Overlay gradient */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }}
                />
                {/* Status badge */}
                <Chip
                  label={course.isPublished ? 'Đã xuất bản' : 'Chưa xuất bản'}
                  color={course.isPublished ? 'success' : 'warning'}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    height: 24,
                    backdropFilter: 'blur(4px)',
                    backgroundColor: course.isPublished
                      ? alpha(theme.palette.success.main, 0.9)
                      : alpha(theme.palette.warning.main, 0.9),
                    color: '#fff',
                    '& .MuiChip-label': { px: 1.5, fontWeight: 500 },
                  }}
                />
                {/* Action buttons */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(course)}
                    sx={{
                      bgcolor: alpha(theme.palette.background.paper, 0.9),
                      backdropFilter: 'blur(4px)',
                      '&:hover': {
                        bgcolor: theme.palette.primary.main,
                        '& svg': { color: '#fff' },
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(course)}
                    sx={{
                      bgcolor: alpha(theme.palette.background.paper, 0.9),
                      backdropFilter: 'blur(4px)',
                      '&:hover': {
                        bgcolor: theme.palette.error.main,
                        '& svg': { color: '#fff' },
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <CardContent
                sx={{
                  flexGrow: 1,
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.4,
                    mb: 0.5,
                  }}
                >
                  {course.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.6,
                    fontSize: '0.875rem',
                    flex: 1,
                  }}
                >
                  {course.description}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PlayCircleIcon
                        fontSize="small"
                        sx={{ color: 'primary.main' }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {course.duration}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MoneyIcon
                        fontSize="small"
                        sx={{ color: 'success.main' }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: 'success.main',
                        }}
                      >
                        {course.price}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      pt: 2,
                      borderTop: `1px solid ${alpha(
                        theme.palette.divider,
                        0.1
                      )}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      Cập nhật:{' '}
                      {new Date(course.updatedAt).toLocaleDateString('vi-VN')}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit/Add Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleEditClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle>
          {selectedCourse ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Tiêu đề"
              name="title"
              value={courseForm.title}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              label="Mô tả"
              name="description"
              value={courseForm.description}
              onChange={handleFormChange}
              fullWidth
              multiline
              rows={4}
              required
            />

            {/* Thumbnail Upload */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Ảnh thumbnail
              </Typography>
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                {thumbnailPreview ? (
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        width: '100%',
                        position: 'relative',
                        paddingTop: '56.25%', // 16:9 Aspect Ratio
                        overflow: 'hidden',
                        borderRadius: 2,
                      }}
                    >
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'background.paper' },
                      }}
                      onClick={() => {
                        setThumbnailPreview(null);
                        setCourseForm((prev) => ({ ...prev, thumbnail: '' }));
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="thumbnail-upload"
                      type="file"
                      onChange={handleThumbnailUpload}
                    />
                    <label htmlFor="thumbnail-upload">
                      <Button
                        component="span"
                        startIcon={<ImageIcon />}
                        variant="outlined"
                      >
                        Chọn ảnh thumbnail
                      </Button>
                    </label>
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      Hỗ trợ: JPG, PNG, GIF (Tỷ lệ 16:9)
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Video Upload */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Video bài giảng
              </Typography>
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                {videoPreview ? (
                  <Box sx={{ position: 'relative' }}>
                    <video
                      src={videoPreview}
                      controls
                      style={{
                        maxWidth: '100%',
                        maxHeight: 200,
                        borderRadius: 8,
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'background.paper' },
                      }}
                      onClick={() => {
                        setVideoPreview(null);
                        setCourseForm((prev) => ({
                          ...prev,
                          videoUrl: '',
                          duration: '',
                        }));
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ) : (
                  <Box>
                    <input
                      accept="video/*"
                      style={{ display: 'none' }}
                      id="video-upload"
                      type="file"
                      onChange={handleVideoUpload}
                    />
                    <label htmlFor="video-upload">
                      <Button
                        component="span"
                        startIcon={<VideoLibraryIcon />}
                        variant="outlined"
                        disabled={isCompressing}
                      >
                        {isCompressing
                          ? 'Đang nén video...'
                          : 'Chọn video bài giảng'}
                      </Button>
                    </label>
                    {isCompressing && (
                      <Box sx={{ mt: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={compressionProgress}
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          Đang nén video: {compressionProgress}%
                        </Typography>
                      </Box>
                    )}
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      Hỗ trợ: MP4, WebM, Ogg (Tối đa 500MB)
                    </Typography>
                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'center',
                      }}
                    >
                      <Chip
                        icon={<CompressIcon />}
                        label="Tự động nén"
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        icon={<SpeedIcon />}
                        label="Tối ưu tốc độ"
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Thời lượng"
                name="duration"
                value={courseForm.duration}
                onChange={handleFormChange}
                fullWidth
                required
                disabled
                helperText="Thời lượng được tự động tính từ độ dài video"
              />
            </Box>
            <TextField
              label="Giá"
              name="price"
              value={courseForm.price}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <FormControlLabel
              control={
                <Switch
                  checked={courseForm.isPublished}
                  onChange={handleFormChange}
                  name="isPublished"
                  color="primary"
                />
              }
              label="Xuất bản khóa học"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleEditClose}>Hủy</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            {selectedCourse ? 'Lưu thay đổi' : 'Thêm khóa học'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle>Xác nhận xóa khóa học</DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Typography>
            Bạn có chắc chắn muốn xóa khóa học "{selectedCourse?.title}"?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleDeleteClose}>Hủy</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CourseManagement;
