import React from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../../slices/cartSlice";
import { ACCOUNT_TYPE } from "../../../utils/constants";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

return (
  <>
    <div className="flex flex-col gap-6 rounded-lg bg-richblack-700 p-6 text-richblack-5 shadow-md">
      {/* Course Image */}
      <img
        src={ThumbnailImage}
        alt={course?.courseName}
        className="max-h-[300px] min-h-[180px] w-full rounded-xl object-cover"
      />

      <div className="px-4">
        <div className="text-3xl font-bold text-yellow-25">Rs. {CurrentPrice}</div>
        
        <div className="flex flex-col gap-4 mt-4">
          <button
            className="w-full rounded-lg bg-yellow-50 px-4 py-2 text-lg font-semibold text-black transition-all duration-200 hover:bg-yellow-100"
            onClick={
              user && course?.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && course?.studentsEnrolled.includes(user?._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>
          {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
            <button
              onClick={handleAddToCart}
              className="w-full rounded-lg bg-gray-800 px-4 py-2 text-lg font-semibold text-white transition-all duration-200 hover:bg-gray-700"
            >
              Add to Cart
            </button>
          )}
        </div>
        
        <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
          30-Day Money-Back Guarantee
        </p>

        <div>
          <p className="my-3 text-xl font-semibold">This Course Includes:</p>
          <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
            {course?.instructions?.map((item, i) => (
              <p className="flex items-center gap-2" key={i}>
                <BsFillCaretRightFill className="text-yellow-25" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-6">
          <button
            className="mx-auto flex items-center gap-2 py-2 px-4 text-yellow-25 transition-all duration-200 hover:text-yellow-100"
            onClick={handleShare}
          >
            <FaShareSquare size={18} /> Share
          </button>
        </div>
      </div>
    </div>
  </>
);
}

export default CourseDetailsCard;
