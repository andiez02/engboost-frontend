import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import landingImage from "../assets/home/landing-img.png";

function Home() {
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
      <Footer />
    </>
  );
}

export default Home;
