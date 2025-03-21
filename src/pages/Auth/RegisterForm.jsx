import React from "react";
import Header from "../../components/layout/Header";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card as MuiCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Zoom from "@mui/material/Zoom";
import Alert from "@mui/material/Alert";
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from "../../utils/validator";
import FieldErrorAlert from "../../components/form/FieldErrorAlert";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import { registerUserAPI } from "../../apis";
import { toast } from "react-toastify";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitRegister = (data) => {
    const { email, password } = data;
    toast
      .promise(registerUserAPI({ email, password }), {
        pending: "Registration is on progress",
      })
      .then((data) => {
        navigate(`/login?registeredEmail=${data.user.email}`);
      });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen relative flex justify-center items-center bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 animate-gradient">
        <div className="w-[50%] min-h-[60%] absolute bottom-0 ">
          <form onSubmit={handleSubmit(submitRegister)}>
            <Zoom in={true} style={{ transitionDelay: "200ms" }}>
              <MuiCard
                sx={{
                  minHeight: "83vh",
                  borderTopLeftRadius: "26px",
                  borderTopRightRadius: "26px",
                }}
              >
                <Box sx={{ margin: "55px" }}>
                  <Box
                    sx={{
                      margin: "1em",
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <h2 className="text-4xl font-bold text-gray-800 tracking-wide relative before:absolute before:-bottom-2 before:left-1/2 before:w-0 before:h-1 before:bg-blue-500 before:transition-all before:duration-300 hover:before:w-full hover:before:left-0">
                      Đăng ký
                    </h2>
                  </Box>
                  <Box sx={{ padding: "0 1em 1em 1em" }}>
                    <Box sx={{ marginTop: "1em" }}>
                      <TextField
                        // autoComplete="nope"
                        autoFocus
                        fullWidth
                        label="Nhập Email..."
                        type="text"
                        variant="outlined"
                        error={!!errors["email"]}
                        {...register("email", {
                          required: FIELD_REQUIRED_MESSAGE,
                          pattern: {
                            value: EMAIL_RULE,
                            message: EMAIL_RULE_MESSAGE,
                          },
                        })}
                      />
                      <FieldErrorAlert errors={errors} fieldName={"email"} />
                    </Box>
                    <Box sx={{ marginTop: "1em" }}>
                      <TextField
                        fullWidth
                        label="Nhập mật khẩu..."
                        type="password"
                        variant="outlined"
                        error={!!errors["password"]}
                        {...register("password", {
                          required: FIELD_REQUIRED_MESSAGE,
                          pattern: {
                            value: PASSWORD_RULE,
                            message: PASSWORD_RULE_MESSAGE,
                          },
                        })}
                      />
                      <FieldErrorAlert errors={errors} fieldName={"password"} />
                    </Box>
                    <Box sx={{ marginTop: "1em" }}>
                      <TextField
                        fullWidth
                        label="Xác nhận mật khẩu"
                        type="password"
                        variant="outlined"
                        {...register("password_confirmation", {
                          validate: (value) => {
                            if (value === watch("password")) return true;
                            return "Password Comfirmation does not match";
                          },
                        })}
                      />
                    </Box>
                    <FieldErrorAlert
                      errors={errors}
                      fieldName={"password_confirmation"}
                    />
                  </Box>

                  <CardActions sx={{ padding: "0 1em 1em 1em" }}>
                    <Button
                      className="interceptor-loading"
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      Đăng ký
                    </Button>
                  </CardActions>
                  <Box sx={{ padding: "0 1em 1em 1em", textAlign: "center" }}>
                    <Typography>Đã có tài khoản?</Typography>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          color: "primary.main",
                          "&:hover": { color: "#ffbb39" },
                        }}
                      >
                        Đăng nhập
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

export default RegisterForm;
