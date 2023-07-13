import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
  import { ApiResponseRecommended } from "../../../api/types/apiResponses/apiResponseHomePageListing";

  interface Props {
    courseInfo:ApiResponseRecommended
  }
   
  const  RecommendedCard:React.FC<Props> =({courseInfo})=> {
    const {course,instructor} = courseInfo
    const imageUrl = course?.thumbnail
    return (
      <Card
        shadow={false}    
        className="relative m-5 grid h-[30rem]  w-full max-w-[24rem] items-end justify-center overflow-hidden text-center"
      >
        <CardHeader
          floated={false}
          shadow={false}                    
          color="transparent"    
          style={{backgroundImage:`url(${imageUrl})`}}
          className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
          >
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        </CardHeader>
        <CardBody className="relative py-14 px-6 md:px-12">
          <Typography      
            variant="h2" 
            color="white"     
            className="mb-6 font-medium leading-[1.5]"
          >
            {course?.name}
          </Typography>
          <Typography variant="h5" className="mb-4 text-gray-400">
            {instructor?.firstName+" "+ instructor?.lastName}
          </Typography>
          <Avatar
            size="xl"
            variant="circular"
            alt="tania andrew"
            className="border-2 border-white"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
        </CardBody>
      </Card>
    );
  }
  export default RecommendedCard