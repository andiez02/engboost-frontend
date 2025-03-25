import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { routes } from "./utils/constants.js";

import NotFound from "./pages/404/NotFound.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import AccountVerification from "./pages/Auth/AccountVerification.jsx";
import Home from "./pages/GeneralPage/Home.jsx";
import Course from "./pages/GeneralPage/Course.jsx";
import Blog from "./pages/GeneralPage/Blog.jsx";
import Dashboard from "./pages/UserPage/Dashboard/Dashboard.jsx";
import Flashcard from "./pages/UserPage/Flashcard/Flashcard.jsx";
import MyCourse from "./pages/UserPage/MyCourse/MyCourse.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./redux/user/userSlice.js";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminSettings from "./pages/AdminSettings/AdminSettings.jsx";

const ProtectedRoute = ({ user, allowedRoles }) => {
  if (!user) return <Navigate to="/login" replace={true} />;
  if (!allowedRoles.includes(user.role)) {
    return user.role === "ADMIN" ? (
      <Navigate to="/admin/dashboard" replace={true} />
    ) : (
      <Navigate to="/home" replace={true} />
    );
  }
  return <Outlet />;
};

function App() {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <Routes>
      {/* Redirect Route */}
      <Route
        path={routes.DEFAULT}
        element={
          currentUser?.user?.role === "ADMIN" ? (
            <Navigate to="/admin/dashboard" replace={true} />
          ) : (
            <Navigate to="/home" replace={true} />
          )
        }
      />

      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />

      {/* Public Pages */}
      <Route path={routes.HOME} element={<Home />} />
      <Route path={routes.COURSE} element={<Course />} />
      <Route path={routes.BLOG} element={<Blog />} />

      {/* Protected Routes for CLIENT */}
      <Route
        element={
          <ProtectedRoute user={currentUser?.user} allowedRoles={["CLIENT"]} />
        }
      >
        <Route path={routes.DASHBOARD} element={<Dashboard />} />
        <Route path={routes.FLASHCARD} element={<Flashcard />} />
        <Route path={routes.MY_COURSE} element={<MyCourse />} />
        <Route path="/settings/account" element={<Settings />} />
        <Route path="/settings/security" element={<Settings />} />
        <Route path="/flashcard/flashcard_sets" element={<Flashcard />} />
        <Route path="/flashcard/folders" element={<Flashcard />} />
        <Route path="/flashcard/snaplang" element={<Flashcard />} />
      </Route>

      {/* Protected Routes for ADMIN */}
      <Route
        element={
          <ProtectedRoute user={currentUser?.user} allowedRoles={["ADMIN"]} />
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/settings/account" element={<AdminSettings />} />
        <Route path="/admin/settings/security" element={<AdminSettings />} />
      </Route>

      {/* Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
