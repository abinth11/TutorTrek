import React from "react";
import { Disclosure,} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import SearchBar from "../../common/SearchBar";
import {Link} from 'react-router-dom'

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Courses", href: "/courses", current: false },
  { name: "Tutors", href: "/tutors", current: false },
  { name: "Community", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
];


function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const StudentHeader: React.FC = () => {
  return (
    <div className="bg-gray-100 m-2 shadow-lg">
      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link to="/">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <SearchBar />
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center">
                  <div className="space-x-4">
                    <Link to="/login">
                      <button className="bg-gray-500 hover:bg-gray-600 text-sm text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Login
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="bg-gray-500 hover:bg-gray-600 text-sm text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Register
                      </button>
                    </Link>
                    <Link to="/instructors/login">
                      <button className="bg-purple-800 hover:bg-purple-900 text-sm text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Instructor Login
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="mt-3 space-y-1 px-2">
                  <Link to="/login">
                    <button className="w-full mb-2 block rounded-md px-3 py-2 text-base font-medium bg-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="w-full mb-2 block rounded-md px-3 py-2 text-base font-medium bg-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white">
                      Register
                    </button>
                  </Link>
                  <Link to="/instructors/login">
                    <button className="w-full block bg-purple-800 hover:bg-purple-900 text-sm text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Instructor Login
                    </button>
                  </Link>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default StudentHeader;