import { useState } from "react";
import HeaderUser from "../../../components/layout/HeaderUser";
import Sidebar from "../../../components/Layout/SideBar";
import dotBackground from "../../../assets/user/dot-bg.svg";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className={`flex-1 fle transition-all duration-300  ${
          isSidebarOpen ? "ml-64" : "ml-16"
        } p-5`}
      >
        <HeaderUser
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div
          className="text-2xl min-h-screen font-semibold mt-[60px]"
          style={{
            backgroundImage: `url(${dotBackground})`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
        >
          Dashboard
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
