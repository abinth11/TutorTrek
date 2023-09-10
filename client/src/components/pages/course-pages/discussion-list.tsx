import React, { useState, Fragment, useRef, useEffect } from "react";
import useTimeAgo from "../../../hooks/useTimeAgo";
import { BiMessageRoundedDots } from "react-icons/bi";
import { MdOutlineMoreVert } from "react-icons/md";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { selectStudentId } from "../../../redux/reducers/studentSlice";
import { ApiResponseDiscussion } from "../../../api/types/apiResponses/api-response-discussion";
import { RiEdit2Line, RiDeleteBinLine, RiFlagLine } from "react-icons/ri";
import EditDiscussionModal from "./edit-discussion-modal";
import { deleteDiscussions } from "../../../api/endpoints/course/discussion";
import { toast } from "react-toastify";
import { getRepliesByDiscussion } from "../../../api/endpoints/course/discussion";
import { SyncLoader } from "react-spinners";
import { ApiResponseDiscussionReply } from "../../../api/types/apiResponses/api-response-discussion";
import { IoSend } from "react-icons/io5";
import { replyDiscussions } from "../../../api/endpoints/course/discussion";
import { Tooltip } from "@material-tailwind/react";
import { BeatLoader } from "react-spinners";
import { selectIsLoggedIn } from "../../../redux/reducers/authSlice";
const profilePic =
  "data:image/png;base64,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";

