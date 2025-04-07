import React from "react";
import engboostLogo from "../../assets/home/engboost-logo.png";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "../../utils/constants";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: "Về chúng tôi", href: routes.ABOUT },
    { title: "Khoá học", href: routes.COURSE },
    { title: "Blog", href: routes.BLOG },
    { title: "Liên hệ", href: routes.CONTACT },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Instagram, href: "https://instagram.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Youtube, href: "https://youtube.com" },
  ];

  return (
    <footer className="bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={engboostLogo} alt="EngBoost Logo" className="h-12" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                EngBoost
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Fuel your Fluency - Nâng tầm tiếng Anh của bạn
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-blue-300 transition-colors duration-300 text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-300 transition-colors duration-300 text-sm"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-300 transition-colors duration-300 text-sm"
                >
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-300 transition-colors duration-300 text-sm"
                >
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">
                Email: support@engboost.com
              </li>
              <li className="text-gray-300 text-sm">Hotline: 1900 xxxx</li>
              <li className="text-gray-300 text-sm">
                Địa chỉ: Hà Nội, Việt Nam
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-300 transition-colors duration-300"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} EngBoost. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
