import { useState } from "react";
import HeaderUser from "../../components/layout/HeaderUser";
import Sidebar from "../../components/Layout/SideBar";

function Flashcard() {
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

        <div className="text-2xl font-semibold mt-[60px]">Flashcard</div>
      </div>
    </div>
  );
}

export default Flashcard;
