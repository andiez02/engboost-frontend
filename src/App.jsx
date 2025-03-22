import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./utils/constants.js";

import NotFound from "./pages/404/NotFound.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import AccountVerification from "./pages/Auth/AccountVerification.jsx";
import Home from "./pages/GeneralPage/Home.jsx";
import Course from "./pages/GeneralPage/Course.jsx";
import Blog from "./pages/GeneralPage/Blog.jsx";
import Dashboard from "./pages/UserPage/Dashboard.jsx";
import Flashcard from "./pages/UserPage/Flashcard.jsx";
import MyCourse from "./pages/UserPage/MyCourse.jsx";

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

      {/* Dashboard Page */}
      <Route path={routes.DASHBOARD} element={<Dashboard />} />
      {/* Flashcard Page */}
      <Route path={routes.FLASHCARD} element={<Flashcard />} />
      {/* My Course Page */}
      <Route path={routes.MY_COURSE} element={<MyCourse />} />

      {/* Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
