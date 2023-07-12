import { Outlet } from "react-router-dom";
const Categories: React.FC = () => {
  return (
    <div className=''>
      <div className='pl-4   flex items-center justify-center pr-5 '>
        <Outlet />
      </div>
    </div>
  );
};

export default Categories;
