import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function CarouselComponent() {
  return (
    <Carousel
      className='rounded-none h-[30rem]'
      autoplay={true}
      autoplayDelay={7000}
      loop={true}
    >
      <div className='relative h-full w-full'>
        <img
          src='https://res.cloudinary.com/dwucedjmy/image/upload/v1687722374/Tutor-Trek/09206fc2-d0f1-41f6-b714-36242be94ee7_zhgvax.jpg'
          alt='image 2'
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 grid h-full w-full items-center bg-black/75'>
          <div className='w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32'>
            <Typography
              variant='h1'
              color='white'
              className='mb-4 text-3xl md:text-4xl lg:text-5xl'
            >
              Welcome to TutorTrek
            </Typography>
            <Typography
              variant='lead'
              color='white'
              className='mb-12 opacity-80'
            >
              Enhance your knowledge and skills with our comprehensive courses
              taught by expert instructors.
            </Typography>
            <div className='flex gap-2'>
              <Link to='/courses'>
                <Button size='lg' color='white'>
                  Explore Courses
                </Button>
              </Link>
              <Link to='/about'>
                <Button size='lg' color='white' variant='text'>
                  About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='relative h-full w-full'>
        <img
          src='https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
          alt='image 1'
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 grid h-full w-full place-items-center bg-black/75'>
          <div className='w-3/4 text-center md:w-2/4'>
            <Typography
              variant='h1'
              color='white'
              className='mb-4 text-3xl md:text-4xl lg:text-5xl'
            >
              Learn Anytime, Anywhere
            </Typography>
            <Typography
              variant='lead'
              color='white'
              className='mb-12 opacity-80'
            >
              Access our courses from the comfort of your own home and learn at
              your own pace. No restrictions or time limits.
            </Typography>
            <div className='flex justify-center gap-2'>
              <Link to='/courses'>
                <Button size='lg' color='white'>
                  Browse Courses
                </Button>
              </Link>
              <Link to='#'>
                <Button size='lg' color='white' variant='text'>
                  FAQs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='relative h-full w-full'>
        <img
          src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxlYXJuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
          alt='image 3'
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 grid h-full w-full items-end bg-black/75'>
          <div className='w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32'>
            <Typography
              variant='h1'
              color='white'
              className='mb-4 text-3xl md:text-4xl lg:text-5xl'
            >
              Expand Your Knowledge
            </Typography>
            <Typography
              variant='lead'
              color='white'
              className='mb-12 opacity-80'
            >
              Discover new subjects and gain expertise in your area of interest.
              Our platform offers a wide range of courses to cater to your
              learning goals.
            </Typography>
            <div className='flex gap-2'>
              <Link to='/courses'>
                <Button size='lg' color='white'>
                  Start Learning
                </Button>
              </Link>
              <Link to='#'>
                <Button size='lg' color='white' variant='text'>
                  Testimonials
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
