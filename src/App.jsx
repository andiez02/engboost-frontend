import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./utils/constants.js";

import Home from "./pages/Home";
import Course from "./pages/Course";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/404/NotFound.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import AccountVerification from "./pages/Auth/AccountVerification.jsx";

function App() {
  return (
    <Routes>
      {/* Redirect Route */}
      <Route
        path={routes.DEFAULT}
        element={<Navigate to="/home" replace={true} />}
      />

      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />

      {/* Home Page */}
      <Route path={routes.HOME} element={<Home />} />
      {/* Course Page */}
      <Route path={routes.COURSE} element={<Course />} />
      {/* Blog Page */}
      <Route path={routes.BLOG} element={<Blog />} />
      {/* About us Page */}
      <Route path={routes.ABOUT_US} element={<AboutUs />} />

      {/* Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
