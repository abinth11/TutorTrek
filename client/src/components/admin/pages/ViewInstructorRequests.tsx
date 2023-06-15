import React, { useState } from "react";
const peoples = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
];
const ViewInstructorRequests: React.FC = () => {
  const [people, setPeople] = useState(peoples);

  // Define the Person interface
  interface Person {
    email: string;
    imageUrl: string;
    name: string;
    role: string;
    lastSeen?: string;
    lastSeenDateTime?: string;
  }

  // Function to handle accepting a user request
  const acceptRequest = (email: string) => {
    // Implement your logic here
    console.log(`Accept request for user with email: ${email}`);
  };

  // Function to handle rejecting a user request
  const rejectRequest = (email: string) => {
    // Implement your logic here
    console.log(`Reject request for user with email: ${email}`);
  };

  return (
    <ul role='list' className='divide-y divide-gray-100'>
      {people.map((person) => (
        <li key={person.email} className='flex justify-between gap-x-6 py-5'>
          <div className='flex gap-x-4'>
            <img
              className='h-12 w-12 flex-none rounded-full bg-gray-50'
              src={person.imageUrl}
              alt=''
            />
            <div className='min-w-0 flex-auto'>
              <p className='text-sm font-semibold leading-6 text-gray-900'>
                {person.name}
              </p>
              <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                {person.email}
              </p>
            </div>
          </div>
          <div className='hidden sm:flex sm:flex-col sm:items-end'>
            <p className='text-sm leading-6 text-gray-900'>{person.role}</p>
            {person.lastSeen ? (
              <p className='mt-1 text-xs leading-5 text-gray-500'>
                Last seen{" "}
                <time dateTime={person.lastSeenDateTime}>
                  {person.lastSeen}
                </time>
              </p>
            ) : (
              <div className='mt-1 flex items-center gap-x-1.5'>
                <div className='flex-none rounded-full bg-emerald-500/20 p-1'>
                  <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                </div>
                <p className='text-xs leading-5 text-gray-500'>Online</p>
              </div>
            )}
          </div>
          <div className='flex gap-x-4'>
          <button
  onClick={() => acceptRequest(person.email)}
  className="p-1 m-3 rounded-md bg-green-600 text-white w-20 focus:outline-none focus:ring-2 focus:ring-green-600 hover:bg-green-700 hover:shadow-md"
>
  Accept
</button>
<button
  onClick={() => rejectRequest(person.email)}
  className="p-1 m-3 rounded-md bg-red-600 text-white w-20 focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-red-700 hover:shadow-md"
>
  Reject
</button>

          </div>
        </li>
      ))}
    </ul>
  );
};

export default ViewInstructorRequests;
