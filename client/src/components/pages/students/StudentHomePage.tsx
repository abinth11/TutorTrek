import React, { useState, useEffect } from "react";
import Carousel from "../../elements/Carousel";
import TrendingCard from "../home/TrendingCard";
import RecommendedCard from "../home/RecommendedCard";
import { toast } from "react-toastify";
import { ApiResponseRecommended } from "../../../api/types/apiResponses/apiResponseHomePageListing";
import TrendingCardShimmer from "../../Shimmers/ShimmerTrendingCourse";
import { selectIsLoggedIn } from "../../../redux/reducers/authSlice";
import { useSelector } from "react-redux";
import {
  getTrendingCourses,
  getRecommendedCourses,
} from "../../../api/endpoints/course/course";
import { ApiResponseTrending } from "../../../api/types/apiResponses/apiResponseHomePageListing";
import { Link } from "react-router-dom";

const StudentHomePage: React.FC = () => {
  const [trendingCourses, setTrendingCourses] = useState<
    ApiResponseTrending[] | null
  >(null);
  const [recommendedCourses, setRecommendedCourses] = useState<
    ApiResponseRecommended[] | null
  >(null);
  const [showMoreTrending, setShowMoreTrending] = useState(false);
  const [showMoreRecommended, setShowMoreRecommended] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const [isLoadingRecommended, selectIsLoadingRecommended] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const fetchTrendingCourses = async () => {
    try {
      setIsLoadingTrending(true);
      const response = await getTrendingCourses();
      setTrendingCourses(response.data);
      setTimeout(() => {
        setIsLoadingTrending(false);
      }, 2000);
    } catch (error) {
      setIsLoadingTrending(false);
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const fetchRecommendedCourses = async () => {
    try {
      selectIsLoadingRecommended(true);
      const response = await getRecommendedCourses();
      setRecommendedCourses(response.data);
      setTimeout(() => {
        selectIsLoadingRecommended(false);
      }, 2000);
    } catch (error) {
      selectIsLoadingRecommended(false);
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    fetchTrendingCourses();
    isLoggedIn && fetchRecommendedCourses();
  }, []);

  const handleShowMoreTrending = () => {
    setShowMoreTrending(true);
    setCardsToShow((prevCardsToShow) => prevCardsToShow + 3); // Increment the number of cards to show
  };

  const handleShowMoreRecommended = () => {
    setShowMoreRecommended(true);
    setCardsToShow((prevCardsToShow) => prevCardsToShow + 3); // Increment the number of cards to show
  };
  console.log(recommendedCourses);
  if (isLoadingTrending || isLoadingRecommended) {
    return (
      <div>
        <Carousel />
        <div className='lg:p-10 md:p-7 pt-7 sm:p-8 w-full'>
          <div className='ml-10 flex items-center justify-start w-9/12'>
            <h2 className='p-2 text-customFontColorBlack md:text-4xl sm:text-4xl font-bold'>
              Trending Courses
            </h2>
          </div>
          <div className='flex items-center justify-between px-10 flex-wrap'>
            {Array.from({ length: 3 }).map((_, index) => (
              <TrendingCardShimmer key={index} />
            ))}
          </div>
        </div>

        <div className='lg:p-10 md:p-7 pt-5 sm:p-8 w-full'>
          <div className='ml-10 flex items-center justify-start w-9/12'>
            <h2 className='p-2 text-customFontColorBlack md:text-4xl sm:text-3xl font-bold'>
              Recommended courses
            </h2>
          </div>
          <div className='flex items-center justify-between pt-2 px-10 flex-wrap'>
            {Array.from({ length: 3 }).map((_, index) => (
              <TrendingCardShimmer key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Carousel />
      <div className='lg:p-10 md:p-7 pt-7 sm:p-8 w-full'>
        <div className='ml-10 flex items-center justify-start w-9/12'>
          <h2 className='p-2 text-customFontColorBlack md:text-4xl sm:text-4xl font-bold'>
            Trending Courses
          </h2>
        </div>

        <div className='flex items-center justify-between px-10  flex-wrap'>
          {trendingCourses?.slice(0, cardsToShow).map((course, index) => {
            return (
              <React.Fragment key={course._id}>
                {/* <Link to={`/courses/${course._id}`} className=''> */}
                <TrendingCard courseInfo={course} />
                {/* </Link>   */}
                {index === cardsToShow - 1 &&
                  trendingCourses.length > cardsToShow && (
                    <div className='flex-none'>
                      <div className='flex-shrink-0'>
                        <button
                          className='text-customFontColorBlack hover:text-blue-gray-600 font-bold px-6 rounded'
                          onClick={handleShowMoreTrending}
                        >
                          View More
                        </button>
                      </div>
                    </div>
                  )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {recommendedCourses && (
        <div className='lg:p-10 md:p-7 pt-5 sm:p-8 w-full'>
          <div className='ml-10 flex items-center justify-start w-9/12'>
            <h2 className='p-2 text-customFontColorBlack md:text-4xl sm:text-3xl font-bold'>
              Recommended courses
            </h2>
          </div>
          <div className='flex items-center justify-between pt-2 px-10 flex-wrap'>
            {recommendedCourses?.slice(0, cardsToShow).map((course, index) => {
              return (
                <React.Fragment key={course._id}>
                  {/* <Link to={`/courses/${course._id}`} className=''> */}
                  <RecommendedCard courseInfo={course} />
                  {/* </Link> */}
                  {!showMoreRecommended &&
                    index === cardsToShow - 1 &&
                    recommendedCourses.length > cardsToShow && (
                      <div className='flex justify-end w-full'>
                        <button
                          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                          onClick={handleShowMoreRecommended}
                        >
                          View More
                        </button>
                      </div>
                    )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHomePage;
