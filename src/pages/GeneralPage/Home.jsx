import React, { useEffect } from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import landingImage from '../../assets/home/landing-img.png';
import homeImage1 from '../../assets/home/home-img-1.png';
import homeImage1Sub1 from '../../assets/home/home-img-1.1.png';
import homeImage1Sub2 from '../../assets/home/home-img-1.2.png';
import homeImage2 from '../../assets/home/home-img-2.png';
import homeImage2Sub1 from '../../assets/home/home-img-2.1.png';
import homeImage2Sub2 from '../../assets/home/home-img-2.2.png';
import homeImage3 from '../../assets/home/home-img-3.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HomeToFlashcardButton from '../../components/Button/HomeToFlashcardButton';

function Home() {
  useEffect(() => {
    // Wait for window load event to ensure all content is ready
    const handleLoad = () => {
      AOS.init({
        duration: 800,
        once: false,
        offset: 100,
        easing: 'ease-out',
        delay: 0,
        disable: false,
      });

      // Force refresh AOS after initialization
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    };

    // If window already loaded, initialize immediately
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <>
      <Header />
      <HomeToFlashcardButton />
      <div className="h-screen overscroll-none">
        <img
          src={landingImage}
          alt="Landing Image"
          className="object-cover h-screen w-full"
        />
      </div>
      <div>
        <section className="min-h-screen bg-blue-100 flex flex-col items-center pb-20">
          <div className="mt-20 text-3xl" data-aos="fade-down">
            <span className="text-[#2F327D]">Giới thiệu về </span>
            <span className="text-[#4c85F4]">ENGBOOST</span>
          </div>
          <div className="mt-10 px-60 text-center" data-aos="fade-up">
            <p className="text-lg">
              ENGBOOST cho phép bạn tải lên ảnh, nhận diện vật thể và hiển thị
              từ vựng liên quan kèm nghĩa, phiên âm. Dễ dàng lưu lại, ôn tập và
              theo dõi tiến trình học tập mọi lúc, mọi nơi!
            </p>
          </div>

          <div
            data-aos="fade-right"
            data-aos-duration="800"
            className="mt-40 mx-36 flex items-center gap-20"
          >
            <div className="w-3/5">
              <h3 className="text-2xl">
                Học Từ Vựng Qua Hình Ảnh – <br />
                <span className="text-[#4C85F4]">
                  Ghi Nhớ Dễ Dàng, Nhớ Lâu Hơn!
                </span>
              </h3>
              <p className="mt-3 text-[#696984] text-lg ">
                Bạn đã bao giờ quên ngay từ vựng sau khi học chưa? Với phương
                pháp học qua hình ảnh thực tế, website giúp bạn kết nối từ vựng
                với thế giới xung quanh một cách trực quan, dễ hiểu và ghi nhớ
                lâu hơn.
              </p>
            </div>

            <div className="relative" data-aos="zoom-in" data-aos-delay="200">
              <img
                src={homeImage1Sub2}
                alt=""
                className="absolute -top-10 -left-10 z-0"
              />

              <img src={homeImage1} alt="Image 1" className="relative z-10" />

              <img
                src={homeImage1Sub1}
                alt=""
                className="absolute -bottom-10 -right-10 z-5"
              />
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-duration="800"
            className="mt-40 mx-36 flex items-center gap-20"
          >
            <div className="relative" data-aos="zoom-in" data-aos-delay="200">
              <img
                src={homeImage2Sub1}
                alt="Image 2"
                className="absolute -top-22 -right-2"
              />
              <img src={homeImage2} alt="Image 2" className="" />
              <img
                src={homeImage2Sub2}
                alt="Image 2"
                className="absolute -top-6 -right-12"
              />
            </div>

            <div className="w-3/5">
              <h3 className="text-2xl">
                Biến Mọi Khoảnh Khắc Thành Cơ Hội – <br />
                <span className="text-[#4C85F4]">Học Tiếng Anh</span>
              </h3>
              <p className="mt-3 text-[#696984] text-lg ">
                Tải lên ảnh, quét vật thể và khám phá ngay từ vựng tiếng Anh
                liên quan! Website giúp bạn học mọi lúc, mọi nơi mà không cần
                cài đặt ứng dụng. Học tiếng Anh chưa bao giờ tiện lợi và thú vị
                đến thế!
              </p>
            </div>
          </div>

          <div
            data-aos="fade-right"
            data-aos-duration="800"
            className="mt-40 mx-36 flex items-center gap-20"
          >
            <div className="w-3/5">
              <h3 className="text-2xl">
                Học Như Trẻ Em – <br />
                <span className="text-[#4C85F4]">Ghi Nhớ Như Người Bản Xứ</span>
              </h3>
              <p className="mt-3 text-[#696984] text-lg ">
                Trẻ em học ngôn ngữ bằng cách liên kết từ với hình ảnh thực tế
                xung quanh. Website của chúng tôi mang đến trải nghiệm tương tự,
                giúp bạn học từ vựng tự nhiên, dễ nhớ và áp dụng ngay vào cuộc
                sống hàng ngày.
              </p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="200">
              <img src={homeImage3} alt="Image 1" />
            </div>
          </div>
        </section>
      </div>

      <div>
        <section className="py-16 bg-blue-200 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div
            className="bg-white shadow-lg rounded-xl p-6 text-center"
            data-aos="zoom-in"
            data-aos-duration="800"
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
            data-aos-duration="800"
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
            data-aos-duration="800"
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
