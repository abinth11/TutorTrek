import React, { useState, useEffect } from "react";
import Carousel from "../../elements/carousel-page";
import TrendingCard from "../home/trending-card";
import RecommendedCard from "../home/recommended-card";
import { ApiResponseRecommended } from "../../../api/types/apiResponses/api-response-home-page-listing";
import TrendingCardShimmer from "components/shimmer/shimmer-trending-course";
import { selectIsLoggedIn } from "../../../redux/reducers/authSlice";
import { useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import {
  getTrendingCourses,
  getRecommendedCourses,
} from "../../../api/endpoints/course/course";
import { ApiResponseTrending } from "../../../api/types/apiResponses/api-response-home-page-listing";
import { Link } from "react-router-dom";
import { selectUserType } from "../../../redux/reducers/authSlice";

const StudentHomePage: React.FC = () => {
  const [trendingCourses, setTrendingCourses] = useState<
    ApiResponseTrending[] | null
  >(null);
  const [recommendedCourses, setRecommendedCourses] = useState<
    ApiResponseRecommended[] | null
  >(null);
  const [showMoreTrending, setShowMoreTrending] = useState(false);
  const [showMoreRecommended, setShowMoreRecommended] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(6);
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  const [isLoadingRecommended, selectIsLoadingRecommended] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUserType);

  const fetchTrendingCourses = async () => {
    try {
      setIsLoadingTrending(true);
      const response = await getTrendingCourses();
      setTrendingCourses(response.data);
      setTimeout(() => {
        setIsLoadingTrending(false);
      }, 1000);
    } catch (error) {
      setIsLoadingTrending(false);
      // toast.error("Something went wrong", {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      // });
    }
  };

  const fetchRecommendedCourses = async () => {
    try {
      selectIsLoadingRecommended(true);
      const response = await getRecommendedCourses();
      setRecommendedCourses(response.data);
      setTimeout(() => {
        selectIsLoadingRecommended(false);
      }, 1000);
    } catch (error) {
      selectIsLoadingRecommended(false);
      // toast.error("Something went wrong", {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      // });
    }
  };

  useEffect(() => {
    fetchTrendingCourses();
    isLoggedIn && user === "student" && fetchRecommendedCourses();
  }, []);

  const handleShowMoreTrending = () => {
    setShowMoreTrending(true);
    setCardsToShow((prevCardsToShow) => prevCardsToShow + 3);
  };

  const handleShowMoreRecommended = () => {
    setShowMoreRecommended(true);
    setCardsToShow((prevCardsToShow) => prevCardsToShow + 3);
  };
  if (isLoadingTrending || isLoadingRecommended) {
    return (
      <div>
        <Carousel />
        <div className='lg:p-10 md:p-7 pt-7 sm:p-8 w-full'>
          <div className='ml-10 flex items-center justify-start w-9/12'>
            <Typography
              variant='h1'
              className='text-2xl  lg:text-4xl p-2 ml-2  font-semibold'
            >
              Trending Courses
            </Typography>
          </div>
          <div className='flex items-center justify-between px-10 flex-wrap'>
            {Array.from({ length: 6 }).map((_, index) => (
              <TrendingCardShimmer key={index} />
            ))}
          </div>
        </div>
        {isLoggedIn && (
          <div className='lg:p-10 md:p-7 pt-5 sm:p-8 w-full'>
            <div className='ml-10 flex items-center justify-start w-9/12'>
              <Typography
                variant='h1'
                className='text-2xl  p-2 ml-2 lg:text-4xl font-semibold'
              >
                Recommended Courses
              </Typography>
            </div>
            <div className='flex items-center justify-between pt-2 px-10 flex-wrap'>
              {Array.from({ length: 6 }).map((_, index) => (
                <TrendingCardShimmer key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div>
        <Carousel />
      </div>
      <div className='lg:p-10 md:p-7 pt-7 sm:p-8 w-full'>
        <div className='ml-10  flex items-center justify-start w-9/12'>
          <Typography
            variant='h1'
            className='text-2xl  p-2 ml-2 lg:text-4xl font-semibold'
          >
            Trending Courses
          </Typography>
        </div>

        <div className='flex items-center justify-between px-10 flex-wrap'>
          {trendingCourses?.slice(0, cardsToShow).map((course) => {
            return (
              <div className='grid  md:m-5 my-6  justify-center overflow-hidden text-center  bg-red-200 rounded-lg'>
                <Link key={course._id} to={`/courses/${course._id}`}>
                  <TrendingCard courseInfo={course} />
                </Link>
              </div>
            );
          })}
        </div>
        {trendingCourses && trendingCourses.length > cardsToShow && (
          <div className='md:flex-shrink-0 mt-3 ml-6'>
            <div className='flex-shrink-0'>
              <button
                className='text-customFontColorBlack ml-3 hover:text-blue-gray-600 font-bold px-6 rounded'
                onClick={handleShowMoreTrending}
              >
                View More
              </button>
            </div>
          </div>
        )}
      </div>

      {recommendedCourses && (
        <div className='lg:p-10 md:p-7 pt-5 sm:p-8 w-full'>
          <div className='ml-10 flex items-center justify-start w-9/12'>
            <Typography
              variant='h1'
              className='text-2xl  p-2 ml-2 lg:text-4xl font-semibold'
            >
              Recommended Courses
            </Typography>
          </div>
          <div className='flex items-center justify-between pt-2 px-10 flex-wrap'>
            {recommendedCourses?.slice(0, cardsToShow).map((course, index) => {
              return (
                <React.Fragment key={index}>
                  <Link to={`/courses/${course._id}`} className=''>
                    <RecommendedCard courseInfo={course} />
                  </Link>
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
