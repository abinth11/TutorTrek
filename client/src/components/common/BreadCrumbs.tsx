import { Breadcrumbs } from "@material-tailwind/react";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { Link } from "react-router-dom";
  
export default function CustomBreadCrumbs({ paths }: { paths: string }) {
  const trimmedPath = paths.substring(1);
  const parts = trimmedPath.split("/");
  
  return (
    <Breadcrumbs>
      {parts.map((path: string, index: number) => {
        const href = `/${parts.slice(0, index + 1).join("/")}`
        return (
          <Link to={href} className='opacity-60' key={index}>
            {capitalizeFirstLetter(path)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
