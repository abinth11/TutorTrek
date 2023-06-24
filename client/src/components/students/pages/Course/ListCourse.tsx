import React from 'react'
import CourseCard from './CourseCard'
const ListCourse:React.FC = () =>{
    return (
        <div className='p-10 m-5 ml-8 flex flex-wrap space-x-6 '>
            <CourseCard/>
            <CourseCard/>
            <CourseCard/>
        </div>
    )
}

export default ListCourse