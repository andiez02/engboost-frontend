import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  //   const currentUser = useSelector(selectCurrentUser);
  //   if (currentUser) {
  //     return <Navigate to="/" replace={true} />;
  //   }

  return (
    <div>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </div>
  );
}

export default Auth;
