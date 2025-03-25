import { useState } from "react";
import HeaderUser from "../../../components/layout/HeaderUser";
import Sidebar from "../../../components/Layout/SideBar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/userSlice";
import { Avatar } from "@mui/material";
import UserCourseOverview from "../../../components/UserCourse/UserCourseOverView";
import UserFlashcardOverview from "../../../components/UserFlashcard/UserFlashcardOverview";
import LearningProgress from "../../../components/LearningProgress/LearningProgress";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentUser = useSelector(selectCurrentUser);
  return (
    <div
      className="flex"
      style={{
        backgroundColor: "#FDFAF6",
      }}
    >
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className={`flex-1 transition-all duration-300  ${
          isSidebarOpen ? "ml-68" : "ml-20"
        } p-6`}
      >
        <HeaderUser
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="text-2xl min-h-screen font-semibold mt-[60px]">
          <div className="flex items-center">
            <Avatar
              sx={{ width: 48, height: 48, mr: 2, cursor: "pointer" }}
              src={currentUser?.user?.avatar}
            />
            <div>
              <span className="font-medium">Xin chào, </span>{" "}
              <span className="font-medium">{currentUser?.user?.username}</span>
              <p className="font-light text-base">
                Cùng Engboost tiến bộ mỗi ngày!
              </p>
            </div>
          </div>

          <div className="min-h-50 flex w-full mt-5 pt-6 border-t-[0.5px] border-gray-400">
            <div className="w-[70%]">
              <div>
                <UserCourseOverview />
              </div>
              <div className="mt-10">
                <UserFlashcardOverview />
              </div>
            </div>
            <div className="w-[30%]">
              <LearningProgress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
