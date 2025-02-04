import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'

const tabName=[
    "Free",
    "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
]
const ExploreMore = () => {

    const [currentTab,setCurrentTab]=useState("Free");
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCards=(value)=>{
        setCurrentTab(value); 
        const result=HomePageExplore.filter((course)=>course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (

    <div>
      <div className='text-4xl font-semibold items-center' >
        Unlock the 
        <HighlightText text={"Power of Code"} />
      </div>
      <p className='text-center text-richblack-300 text-[16px] mt-3' >
        Learn to build anyhting that you can imagine
      </p>

      <div className='flex rounded-full bg-richblack-800 mb-5 mt-5  px-1 py-1' >
        {
          tabName.map((element,idx)=>{
            return(
              <div className={`text-[16px] flex flex-row items-center gap-2 
              ${currentTab===element?"bg-richblack-900 text-richblack-5 font-medium":
              "text-richblack-200"}
               rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} key={idx}
               onClick={()=>setMyCards(element)}
               >
                {element}
              </div>
            )
          })
        }
      </div>
      
      <div className='lg:h-[150px]' ></div>
       
      {/* course card  */}

      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
          {
             courses.map((element,idx)=>{
              return (
                <CourseCard key={idx} cardData={element} currentCard={currentCard} setCurrentCard={setCurrentCard} />
              )
             })
          }
        </div>

    </div>
  )
}

export default ExploreMore
