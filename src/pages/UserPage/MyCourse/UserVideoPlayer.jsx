import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../../../components/VideoPlayer/VideoPlayer';
import { getMyCourseVideoAPI } from '../../../apis';
import HeaderUser from '../../../components/Layout/HeaderUser';
import Sidebar from '../../../components/Layout/SideBar';
import { CircularProgress } from '@mui/material';
const UserVideoPlayer = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getMyCourseVideoAPI(courseId);
        setCourse(response);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [courseId]);
  return (
    <div className="flex" style={{ backgroundColor: '#FDFAF6' }}>
      <Sidebar isOpen={isSidebarOpen} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        } p-5`}
      >
        <HeaderUser
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div style={{ marginTop: '60px' }}>
          {course ? (
            <VideoPlayer course={course} isAdmin={false} />
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserVideoPlayer;
