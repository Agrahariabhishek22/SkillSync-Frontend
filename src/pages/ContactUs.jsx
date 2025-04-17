import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
import { apiConnector } from "../services/apiconnector"
import contactImage from "../assets/Logo/logo2.jpg"

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Retrieve token properly
  
      const response = await apiConnector("PUT", BASE_URL + "/contactUs", 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );
  
      console.log(response);
  
      if (!response.data.success) {
        toast.error(response.message);
      } else {
        toast.success("Your Form Submitted Successfully");
        setFormData({ name: "", email: "", message: "" });
      }
      
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-14 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white">
      {loading ? (
        <svg className="animate-spin h-10 w-10 border-4 border-yellow-50 border-t-transparent rounded-full" />
      ) : (
        <div className="max-w-7xl w-full bg-richblack-800 p-10 rounded-2xl shadow-lg grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section with Image and Info */}
          <div className="relative flex flex-col items-center text-center space-y-6">
            <h2 className="text-4xl font-bold">Connect with SkillSync</h2>
            <p className="text-lg text-gray-300">
              Have questions or feedback? We'd love to hear from you! Reach out and let’s build something great together.
            </p>
            <img src={contactImage} alt="Contact Us" className="rounded-xl w-full object-cover" />
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3">
                <Mail size={24} className="text-yellow-400" />
                <p className="text-lg">skillsync.assist@gmail.com</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={24} className="text-green-400" />
                <p className="text-lg">+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={24} className="text-red-400" />
                <p className="text-lg">SkillSync HQ, Bengaluru, India</p>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-richblack-700 p-8 rounded-xl shadow-md">
            <h3 className="text-3xl font-semibold text-center mb-6">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-richblack-800 text-white outline-none border border-gray-600"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-richblack-800 text-white outline-none border border-gray-600"
                required
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-richblack-800 text-white outline-none border border-gray-600"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full py-4 bg-yellow-50 text-black rounded-lg font-bold text-lg hover:opacity-90 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
