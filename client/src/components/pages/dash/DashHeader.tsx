import React from "react";
import {
  Navbar,
  Typography,
  Collapse,
  IconButton,
} from "@material-tailwind/react";
import {
  Bars2Icon,
} from "@heroicons/react/24/outline";
 
 

 
export default function InstructorHeader() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, [])
 
  return (
    <Navbar className="mx-auto border-b bg-white border-gray-300 max-w-full   lg:pl-6 shadow-none rounded-none">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-semibold text-2xl"
        >
          TutorTrek
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        > 
          <Bars2Icon className="h-6 w-6" />   
        </IconButton>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
      </Collapse>
    </Navbar>
  );
}
