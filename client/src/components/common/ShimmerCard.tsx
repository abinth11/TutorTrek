import React from "react";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

const ShimmerCard = () => {
  return (
    <Card className="w-[20rem] shadow-lg">
      <CardHeader floated={false} >
        <div className="bg-gray-300 h-[10rem] animate-pulse"></div>
      </CardHeader>
      <CardBody>
        <div className="mb-3">
          <div className="h-4 w-1/2 bg-gray-300 mb-2 animate-pulse"></div>
          <div className="h-4 w-3/4 bg-gray-300 animate-pulse"></div>
        </div>
        <div className="h-4 w-[70%] bg-gray-300 mt-4 animate-pulse"></div>
      </CardBody>
    </Card>
  );
};

export default ShimmerCard;
