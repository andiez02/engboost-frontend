import { useState } from "react";
import HeaderUser from "../../../components/layout/HeaderUser";
import Sidebar from "../../../components/Layout/SideBar";
import FlashcardTab from "./FlashcardTab/FlashcardTab";

function Flashcard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
          isSidebarOpen ? "ml-64" : "ml-16"
        } p-5`}
      >
        <HeaderUser
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="text-2xl min-h-screen font-semibold mt-[60px]">
          <div className="mb-6">Your Flashcard</div>
          <FlashcardTab />
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