const MenuBar: React.FC<{
  commentId: string;
  message: string;
  updated: boolean;
  setUpdated: (updated: boolean) => void;
  isEditable: boolean;
}> = ({ commentId, message, updated, setUpdated, isEditable }) => {
  const [open, setOpen] = React.useState(false);

  const handleDiscussionDelete = async (discussionId: string) => {
    try {
      const response = await deleteDiscussions(discussionId);
      setUpdated(!updated);
      toast.success(response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setOpen(!open);
    } catch (error) {
      toast.error("Something went wrong please try again later", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  //todo need to find a better way to hide the scrollbar when editing and deleting the comments
  // useEffect(() => {
  //   // window.scrollTo(0, 0);
  //   // Hide the browser's scroll bar on component mount
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     // Restore the browser's scroll bar on component unmount
  //     document.body.style.overflow = "auto";
  //   };
  // });

  const handleMenuItemClick = (action: string) => {
    switch (action) {
      case "Edit":
        setOpen(true);
        break;
      case "Delete":
        handleDiscussionDelete(commentId);
        break;
      case "Report":
        // alert("Report action triggered");
        break;
      default:
        break;
    }
  };

  return (
    <Menu placement='left-start'>
      <EditDiscussionModal
        setOpen={setOpen}
        updated={updated}
        setUpdated={setUpdated}
        commentId={commentId}
        message={message}
        open={open}
      />
      <MenuHandler>
        <Button className='bg-transparent focus:outline-none shadow-none hover:bg-transparent hover:shadow-none'>
          <MdOutlineMoreVert className='text-customFontColorBlack text-lg mr-3' />
        </Button>
      </MenuHandler>
      {isEditable ? (
        <MenuList>
          <MenuItem
            onClick={() => handleMenuItemClick("Edit")}
            className='flex items-center menu-item'
            data-action='Edit'
          >
            <span className='flex-grow'>Edit</span>
            <RiEdit2Line className='text-blue-500 text-sm flex-shrink-0' />
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuItemClick("Delete")}
            className='flex items-center menu-item'
            data-action='Delete'
          >
            <span className='flex-grow'>Delete</span>
            <RiDeleteBinLine className='text-red-500 text-sm flex-shrink-0' />
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList>
          <MenuItem
            onClick={() => handleMenuItemClick("Report")}
            className='flex items-center menu-item'
            data-action='Report'
          >
            <span className='flex-grow'>Report</span>
            <RiFlagLine className='text-orange-500 text-sm flex-shrink-0' />
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};

interface Props extends ApiResponseDiscussion {
  updated: boolean;
  setUpdated: (updated: boolean) => void;
}

const DiscussionListEl: React.FC<Props> = ({
  _id,
  createdAt,
  replies,
  updatedAt,
  studentDetails,
  message,
  updated,
  setUpdated,
}) => {
  const calculateTimeAgo = useTimeAgo();
  const studentId = useSelector(selectStudentId);
  const commedUpdated = createdAt < updatedAt;
  const isEditable = studentId === studentDetails._id;
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [repliesLoading, setRepliesLoading] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [replyText, setReplyText] = useState<string>("");
  const replyRef = useRef<HTMLInputElement>(null);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const totalComments = replies?.length ?? 0;
  const shouldShowViewMore = visibleCount < totalComments;
  const shouldShowShowLess = visibleCount > 3;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [discussionReplies, setDiscussionReplies] = useState<
    ApiResponseDiscussionReply[] | null
  >(null);

  useEffect(() => {
    if (isReply && replyRef.current) {
      replyRef.current.focus();
      // setIsReply(false);
    }
  }, [isReply]);

  const fetchReplies = async (discussionId: string) => {
    try {
      setRepliesLoading(true);
      const replies = await getRepliesByDiscussion(discussionId);
      setDiscussionReplies(replies?.data);
      setTimeout(() => {
        setRepliesLoading(false);
      }, 1500);
    } catch (error) {
      setRepliesLoading(false);
      toast.error("Something went wrong please try again later", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };
  const handleShowLess = () => {
    setVisibleCount(3);
  };

  const handleReplyComment = () => {
    setIsReply(!isReply);
  };

  const handlePostReply = async () => {
    try {
      setIsLoading(true);
      const response = await replyDiscussions(_id, {
        studentId: studentDetails?._id,
        message: replyText,
      });
      setUpdated(!updated);
      toast.success(response?.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setReplyText("");
      setIsInputEmpty(true);
      setIsReply(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleShowReply = async () => {
    setShowReplies(!showReplies);
    !showReplies && fetchReplies(_id);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyText(e.target.value);
    setIsInputEmpty(e.target.value === "");
  };

  return (
    <li className='border-b mt-3 border-gray-300 p-6'>
      <div className='flex justify-between items-start'>
        <div className='flex'>
          <img className='w-12 h-12' src={profilePic} alt='image' />
          <div className='ml-2'>
            <h2 className='font-semibold text-customFontColorBlack'>
              {studentDetails?.firstName + " " + studentDetails?.lastName}
              <span className='font-light ml-1 text-customFontColorBlack text-xs'>
                {commedUpdated ? "(edited)" : ""}
              </span>
            </h2>
            <h2 className='font-light text-xs'>
              {commedUpdated
                ? calculateTimeAgo(updatedAt)
                : calculateTimeAgo(createdAt)}
            </h2>
            <br />
          </div>
        </div>
        <MenuBar
          updated={updated}
          setUpdated={setUpdated}
          commentId={_id}
          message={message}
          isEditable={isEditable}
        />
      </div>
      <h2 className='mt-1'>{message}</h2>
      <div className='pt-2'>
        {isLoggedIn && (
          <button
            onClick={handleReplyComment}
            className='cursor-pointer text-blue-gray-400 font-semibold text-sm'
          >
            Reply
          </button>
        )}
        {isReply && (
          <div className='flex pt-2 flex-wrap'>
            <input
              type='text'
              value={replyText}
              ref={replyRef}
              onChange={handleInputChange}
              className='border inline-block border-gray-400 w-1/2 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'
              placeholder='Reply to the commnet'
            />
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
                  onClick={handlePostReply}
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
        )}

        <button
          onClick={handleShowReply}
          className='flex mt-4 items-center text-sm text-customFontColorBlack hover:text-blue-gray-400'
        >
          <BiMessageRoundedDots className='text-xl' />
          <span className='ml-1'>
            {!showReplies ? `View ${replies.length} more replies` : `show less`}
          </span>
        </button>
      </div>
      <div>
        {repliesLoading ? (
          <SyncLoader className='mt-1 p-2 ml-3' color='#808080' size={8} />
        ) : (
          <Fragment>
            {showReplies && (
              <div>
                <ul>
                  {discussionReplies?.map((reply, index) => (
                    <li
                      className={`mt-3 border-gray-300 p-6 ${
                        index !== replies.length - 1 ? "border-b" : "pb-0"
                      }`}
                      key={reply._id}
                    >
                      <div className='flex justify-between items-start'>
                        <div className='flex'>
                          <img
                            className='w-12 h-12'
                            src={profilePic}
                            alt='image'
                          />
                          <div className='ml-2'>
                            <h2 className='font-semibold text-customFontColorBlack'>
                              {reply.studentDetails.firstName +
                                " " +
                                reply.studentDetails.lastName}
                              <span className='font-light ml-1 text-customFontColorBlack text-xs'>
                                {commedUpdated ? "(edited)" : ""}
                              </span>
                            </h2>
                            <h2 className='font-light text-xs'>
                              {commedUpdated
                                ? calculateTimeAgo(reply.updatedAt)
                                : calculateTimeAgo(reply.createdAt)}
                            </h2>
                            <br />
                          </div>
                        </div>
                      </div>
                      <h2 className='mt-1'>{reply.message}</h2>
                    </li>
                  ))}
                </ul>
                {shouldShowViewMore && (
                  <button
                    className='text-customFontColorBlack ml-4 mt-1 underline'
                    onClick={handleViewMore}
                  >
                    View More
                  </button>
                )}
                {shouldShowShowLess && (
                  <button
                    className='text-customFontColorBlack ml-4 mt-1 underline'
                    onClick={handleShowLess}
                  >
                    Show less
                  </button>
                )}
              </div>
            )}
          </Fragment>
        )}
      </div>
    </li>
  );
};

export default DiscussionListEl;
