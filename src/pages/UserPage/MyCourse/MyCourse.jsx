import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Skeleton,
  Button,
  Box,
  Paper,
} from '@mui/material';
import HeaderUser from '../../../components/Layout/HeaderUser';
import Sidebar from '../../../components/Layout/SideBar';
import CourseCardUser from '../../../components/Course/CourseCardUser';
import { getMyCoursesAPI } from '../../../apis';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import ExploreIcon from '@mui/icons-material/Explore';
import { routes } from '../../../utils/constants';

function MyCourse() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      fetchMyCourses();
    }
  }, [currentUser]);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const response = await getMyCoursesAPI();
      setMyCourses(response?.courses || []);
    } catch (error) {
      console.error('Error fetching my courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const EmptyCoursesHero = () => (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        borderRadius: 4,
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        mb: 6,
      }}
    >
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <SchoolIcon sx={{ fontSize: 80, color: '#5c6bc0', mb: 2 }} />

        <Typography variant="h4" component="h2" fontWeight="bold" mb={2}>
          Bắt đầu hành trình học tập của bạn
        </Typography>

        <Typography variant="body1" mb={4} color="text.secondary">
          Bạn chưa đăng ký khóa học nào. Khám phá các khóa học chất lượng cao và
          bắt đầu nâng cao kỹ năng của bạn ngay hôm nay!
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<ExploreIcon />}
          onClick={() => navigate(routes.COURSE)}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            background: 'linear-gradient(45deg, #3f51b5 30%, #7986cb 90%)',
            boxShadow: '0 3px 5px 2px rgba(63, 81, 181, .3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #303f9f 30%, #5c6bc0 90%)',
            },
          }}
        >
          Khám phá khóa học
        </Button>
      </Box>
    </Paper>
  );

  return (
    <div
      className="flex"
      style={{
        backgroundColor: '#FDFAF6',
      }}
    >
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-54' : 'ml-16'
        } p-5`}
      >
        <HeaderUser
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <Container sx={{ mt: 8, minHeight: 'calc(100vh - 16px)' }}>
          {loading ? (
            <Grid container spacing={4}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Skeleton variant="rectangular" height={200} />
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="60%" />
                </Grid>
              ))}
            </Grid>
          ) : myCourses.length === 0 ? (
            <>
              <EmptyCoursesHero />
            </>
          ) : (
            <Grid container spacing={4}>
              {myCourses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course._id}>
                  <CourseCardUser course={course} isRegistered={true} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </div>
    </div>
  );
}

export default MyCourse;
