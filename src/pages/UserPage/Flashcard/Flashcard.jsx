import { useState } from 'react';
import HeaderUser from '../../../components/Layout/HeaderUser';
import Sidebar from '../../../components/Layout/SideBar';
import FlashcardTab from './FlashcardTab/FlashcardTab';
import card from '../../../assets/lotties/card.json';
import Lottie from 'lottie-react';

function Flashcard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      className="flex"
      style={{
        backgroundColor: '#FDFAF6',
      }}
    >
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className={`flex-1 transition-all duration-300 overflow-y-auto ${
          isSidebarOpen ? 'ml-58' : 'ml-16'
        } p-5`}
      >
        <HeaderUser
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="text-2xl min-h-screen font-semibold mt-[60px]">
          <div className="mb-2 flex items-center gap-3">
            <Lottie animationData={card} loop className="size-12" />
            <span>Flashcard</span>
          </div>
          <FlashcardTab />
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
