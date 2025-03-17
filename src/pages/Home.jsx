import React, { useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import landingImage from "../assets/home/landing-img.png";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);
  return (
    <>
      <Header />
      <div className="h-screen overscroll-none">
        <img
          src={landingImage}
          alt="Landing Image"
          className="object-cover h-screen w-full"
        />
      </div>
      <div>
        {/* Phần demo chức năng */}
        <section className="py-16 bg-blue-200 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div
            className="bg-white shadow-lg rounded-xl p-6 text-center"
            data-aos="zoom-in"
          >
            <h3 className="text-xl font-semibold mb-2">
              <span>📸 Chụp ảnh, nhận diện từ vựng</span>
            </h3>
            <p>
              Chụp ảnh và nhận diện từ vựng ngay lập tức, giúp bạn học nhanh
              hơn.
            </p>
          </div>

          <div
            className="bg-white shadow-lg rounded-xl p-6 text-center"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <h3 className="text-xl font-semibold mb-2">
              📖 Ôn tập từ vựng đã học
            </h3>
            <p>Hệ thống ôn tập thông minh giúp bạn nhớ từ vựng lâu hơn.</p>
          </div>

          <div
            className="bg-white shadow-lg rounded-xl p-6 text-center"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <h3 className="text-xl font-semibold mb-2">
              🎯 Cá nhân hoá lộ trình học
            </h3>
            <p>
              Học tập theo tốc độ của riêng bạn với lộ trình được cá nhân hoá.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
