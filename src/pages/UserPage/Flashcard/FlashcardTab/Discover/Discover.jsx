import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  CircularProgress,
  Avatar,
  Stack,
  alpha,
} from '@mui/material';
import { FolderOutlined, Language, School, People } from '@mui/icons-material';
import { getPublicFoldersAPI } from '../../../../../apis';
import PublicFolderDetailModal from './PublicFolderDetailModal';

function Discover() {
  const [publicFolders, setPublicFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    const fetchPublicFolders = async () => {
      try {
        setIsLoading(true);
        const response = await getPublicFoldersAPI();
        setPublicFolders(response.folders || []);
      } catch (error) {
        console.error('Error fetching public folders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicFolders();
  }, []);

  const handleViewFolder = (folder) => {
    setSelectedFolder(folder);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedFolder(null);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: '#1e293b',
            mb: 1,
          }}
        >
          Khám phá Flashcards
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#64748b',
            maxWidth: '600px',
          }}
        >
          Khám phá và học tập từ các bộ flashcards được chia sẻ bởi cộng đồng
        </Typography>
      </Box>

      {/* Public Folders Grid */}
      <Grid container spacing={3}>
        {publicFolders.map((folder) => (
          <Grid item xs={12} sm={6} md={4} key={folder._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                },
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  height: 160,
                  background: `linear-gradient(135deg, ${alpha(
                    '#6366F1',
                    0.1
                  )} 0%, ${alpha('#8B5CF6', 0.1)} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: alpha('#6366F1', 0.1),
                  }}
                />
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: alpha('#6366F1', 0.2),
                    color: '#6366F1',
                    zIndex: 1,
                  }}
                >
                  <FolderOutlined sx={{ fontSize: 32 }} />
                </Avatar>
              </CardMedia>

              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 600,
                        color: '#1e293b',
                        mb: 1,
                      }}
                    >
                      {folder.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        icon={<Language />}
                        label="Công khai"
                        size="small"
                        sx={{
                          bgcolor: alpha('#6366F1', 0.1),
                          color: '#6366F1',
                          fontWeight: 500,
                        }}
                      />
                      <Chip
                        icon={<School />}
                        label={`${folder.flashcard_count || 0} từ vựng`}
                        size="small"
                        sx={{
                          bgcolor: alpha('#8B5CF6', 0.1),
                          color: '#8B5CF6',
                          fontWeight: 500,
                        }}
                      />
                    </Stack>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleViewFolder(folder)}
                    sx={{
                      borderRadius: '12px',
                      textTransform: 'none',
                      py: 1.5,
                      fontWeight: 500,
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Xem Flashcards
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {!isLoading && publicFolders.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 2,
          }}
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: alpha('#6366F1', 0.1),
              color: '#6366F1',
              mx: 'auto',
              mb: 2,
            }}
          >
            <People sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#1e293b',
              mb: 1,
            }}
          >
            Chưa có folder công khai nào
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              maxWidth: '400px',
              mx: 'auto',
            }}
          >
            Hãy quay lại sau để xem các bộ flashcards được chia sẻ bởi cộng đồng
          </Typography>
        </Box>
      )}

      {/* Detail Modal */}
      <PublicFolderDetailModal
        open={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        folder={selectedFolder}
      />
    </Container>
  );
}

export default Discover;
