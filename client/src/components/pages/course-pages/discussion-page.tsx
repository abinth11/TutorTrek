import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { Tooltip } from "@material-tailwind/react";
import DiscussionListEl from "./discussion-list";
import { addDiscussion } from "../../../api/endpoints/course/discussion";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { getDiscussionsByLesson } from "../../../api/endpoints/course/discussion";
import { ApiResponseDiscussion } from "../../../api/types/apiResponses/api-response-discussion";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/reducers/authSlice";

const Discussion: React.FC<{ lessonId: string }> = ({ lessonId }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [discussionText, setDiscussionText] = useState("");
  const [discussions, setDiscussions] = useState<
    ApiResponseDiscussion[] | null
  >(null);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const handlePostDiscussion = async () => {
    try {
      setIsLoading(true);
      const response = await addDiscussion(lessonId ?? "", discussionText);
      setUpdated(!updated);
      toast.success(response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setDiscussionText("");
      setIsInputEmpty(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const fetchDiscussions = async (lessonId:string) => {
    try {
      const response = await getDiscussionsByLesson(lessonId);
      setDiscussions(response.data);
    } catch (error: any) {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  useEffect(() => {
    if(lessonId){
      fetchDiscussions(lessonId);
    }
  }, [updated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscussionText(e.target.value);
    setIsInputEmpty(e.target.value === "");
  };

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };
  const handleShowLess = () => {
    setVisibleCount(3);
  };

  const totalComments = discussions?.length ?? 0;
  const visibleCommentsList = discussions?.slice(0, visibleCount);
  const shouldShowViewMore = visibleCount < totalComments;
  const shouldShowShowLess = visibleCount > 3;

  return (
    <div>
      <h2 className='text-xl ml-2 p-1 font-bold mb-4 flex items-center'>
        Lesson Discussion
        <div
          className='ml-2 w-7 h-5 bg-blue-gray-100 rounded-full flex items-center justify-center text-customFontColorBlack font-light text-sm'
          style={{ borderRadius: "43% 43%" }}
        >
          {discussions?.length}
        </div>
      </h2>
      <div className='md:ml-3 mb-8'>
        <ul>
          {visibleCommentsList?.map((item, index) => {
            return (
              <DiscussionListEl
                updated={updated}
                setUpdated={setUpdated}
                {...item}
                key={index}
              />
            );
          })}
        </ul>
        {shouldShowViewMore && (
          <button
            className='text-blue-gray-400 ml-4 mt-1 underline'
            onClick={handleViewMore}
          >
            View More
          </button>
        )}
        {shouldShowShowLess && (
          <button
            className='text-blue-gray-400 ml-4 mt-1 underline'
            onClick={handleShowLess}
          >
            Show less
          </button>
        )}
      </div>
      {isLoggedIn && (
        <div className='mx-auto pb-5 flex mt-4 px-4'>
          <div className='w-1/2'>
            <input
              type='text'
              value={discussionText}
              onChange={handleInputChange}
              className='border  border-gray-400 w-full rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'
              placeholder='Enter your discussion'
            />
          </div>
          <div>
            {isLoading ? (
              <div className='flex p-3 justify-center items-center'>
                <BeatLoader className='mt-1' color='	#808080' size={8} />
              </div>
            ) : (
              <Tooltip
                content='Post message'
                placement='bottom'
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <button
                  onClick={handlePostDiscussion}
                  disabled={isInputEmpty}
                  className={`bg-blue ${
                    isInputEmpty
                      ? "text-gray-500"
                      : "hover:text-white bg-blue-500"
                  }    ml-2 font-bold py-2 px-4 rounded-md h-full`}
                >
                  <IoSend
                    className={`h-full text-2xl ${
                      isInputEmpty
                        ? "text-gray-500 "
                        : "hover:text-white text-white"
                    }`}
                  />
                </button>
              </Tooltip>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussion;
