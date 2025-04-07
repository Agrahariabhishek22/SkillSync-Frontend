import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        <div></div>
        <div className="text-center text-4xl font-semibold font-inter">
          Start your journey to success—one line of code at a time.{" "}
        </div>

        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-200">
          Learn coding on your terms — anytime, anywhere. Gain access to
          expert-led courses packed with hands-on projects, interactive quizzes,
          and personalized instructor feedback to help you master coding with
          confidence.
        </div>

        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full  p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row bg-gradient-to-r from-[#29ad8a] to-[#0c3e4e] items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 text-white text-lg">
              <p>Join as Instructor</p>
              <FaLongArrowAltRight />
            </div>
          </div>
        </Link>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <ExploreMore />
      </div>
      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        {/* Hero Section */}
        <div className="homepage_bg min-h-[330px] flex items-center">
          <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold text-grey text-center">
              Unlock Your Potential with SkillSync
            </h1>
            <p className="text-richblack-200 max-w-xl text-center">
              Choose your interest type and start your journey with us — whether
              you're a student eager to learn or an instructor ready to teach,
              we’ve got you covered.
            </p>
            <div className="flex flex-row gap-6 text-white mt-4">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaLongArrowAltRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Learn More
                  <FaLongArrowAltRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 py-16">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%]">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>

            <div className="flex flex-col items-start gap-8 lg:w-[40%]">
              <div className="text-base text-richblack-600">
                The modern SkillSync dictates its own terms. Today, to be a
                competitive specialist requires more than just professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Home;
