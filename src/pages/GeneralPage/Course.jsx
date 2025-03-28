import React from "react";
import courseImage from "../../assets/course-img.webp";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import CourseCardIntroduce from "../../components/Course/CourseCardIntroduce";

const courses = {
  IELTS: [
    {
      name: "[IELTS Fundamentals] Từ vựng và ngữ pháp cơ bản IELTS",
      price: 699000,
      originalPrice: 899000,
      rating: 4.5,
      image: courseImage,
    },
    {
      name: "[IELTS Intensive Listening] Chiến lược làm bài - Chữa đề - Luyện nghe IELTS Listening theo phương pháp Dictation",
      price: 699000,
      originalPrice: 899000,
      rating: 4.7,
      image: courseImage,
    },
    {
      name: "[IELTS Intensive Reading] Chiến lược làm bài - Chữa đề - Từ vựng IELTS Reading",
      price: 699000,
      originalPrice: 899000,
      rating: 4.6,
      image: courseImage,
    },
    {
      name: "[IELTS Intensive Speaking] Thực hành luyện tập IELTS Speaking",
      price: 699000,
      originalPrice: 899000,
      rating: 4.3,
      image: courseImage,
    },
    {
      name: "[IELTS Intensive Writing] Thực hành luyện tập IELTS Writing",
      price: 699000,
      originalPrice: 899000,
      rating: 4.4,
      image: courseImage,
    },
  ],
  TOEIC: [
    {
      name: "[Complete TOEIC] Chiến lược làm bài - Từ vựng - Ngữ pháp - Luyện nghe với Dictation [Tặng khoá TED Talks]",
      price: 989000,
      originalPrice: 1800000,
      rating: 4.8,
      image: courseImage,
    },
  ],
};

function Course() {
  return (
    <div>
      <Header />
      <div className="min-h-screen mt-[60px] mx-20 md:mx-30 lg:mx-40">
        {Object.entries(courses).map(([category, courseList]) => (
          <div key={category} className="mt-30 mb-20">
            <h2 className="text-2xl font-bold mb-3">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseList.map((course, index) => (
                <CourseCardIntroduce key={index} course={course} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Course;
