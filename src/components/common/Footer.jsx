import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import Logo from "../../assets/Logo/logo2.jpg"

const Footer = () => {
  return (
    <div className="bg-richblack-800 text-richblack-400 py-10">
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-row items-center  lg:flex-row justify-around  gap-8 border-b border-richblack-700 pb-8">
        {/* Logo & Socials */}
        <div className="flex flex-col justify-center items-center gap-4 ">
          <img src={Logo} alt="SkillSync Logo" className="w-36 rounded-full" />
          <div className="flex gap-4 text-3xl text-richblack-300">
            <FaFacebook className="hover:text-white transition" />
            <FaTwitter className="hover:text-white transition" />
            <FaYoutube className="hover:text-white transition" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-2xl">
          <Link to="/about" className="hover:text-white transition">About</Link>
          <Link to="/blog" className="hover:text-white transition">Blog</Link>
          <Link to="/careers" className="hover:text-white transition">Careers</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-6 w-11/12 max-w-maxContent mx-auto flex flex-col lg:flex-row justify-between items-center text-xl text-richblack-500">
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition">Terms</Link>
        </div>
        <p className="mt-4 lg:mt-0 text-center">
          Made with ❤️ by Abhishek © 2025 SkillSync
        </p>
      </div>
    </div>
  );
};

export default Footer;
