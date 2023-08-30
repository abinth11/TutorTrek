import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className=' p-12'>
      <h1 className='text-3xl ml-5 font-semibold mb-4'>About Tutortrek</h1>
      <div className='flex flex-col md:flex-row space-x-0 md:space-x-8'>
        <div className='md:w-1/2 ml-5 '>
          <img
            src='https://res.cloudinary.com/dwucedjmy/image/upload/v1691134082/photo-1524178232363-1fb2b075b655_enawoh.avif'
            alt='About Tutortrek'
            className='rounded-lg  w-10/12 shadow-md'
          />
        </div>
        <div className='md:w-1/2 mt-5 md:mt-0'>
          <p className='text-gray-600 mb-4'>
            Welcome to Tutortrek, your ultimate destination for online learning
            and growth. We're on a mission to bring education to your
            fingertips, connecting passionate teachers with eager learners from
            around the world.
          </p>
          <p className='text-gray-600 mb-4'>
            Our platform offers a diverse range of courses, both free and paid,
            to cater to your learning needs. From mastering new skills to
            advancing your career, Tutortrek provides you with a dynamic
            learning experience that fits your schedule.
          </p>
          <p className='text-gray-600 mb-4'>
            What sets us apart is our thriving community. Engage in lively
            discussions with fellow learners and instructors, dive into
            collaborative projects, and exchange insights in our dedicated
            community spaces. And for those seeking a more interactive
            experience, our live channels provide real-time communication with
            teachers and peers.
          </p>
          <p className='text-gray-600'>
            Join Tutortrek today and embark on a journey of knowledge,
            empowerment, and connection. Let's explore, learn, and grow
            together!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
