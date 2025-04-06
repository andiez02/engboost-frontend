import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  CheckCircle as MuiCheckCircleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatDuration } from '../../utils/formatter';

const CourseCardUser = ({ course, isRegistered }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigateToVideo = () => {
    navigate(`/my_course/${course._id}/video`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        border: '1px solid',
        borderColor: isRegistered
          ? alpha(theme.palette.success.main, 0.3)
          : alpha(theme.palette.divider, 0.1),
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box
        className="course-thumbnail"
        sx={{
          position: 'relative',
          paddingTop: '56.25%', // 16:9 aspect ratio
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          overflow: 'hidden',
        }}
      >
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

        <Box
          className="play-button"
          onClick={handleNavigateToVideo}
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

        <Chip
          icon={<AccessTimeIcon fontSize="small" />}
          label={formatDuration(course.video_duration)}
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
          <Button
            variant="contained"
            color={isRegistered ? 'success' : 'primary'}
            fullWidth
            onClick={handleNavigateToVideo}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              py: 1,
              fontWeight: 600,
              boxShadow: isRegistered
                ? '0 4px 10px rgba(76, 175, 80, 0.2)'
                : 'none',
            }}
            startIcon={isRegistered ? <MuiCheckCircleIcon /> : null}
          >
            {isRegistered ? 'Học ngay' : 'Xem chi tiết'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCardUser;
