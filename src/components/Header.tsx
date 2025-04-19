import React from 'react';
import { Menu, BellIcon, Download } from 'lucide-react';
import Logo from '../assets/logo';

interface HeaderProps {
  openSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ openSidebar }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 lg:hidden"
              onClick={openSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 flex items-center justify-center text-green-600">
                <Logo />
              </div>
              <span className="ml-2 text-lg font-semibold text-green-600">EnKoat</span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  id="user-menu-button"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="User"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}