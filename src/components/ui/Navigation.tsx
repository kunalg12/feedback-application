'use client';

import { Fragment } from 'react';
import { Button } from '@/components/ui/button';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
  department?: string;
  studentId?: string;
  facultyId?: string;
}

interface NavigationProps {
  user: User | null;
  logout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ user, logout, activeTab, setActiveTab }: NavigationProps) {
  const getNavigationItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'admin':
        return [
          { name: 'Dashboard', href: 'dashboard', current: activeTab === 'dashboard' },
          { name: 'Users', href: 'users', current: activeTab === 'users' },
          { name: 'Courses', href: 'courses', current: activeTab === 'courses' },
          { name: 'Reports', href: 'reports', current: activeTab === 'reports' },
        ];
      case 'faculty':
        return [
          { name: 'Dashboard', href: 'dashboard', current: activeTab === 'dashboard' },
          { name: 'My Courses', href: 'courses', current: activeTab === 'courses' },
          { name: 'Attendance', href: 'attendance', current: activeTab === 'attendance' },
          { name: 'Feedback', href: 'feedback', current: activeTab === 'feedback' },
        ];
      case 'student':
        return [
          { name: 'Dashboard', href: 'dashboard', current: activeTab === 'dashboard' },
          { name: 'My Courses', href: 'courses', current: activeTab === 'courses' },
          { name: 'My Attendance', href: 'attendance', current: activeTab === 'attendance' },
          { name: 'Submit Feedback', href: 'feedback', current: activeTab === 'feedback' },
        ];
      default:
        return [];
    }
  };

  const navigation = getNavigationItems();

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <h1 className="text-xl font-bold text-gray-900">Faculty Feedback System</h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Button
                      key={item.name}
                      onClick={() => setActiveTab(item.href)}
                      className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium shadow-none bg-transparent h-auto p-0 ${
                        item.current
                          ? 'border-blue-500 text-blue-700'
                          : 'border-transparent text-gray-500 hover:border-blue-400 hover:text-blue-700'
                      }`}
                    >
                      {item.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <div className="px-4 py-2 text-sm text-gray-700">
                            <div className="font-medium">{user?.name}</div>
                            <div className="text-gray-500">{user?.email}</div>
                            <div className="text-gray-500 capitalize">{user?.role}</div>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Button
                            onClick={logout}
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700 w-full text-left bg-transparent shadow-none`}
                          >
                            Sign out
                          </Button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="button"
                  onClick={() => setActiveTab(item.href)}
                  className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                    item.current
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <UserCircleIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  <div className="text-sm font-medium text-gray-500 capitalize">{user?.role}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="button"
                  onClick={logout}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 w-full text-left"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
