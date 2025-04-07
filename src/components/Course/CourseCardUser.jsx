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
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
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
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        position: 'relative',
        border: isRegistered
          ? `1px solid ${alpha(theme.palette.success.main, 0.2)}`
          : 'none',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 10px 16px rgba(0,0,0,0.12)',
          '& .play-overlay': {
            opacity: 1,
          },
        },
      }}
    >
      {/* Thumbnail Container */}
      <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
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
          }}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Play Button Overlay */}
        <Box
          className="play-overlay"
          onClick={handleNavigateToVideo}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            <PlayArrowIcon
              sx={{ color: theme.palette.primary.main, fontSize: 28 }}
            />
          </Box>
        </Box>

        {/* Duration Chip */}
        <Chip
          icon={<AccessTimeIcon fontSize="small" />}
          label={formatDuration(course.video_duration)}
          size="small"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            zIndex: 3,
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: 'white',
            height: 24,
            '& .MuiChip-icon': {
              color: 'white',
              fontSize: 14,
            },
            '& .MuiChip-label': {
              fontSize: 12,
              padding: '0 8px',
            },
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1,
            height: 42,
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
            mb: 2,
            fontSize: '0.875rem',
            lineHeight: 1.5,
            height: 42,
          }}
        >
          {course.description}
        </Typography>

        <Button
          variant={isRegistered ? 'contained' : 'outlined'}
          color={isRegistered ? 'success' : 'primary'}
          fullWidth
          onClick={handleNavigateToVideo}
          sx={{
            mt: 'auto',
            textTransform: 'none',
            borderRadius: 1.5,
            fontWeight: 500,
            py: 0.75,
            boxShadow: isRegistered
              ? '0 2px 6px rgba(76, 175, 80, 0.2)'
              : 'none',
          }}
          startIcon={isRegistered ? <PlayArrowIcon /> : null}
        >
          {isRegistered ? 'Học ngay' : 'Xem chi tiết'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCardUser;
