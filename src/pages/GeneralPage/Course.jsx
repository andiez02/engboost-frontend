import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Dialog,
  DialogContent,
  Chip,
  Box,
  IconButton,
  useTheme,
  alpha,
  Divider,
  Paper,
  Skeleton,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  Close as CloseIcon,
  CalendarToday as CalendarTodayIcon,
  School as SchoolIcon,
  CheckCircle as MuiCheckCircleIcon,
} from '@mui/icons-material';
import {
  getMyCoursesAPI,
  getPublicCoursesAPI,
  registerCourseAPI,
} from '../../apis';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../utils/constants';
import { CheckCircle, RefreshCwIcon } from 'lucide-react';

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const Course = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [courses, setCourses] = useState([]);
  const [myCoursesIds, setMyCoursesIds] = useState([]); // Lưu ID các khóa học đã đăng ký
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await getPublicCoursesAPI();
      const publicCourses = response?.courses || [];

      if (currentUser) {
        try {
          const myCoursesResponse = await getMyCoursesAPI();
          const myCourses = myCoursesResponse?.courses || [];

          // Lưu danh sách ID khóa học đã đăng ký
          const registeredIds = myCourses.map((course) => course._id);
          setMyCoursesIds(registeredIds);

          // Đánh dấu các khóa học đã đăng ký trong danh sách công khai
          const enhancedCourses = publicCourses.map((course) => ({
            ...course,
            isRegistered: registeredIds.includes(course._id),
          }));

          setCourses(enhancedCourses);
        } catch (error) {
          console.error('Error fetching registered courses:', error);
          // Nếu có lỗi khi lấy khóa học đã đăng ký, vẫn hiển thị khóa học công khai
          setCourses(publicCourses);
        }
      } else {
        setCourses(publicCourses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRegisterCourse = async (courseId) => {
    // Kiểm tra đăng nhập trước khi đăng ký
    if (!currentUser) {
      // Lưu URL hiện tại vào localStorage để sau khi đăng nhập có thể quay lại
      localStorage.setItem('redirectAfterLogin', location.pathname);

      // Đóng modal nếu đang mở
      handleCloseModal();

      // Hiển thị thông báo
      toast.info('Vui lòng đăng nhập để đăng ký khóa học');

      // Chuyển hướng đến trang đăng nhập
      navigate('/login');
      return;
    }

    try {
      const response = await registerCourseAPI(courseId);
      toast.success(response?.message || 'Đăng ký khóa học thành công');

      // Cập nhật trạng thái đăng ký trong state
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId ? { ...course, isRegistered: true } : course
        )
      );

      // Thêm ID khóa học vào danh sách đã đăng ký
      setMyCoursesIds((prev) => [...prev, courseId]);

      // Nếu đang mở modal, cập nhật selectedCourse
      if (selectedCourse && selectedCourse._id === courseId) {
        setSelectedCourse({
          ...selectedCourse,
          isRegistered: true,
        });
      }
    } catch (error) {
      console.error('Error registering course:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Header />

      <Container sx={{ mb: 8, mt: 8, minHeight: 'calc(100vh - 100px)' }}>
        {/* Course Count */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography variant="h5" component="h2" fontWeight="600">
            {loading ? <Skeleton width={150} /> : ''}
          </Typography>
        </Box>

        {/* Courses Grid */}
        {loading ? (
          <Grid container spacing={4}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card
                  sx={{ height: '100%', borderRadius: 3, overflow: 'hidden' }}
                >
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" height={32} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="60%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : filteredCourses.length === 0 ? (
          <Box
            sx={{
              py: 8,
              px: 4,
              textAlign: 'center',
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
              backdropFilter: 'blur(10px)',
              border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 10px 30px ${alpha(
                theme.palette.common.black,
                0.05
              )}`,
              my: 4,
            }}
          >
            {/* Animated icon with gradient */}
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.light,
                  0.1
                )} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                mb: 3,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: -5,
                  left: -5,
                  right: -5,
                  bottom: -5,
                  borderRadius: '50%',
                  border: `2px dashed ${alpha(
                    theme.palette.primary.main,
                    0.2
                  )}`,
                  animation: 'spin 15s linear infinite',
                },
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            >
              <SchoolIcon
                sx={{
                  fontSize: 60,
                  color: theme.palette.primary.main,
                  opacity: 0.7,
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 0.5, transform: 'scale(1)' },
                    '50%': { opacity: 0.8, transform: 'scale(1.05)' },
                    '100%': { opacity: 0.5, transform: 'scale(1)' },
                  },
                }}
              />
            </Box>

            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 600,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Không tìm thấy khóa học nào
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: '500px',
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              Chúng tôi không tìm thấy khóa học nào phù hợp với tìm kiếm của
              bạn. Hãy thử điều chỉnh từ khóa hoặc quay lại sau để xem các khóa
              học mới.
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<RefreshCwIcon />}
              onClick={() => setSearchTerm && setSearchTerm('')}
              sx={{
                borderRadius: 8,
                px: 3,
                py: 1,
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: `0 4px 12px ${alpha(
                  theme.palette.primary.main,
                  0.2
                )}`,
                '&:hover': {
                  boxShadow: `0 6px 16px ${alpha(
                    theme.palette.primary.main,
                    0.3
                  )}`,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s',
              }}
            >
              Xem tất cả khóa học
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: course.isRegistered
                      ? alpha(theme.palette.success.main, 0.3)
                      : alpha(theme.palette.divider, 0.1),
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                      '& .course-thumbnail::before': {
                        opacity: 1,
                      },
                      '& .play-button': {
                        opacity: 1,
                        transform: 'translate(-50%, -50%) scale(1)',
                      },
                    },
                  }}
                >
                  {/* Registered badge */}
                  {course.isRegistered && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bgcolor: 'success.main',
                        color: 'white',
                        py: 0.5,
                        px: 1.5,
                        borderBottomLeftRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        zIndex: 10,
                      }}
                    >
                      <MuiCheckCircleIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      Đã đăng ký
                    </Box>
                  )}

                  {/* Thumbnail with play button overlay */}
                  <Box
                    className="course-thumbnail"
                    sx={{
                      position: 'relative',
                      paddingTop: '56.25%', // 16:9 aspect ratio
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      overflow: 'hidden',
                    }}
                  >
                    {/* Optimized image loading with blur-up technique */}
                    <CardMedia
                      component="img"
                      image={course.thumbnail_url || '/placeholder.jpg'}
                      alt={course.title}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                      loading="lazy"
                    />

                    {/* Gradient overlay for better text contrast */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
                        opacity: 0.8,
                        zIndex: 1,
                      }}
                    />

                    {/* Play button */}
                    <Box
                      className="play-button"
                      onClick={() => handleOpenModal(course)}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) scale(0.9)',
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        opacity: 0,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        '&:hover': {
                          transform: 'translate(-50%, -50%) scale(1)',
                          backgroundColor: 'white',
                        },
                      }}
                    >
                      <PlayCircleOutlineIcon
                        sx={{
                          fontSize: 36,
                          color: theme.palette.primary.main,
                        }}
                      />
                    </Box>

                    {/* Duration badge */}
                    <Chip
                      icon={<AccessTimeIcon fontSize="small" />}
                      label={formatDuration(Math.floor(course.video_duration))}
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        zIndex: 2,
                        backgroundColor: 'rgba(0,0,0,0.75)',
                        color: 'white',
                        backdropFilter: 'blur(4px)',
                        '& .MuiChip-icon': {
                          color: 'white',
                        },
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      component="h2"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        height: 56,
                      }}
                    >
                      {course.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 2,
                        height: 60,
                      }}
                    >
                      {course.description}
                    </Typography>

                    <Box sx={{ mt: 'auto' }}>
                      {course.isRegistered ? (
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          onClick={() => navigate(routes.MY_COURSE)}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            py: 1,
                            fontWeight: 600,
                            boxShadow: '0 4px 10px rgba(76, 175, 80, 0.2)',
                          }}
                          startIcon={<MuiCheckCircleIcon />}
                        >
                          Học ngay
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={() => handleOpenModal(course)}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            py: 1,
                            fontWeight: 600,
                          }}
                        >
                          Xem chi tiết
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Course Details Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: 'hidden',
          },
        }}
      >
        {selectedCourse && (
          <>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                image={selectedCourse.thumbnail_url || '/placeholder.jpg'}
                alt={selectedCourse.title}
                sx={{ height: { xs: 200, md: 300 }, objectFit: 'cover' }}
              />
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  backgroundColor: alpha(theme.palette.common.black, 0.5),
                  color: 'white',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.black, 0.7),
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Trạng thái đăng ký trên ảnh bìa */}
              {selectedCourse.isRegistered && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    backgroundColor: alpha(theme.palette.success.main, 0.9),
                    color: 'white',
                    py: 0.5,
                    px: 2,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    zIndex: 2,
                  }}
                >
                  <MuiCheckCircleIcon sx={{ fontSize: 18, mr: 0.5 }} />
                  <Typography variant="body2" fontWeight="bold">
                    Đã đăng ký
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  p: 3,
                  color: 'white',
                }}
              >
                <Typography variant="h5" component="h2" fontWeight="bold">
                  {selectedCourse.title}
                </Typography>
              </Box>
            </Box>

            <DialogContent sx={{ p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    Giới thiệu khóa học
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedCourse.description}
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    {!selectedCourse?.isRegistered ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<PlayCircleOutlineIcon />}
                        onClick={() => handleRegisterCourse(selectedCourse._id)}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          px: 4,
                          py: 1.5,
                          fontWeight: 600,
                        }}
                      >
                        Đăng ký khóa học
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        size="large"
                        startIcon={<PlayCircleOutlineIcon />}
                        onClick={() => {
                          handleCloseModal();
                          navigate(`${routes.MY_COURSE}`);
                        }}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          px: 4,
                          py: 1.5,
                          fontWeight: 600,
                          boxShadow: '0 4px 14px rgba(76, 175, 80, 0.3)',
                        }}
                      >
                        Học ngay
                      </Button>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      backgroundColor: alpha(
                        selectedCourse.isRegistered
                          ? theme.palette.success.light
                          : theme.palette.primary.light,
                        0.1
                      ),
                      border: '1px solid',
                      borderColor: alpha(
                        selectedCourse.isRegistered
                          ? theme.palette.success.main
                          : theme.palette.primary.main,
                        0.2
                      ),
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Thông tin khóa học
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AccessTimeIcon
                        sx={{ color: 'text.secondary', mr: 1.5 }}
                      />
                      <Typography variant="body2">
                        Thời lượng:{' '}
                        {formatDuration(selectedCourse.video_duration)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CalendarTodayIcon
                        sx={{ color: 'text.secondary', mr: 1.5 }}
                      />
                      <Typography variant="body2">
                        Ngày tạo:{' '}
                        {selectedCourse.created_at
                          ? format(
                              new Date(selectedCourse.created_at),
                              'dd MMMM yyyy',
                              { locale: vi }
                            )
                          : 'N/A'}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {selectedCourse.is_public ? (
                        <PublicIcon sx={{ color: 'text.secondary', mr: 1.5 }} />
                      ) : (
                        <LockIcon sx={{ color: 'text.secondary', mr: 1.5 }} />
                      )}
                      <Typography variant="body2">
                        Trạng thái:{' '}
                        {selectedCourse.is_public ? 'Công khai' : 'Riêng tư'}
                      </Typography>
                    </Box>

                    {/* Registration status - Show if logged in */}
                    {currentUser && (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          mt: 3,
                          pt: 2,
                          borderTop: `1px solid ${alpha(
                            theme.palette.divider,
                            0.5
                          )}`,
                        }}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            py: 1.5,
                            borderRadius: 2,
                            backgroundColor: selectedCourse.isRegistered
                              ? alpha(theme.palette.success.main, 0.1)
                              : alpha(theme.palette.grey[100], 0.5),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px dashed',
                            borderColor: selectedCourse.isRegistered
                              ? theme.palette.success.main
                              : theme.palette.grey[400],
                          }}
                        >
                          {selectedCourse.isRegistered ? (
                            <>
                              <MuiCheckCircleIcon
                                sx={{
                                  color: 'success.main',
                                  mr: 1,
                                  fontSize: 20,
                                }}
                              />
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="success.main"
                              >
                                Bạn đã đăng ký khóa học này
                              </Typography>
                            </>
                          ) : (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              align="center"
                            >
                              Bạn chưa đăng ký khóa học này
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>

      <Footer />
    </div>
  );
};

export default Course;
