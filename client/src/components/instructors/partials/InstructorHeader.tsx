import React from 'react';
import { Disclosure } from '@headlessui/react';
import { BiMenu, BiX } from 'react-icons/bi';
import SearchBar from '../../common/SearchBar';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Courses', href: '#', current: false },
  { name: 'Tutors', href: '#', current: false },
  { name: 'Community', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
];

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ');
}

const InstructorHeader:React.FC = () => {
  return (
    <>
      <div className="min-h-full bg-white border-b border-gray-300">
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/">
                        <img
                          className="h-8 w-8"
                          src="https://tailwindui.com/img/logos/mark-indigo-500.svg"
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-hoverBlue text-gray-800'
                                : 'text-gray-500 hover:bg-hoverBlue hover:text-gray-800',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                        <SearchBar />
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex justify-center items-center h-screen"></div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-200 p-2 text-gray-500 hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-200">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <BiX className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <BiMenu className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-hoverBlue text-gray-800'
                          : 'text-gray-500 hover:bg-hoverBlue hover:text-gray-800',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default InstructorHeader;
