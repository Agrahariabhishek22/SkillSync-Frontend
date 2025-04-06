import React from "react";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading;

  return (
    <div
      onClick={() => setCurrentCard(cardData?.heading)}
      className={`w-[360px] h-[300px] rounded-xl transition-all duration-300 cursor-pointer
        ${isActive ? "bg-caribbeangreen-600 text-white" : "bg-white text-richblack-800 dark:bg-richblack-800 dark:text-white"}
        shadow-lg hover:scale-[1.02] p-6 font-[Underdog]`}
    >
      <h2 className="text-3xl font-bold text-caribbeangreen-400 mb-4">
        {cardData?.heading}
      </h2>

      <p className="text-lg font-[Lato] leading-relaxed line-clamp-4">
        {cardData?.description}
      </p>

      <div className="flex justify-between items-center text-sm font-[Lato] mt-10 ">
        <span>By {cardData?.instructor || "Instructor"}</span>
        <span>{cardData?.rating || "⭐ 4.5"}</span>
      </div>
    </div>
  );
};

export default CourseCard;
