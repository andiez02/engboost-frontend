import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Folders from './Folders/Folders';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FolderIcon from '@mui/icons-material/Folder';
import Snaplang from './Snaplang/Snaplang';
import Discover from './Discover/Discover';
import ExploreIcon from '@mui/icons-material/Explore';

const TABS = {
  SNAPLANG: 'snaplang',
  FOLDERS: 'folders',
  DISCOVER: 'discover',
};

function FlashcardTab() {
  const location = useLocation();

  const getDefaultTab = useCallback(() => {
    if (location.pathname.includes(TABS.FOLDERS)) return TABS.FOLDERS;
    if (location.pathname.includes(TABS.DISCOVER)) return TABS.DISCOVER;
    return TABS.SNAPLANG;
  }, [location.pathname]);

  useEffect(() => {
    setActiveTab(getDefaultTab());
  }, [location.pathname, getDefaultTab]);

  const [activeTab, setActiveTab] = useState(getDefaultTab());

  const handleChangeTab = (event, selectedTab) => {
    setActiveTab(selectedTab);
  };
  return (
    <div>
      <Container disableGutters maxWidth={false}>
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChangeTab}
              sx={{
                minHeight: 36,
                '& .MuiTab-root': {
                  minHeight: 32,
                  fontSize: '0.85rem',
                  padding: '6px 12px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '1rem',
                  },
                },
              }}
            >
              <Tab
                label="Snaplang"
                value={TABS.SNAPLANG}
                icon={<CameraAltIcon />}
                iconPosition="start"
                component={Link}
                to="/flashcard/snaplang"
              />

              <Tab
                label="Folders"
                value={TABS.FOLDERS}
                icon={<FolderIcon />}
                iconPosition="start"
                component={Link}
                to="/flashcard/folders"
              />
              <Tab
                label="Discover"
                value={TABS.DISCOVER}
                icon={<ExploreIcon />}
                iconPosition="start"
                component={Link}
                to="/flashcard/discover"
              />
            </TabList>
          </Box>
          <TabPanel value={TABS.SNAPLANG}>
            <Snaplang />
          </TabPanel>

          <TabPanel value={TABS.FOLDERS}>
            <Folders />
          </TabPanel>
          <TabPanel value={TABS.DISCOVER}>
            <Discover />
          </TabPanel>
        </TabContext>
      </Container>
    </div>
  );
}

export default FlashcardTab;
