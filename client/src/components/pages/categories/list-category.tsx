import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../../api/endpoints/category";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/helpers";
import usePagination from "../../../hooks/usePagination";
import useSearch from "../../../hooks/useSearch";

const TABLE_HEAD = ["Name", "description", "Date added", ""];

const ListCategories: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery,setSearchQuery] = useState<string>('')
  const {
    currentData,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    totalPages,
  } = usePagination(categories, 7);
  const searchResult = useSearch(categories,searchQuery)
  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data); 
    } catch (error) {  
      toast.error("Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };
  const displayData = searchQuery !== "" ? searchResult : currentData;

  return (
    <Card className='h-full w-full'>
      <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-8 flex items-center justify-between gap-8'>
          <div>
            <Typography variant='h5' color='blue-gray'>
              Categories
            </Typography>
            <Typography color='gray' className='mt-1 font-normal'>
              See information about all categories
            </Typography>
          </div>
          <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
            <Button variant='outlined' color='blue-gray' size='sm'>
              view all
            </Button>
            <Link to={`/admin/categories/add-category`}>
              <Button
                className='flex items-center gap-3'
                color='blue'
                size='sm'
              >
                <PlusCircleIcon strokeWidth={2} className='h-5 w-5' />
                Add Category
              </Button>
            </Link>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <div className='w-full md:w-72'>
            <Input
              label='Search'
              onInput={handleSearch}
              icon={<MagnifyingGlassIcon className='h-5 w-5' />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className='overflow-scroll px-0'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
                >
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal leading-none opacity-70'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData?.map(
              ({ name, description, createdAt, _id }, index) => {
                const isLast = index === categories.length - 1;
                const classes = isLast
                  ? "p-4"  
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {formatDate(createdAt)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Link to={`/admin/categories/edit-category/${_id}`}>
                        <Typography
                          variant='small'
                          color='blue'
                          className='font-medium'
                        >
                          Edit
                        </Typography>
                      </Link>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          Page 1 of 10
        </Typography>
        <div className='flex gap-2'>
          <Button
            variant='outlined'
            disabled={currentPage === 1}
            onClick={goToPreviousPage}
            color='blue-gray'
            size='sm'
          >
            Previous
          </Button>
          <Button
            disabled={currentPage === totalPages}
            variant='outlined'
            onClick={goToNextPage}
            color='blue-gray'
            size='sm'
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ListCategories;
