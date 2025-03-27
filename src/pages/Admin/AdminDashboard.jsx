import { useState } from "react";
import HeaderAdmin from "../../components/Layout/HeaderAdmin";
import Sidebar from "../../components/Layout/SideBar";

import ManageUsers from "./ManageUsers";
import ManageUserVocab from "./ManageUserVocab";
import ManageUserCourses from "./ManageUserCourses";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("users");

  const renderTab = () => {
    switch (activeTab) {
      case "users":
        return <ManageUsers />;
      case "vocab":
        return <ManageUserVocab />;
      case "courses":
        return <ManageUserCourses />;
      default:
        return null;
    }
  };

  return (
    <div className="flex" style={{ backgroundColor: "#FDFAF6" }}>
      <Sidebar isOpen={isSidebarOpen} isAdmin={true} setActiveTab={setActiveTab} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } p-5`}
      >
        <HeaderAdmin
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="text-2xl font-semibold mt-[60px]">
          <h2 className="mb-4">Bảng điều khiển Quản trị viên</h2>

          {/* Các nút tab */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded text-white ${
                activeTab === "users" ? "bg-blue-500" : "bg-blue-300"
              }`}
            >
              Người dùng
            </button>
            <button
              onClick={() => setActiveTab("vocab")}
              className={`px-4 py-2 rounded text-white ${
                activeTab === "vocab" ? "bg-green-500" : "bg-green-300"
              }`}
            >
              Từ vựng
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-4 py-2 rounded text-white ${
                activeTab === "courses" ? "bg-purple-500" : "bg-purple-300"
              }`}
            >
              Khóa học
            </button>
          </div>

          {/* Hiển thị nội dung tab */}
          <div className="my-8">{renderTab()}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
