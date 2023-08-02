import {
  Rating
} from "@material-tailwind/react";
import { formatToINR } from "../../../utils/helpers";
import { CourseInterface } from "../../../types/course";

const CourseCard:React.FC<CourseInterface> = ({rating,price,isPaid,title,thumbnailUrl,description}) => {
  return (
    <div className="w-[18.5rem] p-5 text-customTextColor  hover:shadow-md hover:border hover:border-gray-300">
      <div className="relative">
        <img src={thumbnailUrl} className="h-1/2" alt="ui/ux review check" />
        <div className="absolute inset-0 h-[10rem] bg-gradient-to-tr from-transparent via-transparent to-black/60" />
      </div>
      <div className="pt-4">   
        <div className="mb-3">
          <h5 className="text-blue-gray text-xl font-medium">{title}</h5>
        </div>
        <p className="text-gray text-sm line-clamp-1">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div className="group">
          <p className={`text-sm font-normal ${isPaid ? "text-blue-gray" : "text-white p-1 text-xs rounded-tl-lg rounded-br-lg  font-extrabold bg-green-400"}`}>
              {isPaid ? formatToINR(price) : "Free"}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Rating value={rating} readonly />
            <p className="text-blue-gray text-sm font-normal">{rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
