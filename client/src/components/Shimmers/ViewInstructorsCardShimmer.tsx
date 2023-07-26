import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

const Shimmer = () => {
  return (
    <Card
      shadow={false}
      className="relative grid h-[24rem] shadow-md cursor-pointer border-gray-200 w-full text-customFontColorBlack max-w-[23rem] items-end justify-center overflow-hidden text-center animate-pulse"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute pt-14 inset-0 m-0 w-full rounded-none bg-cover bg-center flex flex-col items-center justify-center"
      >
        <div className="w-28 h-28 rounded-full bg-gray-300 mb-4"></div>
        <Typography variant="h5" className="mb-2 w-36 h-6 bg-gray-300">{""}</Typography>
        <Typography variant="h6" className="w-64 h-4 mb-5 bg-gray-300">{""}</Typography>
      </CardHeader>
      <CardBody
        className="relative px-6  md:px-12 flex items-center justify-center"
        style={{ height: "calc(100% - 16rem)" }}
      >
        <Typography
          variant="h6"
          color="black"
          className="mb-6 mt-5 font-medium leading-[1.5] w-80 h-4 bg-gray-300"
        >{""}</Typography>
      </CardBody>
    </Card>
  );
};

export default Shimmer;
