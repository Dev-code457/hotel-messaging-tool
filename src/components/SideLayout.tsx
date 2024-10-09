import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation'; // Importing usePathname
import Logo from "@/app/assets/Logo.svg";
import Image from 'next/image';

function SideLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname(); // Get the current pathname
 
  
console.log(pathname,"knsjknskfnsdfnlsdf");

  const links = [
    { name: 'Add Number Database', path: '/add-number-database' },
    { name: 'Check In/ Check Out', path: '/CheckInOut' },
    { name: 'Promotions/ Offers', path: '/promotions-offers' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Change Password', path: '/change-password' },
    { name: 'Logout', path: '/logout' },
  ];

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg sm:hidden hover:bg-gray-550 focus:outline-none focus:ring-2 dark:text-gray-400"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-black">
          <ul className="space-y-8 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center -mt-6  rounded-lg  hover group"
              >
                <Image src={Logo} alt="LOGO" className="w-full h-full" />
              </a>
            </li>
            {links.map(link => (
              <li key={link.path}>
                  <a
                  href={link.path}
                  className={`flex items-center justify-start rounded-lg  group ${
                    pathname === link.path
                      ? ' text-[#EF5C5C] ' // Glass effect for active link
                      : 'text-white '
                  }`}
                >
                  <p>{link.name}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {children}
    </>
  );
}

export default SideLayout;
