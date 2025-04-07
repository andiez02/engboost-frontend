import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  TextField,
  useTheme,
  Card,
  CardContent,
  Chip,
  IconButton,
  alpha,
} from '@mui/material';
import {
  Chat as ChatIcon,
  School as SchoolIcon,
  Translate as TranslateIcon,
  Psychology as PsychologyIcon,
  SportsKabaddi as PracticeIcon,
  SmartToy as SmartToyIcon,
  Person as PersonIcon,
  Send as SendIcon,
  KeyboardArrowDown as ScrollIcon,
} from '@mui/icons-material';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import Lottie from 'lottie-react';
import chatbotAnimation from '../../assets/lotties/chatbot-animation.json';
import { routes } from '../../utils/constants';

const ChatbotIntro = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const chatContainerRef = useRef(null);
  const featureSectionRef = useRef(null);

  const handleStartChat = () => {
    navigate(routes.CHATBOT);
  };

  const scrollToFeatures = () => {
    featureSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sampleConversation = [
    {
      role: 'user',
      content: 'What\'s the difference between "affect" and "effect"?',
    },
    {
      role: 'assistant',
      content:
        'Great question! 👍\n\n"Affect" is usually a verb meaning "to influence": The weather affects my mood.\n\n"Effect" is typically a noun meaning "result": The medicine had a positive effect.\n\nRemember: A for Action (Affect = Verb), E for End result (Effect = Noun).',
    },
  ];

  // Lottie animation options
  const chatbotAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: chatbotAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          pt: 12,
          pb: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage:
              'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip
                label="AI-Powered Learning"
                sx={{
                  mb: 2,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 2 },
                }}
              />

              <Typography
                variant="h2"
                component="h1"
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                Học tiếng Anh thông minh với EngBoost AI
              </Typography>

              <Typography
                variant="h6"
                sx={{ mb: 4, opacity: 0.9, fontWeight: 'normal' }}
              >
                Trợ lý AI thông minh giúp bạn nâng cao kỹ năng tiếng Anh thông
                qua các cuộc hội thoại tự nhiên, giải thích ngữ pháp và từ vựng
                một cách dễ hiểu.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleStartChat}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '1rem',
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                    },
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  }}
                >
                  Bắt đầu trò chuyện
                </Button>

                <Button
                  variant="outlined"
                  onClick={scrollToFeatures}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Tìm hiểu thêm
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
              <Paper
                elevation={6}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  height: 500,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(0deg)',
                  },
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'primary.dark',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    sx={{ bgcolor: 'white', color: 'primary.main', mr: 2 }}
                  >
                    <SmartToyIcon />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="medium">
                    EngBoost AI Assistant
                  </Typography>
                </Box>

                <Box
                  ref={chatContainerRef}
                  sx={{
                    flex: 1,
                    p: 2,
                    overflowY: 'auto',
                    bgcolor: '#f8f9fa',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        mr: 1.5,
                        width: 36,
                        height: 36,
                      }}
                    >
                      <SmartToyIcon fontSize="small" />
                    </Avatar>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: 'white',
                        borderRadius: '16px 16px 16px 0',
                        maxWidth: '80%',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      }}
                    >
                      <Typography variant="body2">
                        Xin chào! Tôi là trợ lý học tiếng Anh của EngBoost. 👋
                        <br />
                        <br />
                        Tôi có thể giúp bạn:
                        <br />• Học từ vựng mới
                        <br />• Giải thích ngữ pháp
                        <br />• Dịch thuật chính xác
                        <br />• Luyện tập hội thoại
                      </Typography>
                    </Paper>
                  </Box>

                  {sampleConversation.map((message, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        justifyContent:
                          message.role === 'user' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 1.5,
                          maxWidth: '80%',
                        }}
                      >
                        {message.role === 'assistant' && (
                          <Avatar
                            sx={{
                              bgcolor: 'primary.main',
                              width: 36,
                              height: 36,
                            }}
                          >
                            <SmartToyIcon fontSize="small" />
                          </Avatar>
                        )}

                        <Paper
                          sx={{
                            p: 2,
                            bgcolor:
                              message.role === 'user'
                                ? alpha(theme.palette.primary.main, 0.9)
                                : 'white',
                            color:
                              message.role === 'user'
                                ? 'white'
                                : 'text.primary',
                            borderRadius:
                              message.role === 'user'
                                ? '16px 16px 0 16px'
                                : '16px 16px 16px 0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ whiteSpace: 'pre-wrap' }}
                          >
                            {message.content}
                          </Typography>
                        </Paper>

                        {message.role === 'user' && (
                          <Avatar
                            sx={{
                              bgcolor: theme.palette.secondary.main,
                              width: 36,
                              height: 36,
                            }}
                          >
                            <PersonIcon fontSize="small" />
                          </Avatar>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    p: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'white',
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Nhập câu hỏi của bạn..."
                    disabled
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                      },
                    }}
                  />
                  <IconButton
                    color="primary"
                    sx={{
                      ml: 1,
                      bgcolor: theme.palette.primary.main,
                      color: 'white',
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                      },
                    }}
                    onClick={handleStartChat}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <IconButton
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.1)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.2)',
            },
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 20%, 50%, 80%, 100%': {
                transform: 'translateX(-50%) translateY(0)',
              },
              '40%': {
                transform: 'translateX(-50%) translateY(-10px)',
              },
              '60%': {
                transform: 'translateX(-50%) translateY(-5px)',
              },
            },
          }}
          onClick={scrollToFeatures}
        >
          <ScrollIcon />
        </IconButton>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }} ref={featureSectionRef}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip label="Tính năng nổi bật" color="primary" sx={{ mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            Học tiếng Anh hiệu quả với AI
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            EngBoost AI cung cấp các công cụ thông minh giúp bạn học tiếng Anh
            nhanh chóng và hiệu quả
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            {
              icon: <TranslateIcon fontSize="large" />,
              title: 'Dịch thuật thông minh',
              description:
                'Dịch văn bản với ngữ cảnh chính xác, hiểu được các thành ngữ và cụm từ phức tạp',
              color: '#4CAF50',
            },
            {
              icon: <SchoolIcon fontSize="large" />,
              title: 'Giải thích ngữ pháp',
              description:
                'Hiểu rõ quy tắc ngữ pháp với ví dụ cụ thể và giải thích chi tiết dễ hiểu',
              color: '#2196F3',
            },
            {
              icon: <PsychologyIcon fontSize="large" />,
              title: 'Từ vựng & cách dùng',
              description:
                'Học từ vựng mới với định nghĩa, ví dụ và cách phát âm chuẩn xác',
              color: '#9C27B0',
            },
            {
              icon: <PracticeIcon fontSize="large" />,
              title: 'Luyện tập hội thoại',
              description:
                'Thực hành tiếng Anh qua hội thoại tự nhiên với AI thông minh, nhận phản hồi ngay lập tức',
              color: '#FF9800',
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  p: 3,
                  transition: 'all 0.3s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    borderColor: alpha(feature.color, 0.5),
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    p: 1.5,
                    borderRadius: 2,
                    mb: 2,
                    color: feature.color,
                    bgcolor: alpha(feature.color, 0.1),
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Lottie Animation Section */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 400 }}>
                <Lottie
                  animationData={chatbotAnimation}
                  style={{ width: '100%', height: '100%' }}
                  options={chatbotAnimationOptions}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Chip
                label="AI Conversation"
                color="primary"
                size="small"
                sx={{ mb: 2 }}
              />
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                Trò chuyện tự nhiên với AI
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                EngBoost AI hiểu được ngữ cảnh và ý định của bạn, tạo ra các
                cuộc hội thoại tự nhiên giúp bạn cải thiện kỹ năng giao tiếp
                tiếng Anh một cách hiệu quả.
              </Typography>

              <Box sx={{ mb: 3 }}>
                {[
                  'Phản hồi thông minh và tự nhiên',
                  'Hiểu được ngữ cảnh và ý định của người dùng',
                  'Điều chỉnh độ khó phù hợp với trình độ',
                  'Sửa lỗi ngữ pháp và phát âm',
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        color: 'white',
                        mr: 2,
                      }}
                    >
                      ✓
                    </Box>
                    <Typography variant="body1">{item}</Typography>
                  </Box>
                ))}
              </Box>

              <Button
                variant="contained"
                onClick={handleStartChat}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  fontWeight: 600,
                }}
              >
                Bắt đầu trò chuyện
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* CTA Section */}
        <Paper
          sx={{
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            borderRadius: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage:
                'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
            Sẵn sàng nâng cao kỹ năng tiếng Anh?
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, opacity: 0.9, maxWidth: 700, mx: 'auto' }}
          >
            Bắt đầu trò chuyện với EngBoost AI ngay hôm nay và trải nghiệm cách
            học tiếng Anh hiệu quả, thú vị và cá nhân hóa
          </Typography>
          <Button
            variant="contained"
            onClick={handleStartChat}
            size="large"
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 3,
              fontWeight: 600,
              fontSize: '1rem',
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              },
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            }}
          >
            Bắt đầu ngay
          </Button>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default ChatbotIntro;
