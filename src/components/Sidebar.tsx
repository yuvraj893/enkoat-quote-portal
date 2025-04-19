import React from 'react';
import { X, BarChart3, FileText, Users, Home, Settings, HelpCircle } from 'lucide-react';
import Logo from '../assets/logo';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const navigation = [
    { name: 'Home', icon: Home, current: false },
    { name: 'Dashboard', icon: BarChart3, current: true },
    { name: 'Quotes', icon: FileText, current: false },
    { name: 'Contractors', icon: Users, current: false },
    { name: 'Settings', icon: Settings, current: false },
    { name: 'Help', icon: HelpCircle, current: false },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-in-out duration-300 lg:hidden z-20 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`fixed inset-y-0 left-0 flex flex-col max-w-xs w-full bg-white shadow-lg transform transition ease-in-out duration-300 z-30 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:h-screen`}
      >
        <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 bg-white">
          <div className="flex items-center">
            <div className="h-8 w-8 flex items-center justify-center text-green-600">
              <Logo />
            </div>
            <span className="ml-2 text-lg font-semibold text-green-600">EnKoat</span>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    item.current ? 'text-green-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex-shrink-0 group block">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Sarah Johnson
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  Account Manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};