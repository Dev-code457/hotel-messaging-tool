import React, { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/app/public/assets/GoodPegg.png";
import Image from "next/image";
import Link from "next/link";
import Confirmation, { Warning } from "@/components/Confirmation";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { IoIosLock } from "react-icons/io";


function SideLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal, setIsModal] = useState(true);
  const value = useSelector((state: RootState) => state.example.value);
  const userDetail = useSelector((state: RootState) => state.hotel.details);

  const links = [
    { name: "Check In / Check Out", path: "/CheckInOut" },
    { name: "Add Number Database", path: "/AddNumber" },
    { name: "Promotions/ Offers", path: "/Promotion-Offer" },
    { name: "Feedback", path: "/FeedBack" },
    { name: "Logout", path: "#" },
  ];


  const handleLogout = async () => {
    try {
      Cookies.remove('__session', { path: '/' });
      toast.success("Logged out successfully");
      router.push('/');
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  };
  const isAuthenticated = Cookies.get("__session");

  const handleWarning = () => {
    router.push("/Payment")

  };

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
        <div className="h-full px-3 overflow-y-auto bg-black">

          <ul className="space-y-4 ml-2">
            <li>
              <Link
                href="/"
                className="flex items-center mr-4 justify-center rounded-lg hover group"
              >
                <Image src={Logo} alt="LOGO" className="w-[60%]" />
              </Link>
            </li>

            {!userDetail?.data?.User?.planType && (
              <div className="relative ml-2">
                {/* Links */}
                <ul className="bg-black p-4 rounded-lg space-y-4">
                  {links.map((link) => {
                    if (
                      value < 1 &&
                      ["Check In/ Check Out", "Promotions/ Offers", "Feedback"].includes(link.name)
                    ) {
                      return null;
                    }
                    return (
                      <li key={link.path}>
                        <Link
                          href={link.path}
                          className={"flex items-center justify-start rounded-lg group font-bold text-white "}
                          onClick={
                            link.name === "Logout"
                              ? (e) => {
                                e.preventDefault();
                                setIsModalOpen(true);
                              }
                              : undefined
                          }
                        >
                          <p>{link.name === "Logout" ? null : link.name}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Lock Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-75 shadow-lg flex items-center justify-center rounded-lg">
                  <div className="text-center text-white">
                    <div className="flex items-center justify-center mb-4 shadow-2xl">
                      <IoIosLock size={50} />
                    </div>

                    <button
                      onClick={() => router.push("/Payment")}
                      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
                    >
                      Unlock Now
                    </button>
                  </div>
                </div>
              </div>
            )}



            {(isAuthenticated && userDetail?.data?.User?.planType) ? (
              <>
                {links.map((link) => {

                  if (value < 1 && ["Check In/ Check Out", "Promotions/ Offers", "Feedback"].includes(link.name)) {
                    return null;
                  }
                  return (
                    <li key={link.path} className="ml-2">
                      <Link
                        href={link.path}
                        className={`flex items-center justify-start rounded-lg group font-bold  ${pathname === link.path ? " text-green-600 shadow-2xl shadow-blue-600" : "text-white "}`}
                        onClick={
                          link.name === "Logout"
                            ? (e) => {
                              e.preventDefault();
                              setIsModalOpen(true);
                            }
                            : undefined
                        }
                      >
                        <p>{link.name}</p>
                      </Link>
                    </li>
                  );
                })}
              </>
            ) : null}



          </ul>
        </div>
      </aside>
      <div className="h-screen">
        {children}
      </div>
      {
        value < 1 && (
          <Warning
            isOpen={isModal}
            onClose={() => setIsModal(false)}
            onConfirm={handleWarning}
          />
        )
      }


      {/* Confirmation Modal */}
      <Confirmation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

export default SideLayout;