import React, { useEffect } from 'react';
import Header from '../../components/Layout/Header';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Zoom from '@mui/material/Zoom';
import Alert from '@mui/material/Alert';
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from '../../utils/validator';
import FieldErrorAlert from '../../components/Form/FieldErrorAlert';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../../components/Layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUserAPI } from '../../redux/user/userSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [searchParams] = useSearchParams();
  const registeredEmail = searchParams.get('registeredEmail');
  const verifiedEmail = searchParams.get('verifiedEmail');

  // Xử lý chuyển hướng sau khi đăng nhập thành công
  useEffect(() => {
    // Kiểm tra chi tiết hơn về currentUser
    if (currentUser && Object.keys(currentUser).length > 0) {
      console.log('Đã đăng nhập, kiểm tra chuyển hướng...');
      // Kiểm tra xem có URL chuyển hướng không
      const redirectUrl = localStorage.getItem('redirectAfterLogin');
      console.log('URL chuyển hướng:', redirectUrl);

      if (redirectUrl) {
        // Xóa URL chuyển hướng khỏi localStorage
        localStorage.removeItem('redirectAfterLogin');
        console.log('Chuyển hướng đến:', redirectUrl);
        // Chuyển hướng đến URL đã lưu
        navigate(redirectUrl);
      } else {
        // Nếu không có URL chuyển hướng, chuyển đến trang chủ
        console.log('Không có URL chuyển hướng, về trang chủ');
        navigate('/');
      }
    }
  }, [currentUser, navigate]);

  const submitLogIn = async (data) => {
    try {
      const { email, password } = data;
      const result = await dispatch(loginUserAPI({ email, password })).unwrap();

      if (result.message) {
        toast.success(result.message);
      }

      // Kiểm tra chuyển hướng ngay sau khi đăng nhập thành công
      const redirectUrl = localStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectUrl);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      // Toast error đã được xử lý trong interceptor
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen relative flex justify-center items-center bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 animate-gradient">
        <div className="w-full md:w-[50%] min-h-[60%] absolute bottom-0 pt-[80px] md:pt-[20px]">
          <form onSubmit={handleSubmit(submitLogIn)}>
            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
              <MuiCard
                sx={{
                  minHeight: { xs: 'calc(100vh - 80px)', md: '83vh' },
                  borderTopLeftRadius: '26px',
                  borderTopRightRadius: '26px',
                  marginTop: { xs: '20px', md: '0' },
                }}
              >
                <Box sx={{ margin: { xs: '20px', md: '55px' } }}>
                  <Box
                    sx={{
                      margin: '1em',
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 1,
                    }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-wide relative before:absolute before:-bottom-2 before:left-1/2 before:w-0 before:h-1 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full hover:before:left-0">
                      Đăng nhập
                    </h2>
                  </Box>
                  <Box
                    sx={{
                      marginTop: '1em',
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      padding: '0 1em',
                    }}
                  >
                    {/* Hiển thị thông báo chuyển hướng nếu có */}
                    {localStorage.getItem('redirectAfterLogin') && (
                      <Alert
                        severity="info"
                        sx={{
                          '.MuiAlert-message': { overflow: 'hidden' },
                          fontSize: { xs: '0.875rem', md: '1rem' },
                          marginBottom: '1em',
                        }}
                      >
                        Vui lòng đăng nhập để đăng ký khóa học. Bạn sẽ được
                        chuyển hướng trở lại sau khi đăng nhập thành công.
                      </Alert>
                    )}

                    {verifiedEmail && (
                      <Alert
                        severity="success"
                        sx={{
                          '.MuiAlert-message': { overflow: 'hidden' },
                          fontSize: { xs: '0.875rem', md: '1rem' },
                        }}
                      >
                        Your email&nbsp;
                        <Typography
                          variant="span"
                          sx={{
                            fontWeight: 'bold',
                            '&:hover': { color: '#fdba26' },
                          }}
                        >
                          {verifiedEmail} {''}
                        </Typography>
                        Email của bạn đã được xác minh. Bây giờ bạn có thể đăng
                        nhập để tận hưởng dịch vụ của chúng tôi! Chúc bạn một
                        ngày tốt lành!
                      </Alert>
                    )}
                    {registeredEmail && (
                      <Alert
                        severity="info"
                        sx={{
                          '.MuiAlert-message': { overflow: 'hidden' },
                          fontSize: { xs: '0.875rem', md: '1rem' },
                        }}
                      >
                        Một email đã được gửi đến {''}
                        <Typography
                          variant="span"
                          sx={{
                            fontWeight: 'bold',
                            '&:hover': { color: '#fdba26' },
                          }}
                        >
                          {registeredEmail}
                        </Typography>
                        <br />
                        Vui lòng kiểm tra và xác minh tài khoản của bạn trước
                        khi đăng nhập!
                      </Alert>
                    )}
                  </Box>
                  <Box sx={{ padding: '0 1em 1em 1em' }}>
                    <Box sx={{ marginTop: '1em' }}>
                      <TextField
                        autoFocus
                        fullWidth
                        label="Nhập Email..."
                        type="text"
                        variant="outlined"
                        error={!!errors['email']}
                        {...register('email', {
                          required: FIELD_REQUIRED_MESSAGE,
                          pattern: {
                            value: EMAIL_RULE,
                            message: EMAIL_RULE_MESSAGE,
                          },
                        })}
                      />
                      <FieldErrorAlert errors={errors} fieldName={'email'} />
                    </Box>
                    <Box sx={{ marginTop: '1em' }}>
                      <TextField
                        fullWidth
                        label="Nhập mật khẩu..."
                        type="password"
                        variant="outlined"
                        error={!!errors['password']}
                        {...register('password', {
                          required: FIELD_REQUIRED_MESSAGE,
                          pattern: {
                            value: PASSWORD_RULE,
                            message: PASSWORD_RULE_MESSAGE,
                          },
                        })}
                      />
                      <FieldErrorAlert errors={errors} fieldName={'password'} />
                    </Box>
                  </Box>
                  <CardActions sx={{ padding: '0 1em 1em 1em' }}>
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{
                        height: { xs: '44px', md: '48px' },
                        fontSize: { xs: '0.875rem', md: '1rem' },
                      }}
                    >
                      Đăng nhập
                    </Button>
                  </CardActions>
                  <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
                    <Typography
                      sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                    >
                      New to EngBoost?
                    </Typography>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      <Typography
                        sx={{
                          color: 'primary.main',
                          '&:hover': { color: '#ffbb39' },
                          fontSize: { xs: '0.875rem', md: '1rem' },
                        }}
                      >
                        Create account!
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              </MuiCard>
            </Zoom>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
