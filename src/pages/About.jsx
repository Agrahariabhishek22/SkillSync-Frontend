import {  useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white flex flex-col items-center p-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-[#ECF5FF] mb-4">About SkillSync</h1>
        <p className="text-lg text-[#A0B7C3] mb-6">
          SkillSync is a cutting-edge Learning Management System designed to empower learners and educators alike.
          Our platform provides an intuitive, engaging, and interactive environment to facilitate seamless learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <div className="p-6 bg-richblack-700 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-[#ECF5FF] mb-3">🚀 Our Mission</h2>
          <p className="text-[#A0B7C3]">
            To revolutionize online education by making learning more accessible, flexible, and personalized for everyone.
          </p>
        </div>

        <div className="p-6 bg-richblack-700 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-[#ECF5FF] mb-3">📚 Features</h2>
          <ul className="list-disc list-inside text-[#A0B7C3]">
            <li>Interactive courses & quizzes</li>
            <li>Real-time progress tracking</li>
            <li>AI-powered learning insights</li>
            <li>Community-based learning</li>
            <li>Personalized learning paths</li>
            <li>24/7 access to learning materials</li>
            <li>Certified courses from industry experts</li>
            <li>Seamless mobile-friendly experience</li>
          </ul>
        </div>
      </div>

      <div className="max-w-5xl mt-8 text-center">
        <div className="p-6 bg-richblack-700 rounded-2xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-[#ECF5FF] mb-3">🌍 Why Choose SkillSync?</h2>
          <p className="text-[#A0B7C3]">
            SkillSync bridges the gap between learners and experts through a user-friendly, feature-rich platform.
            Whether you're a student, teacher, or professional, we provide tools to help you grow and succeed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mt-8">
        <div className="p-6 bg-richblack-700 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-[#ECF5FF] mb-3">🎯 Personalized Learning</h2>
          <p className="text-[#A0B7C3]">
            Get tailored course recommendations based on your progress and interests.
          </p>
        </div>

        <div className="p-6 bg-richblack-700 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-[#ECF5FF] mb-3">🌟 Expert Instructors</h2>
          <p className="text-[#A0B7C3]">
            Learn from industry leaders and professionals with real-world experience.
          </p>
        </div>

        <div className="p-6 bg-richblack-700 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-[#ECF5FF] mb-3">📈 Career Growth</h2>
          <p className="text-[#A0B7C3]">
            Acquire in-demand skills and get certified to boost your career prospects.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <button className="bg-yellow-25 hover:bg-yellow-50 text-black font-bold py-3 px-6 rounded-xl text-lg shadow-lg"
        onClick={()=>navigate('/')}>
          Get Started
        </button>
      </div>
    </div>
  );
}