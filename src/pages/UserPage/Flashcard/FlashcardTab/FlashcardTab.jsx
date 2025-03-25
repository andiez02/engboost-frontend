import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FlashcardSets from "./FlashcardSets";
import Folders from "./Folders";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FolderIcon from "@mui/icons-material/Folder";
import Snaplang from "./Snaplang/Snaplang";

const TABS = {
  SNAPLANG: "snaplang",
  FLASHCARD_SETS: "flashcard_sets",
  FOLDERS: "folders",
};

function FlashcardTab() {
  const location = useLocation();

  const getDefaultTab = () => {
    if (location.pathname.includes(TABS.FLASHCARD_SETS))
      return TABS.FLASHCARD_SETS;
    if (location.pathname.includes(TABS.FOLDERS)) return TABS.FOLDERS;
    return TABS.SNAPLANG;
  };
  const [activeTab, setActiveTab] = useState(getDefaultTab());

  const handleChangeTab = (event, selectedTab) => {
    setActiveTab(selectedTab);
  };
  return (
    <div>
      <Container disableGutters maxWidth={false}>
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTab}
              sx={{
                minHeight: 36,
                "& .MuiTab-root": {
                  minHeight: 32,
                  fontSize: "0.85rem",
                  padding: "6px 12px",
                  "& .MuiSvgIcon-root": {
                    fontSize: "1rem",
                  },
                },
              }}
            >
              <Tab
                label="Snaplang"
                value={TABS.SNAPLANG}
                icon={<LibraryBooksIcon />}
                iconPosition="start"
                component={Link}
                to="/flashcard/snaplang"
              />
              <Tab
                label="Flashcard Sets"
                value={TABS.FLASHCARD_SETS}
                icon={<LibraryBooksIcon />}
                iconPosition="start"
                component={Link}
                to="/flashcard/flashcard_sets"
              />
              <Tab
                label="Folders"
                value={TABS.FOLDERS}
                icon={<FolderIcon />}
                iconPosition="start"
                component={Link}
                to="/flashcard/folders"
              />
            </TabList>
          </Box>
          <TabPanel value={TABS.SNAPLANG}>
            <Snaplang />
          </TabPanel>
          <TabPanel value={TABS.FLASHCARD_SETS}>
            <FlashcardSets />
          </TabPanel>
          <TabPanel value={TABS.FOLDERS}>
            <Folders />
          </TabPanel>
        </TabContext>
      </Container>
    </div>
  );
}

export default FlashcardTab;
