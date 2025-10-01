import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { BiBookOpen, BiSupport } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";
import { FaRankingStar } from "react-icons/fa6";

export default function Sidebar() {
    const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

    const menuItems = [
        {
            icon: <BsPerson size={24} />,
            content: 'Dashboard',
            link: '/dashboard'
        },
        {
            icon: <BiBookOpen size={24} />,
            content: 'Courses',
            link: '/courses'
        },
        {
            icon: <FaRankingStar size={24} />,
            content: 'Rankings',
            link: '/rankings'
        },
        {
            icon: <CiSettings size={24} />,
            content: 'Setting',
            link: '/setting'
        },
        {
            icon: <BiSupport size={24} />,
            content: 'Support',
            link: '/support'
        },
    ];

    return (
        <div
            className={`h-screen flex flex-col items-center bg-white border-r-[2px] border-gray-100 overflow-hidden absolute top-0 left-0 z-20 transition-all duration-300 ${sideBarIsOpen ? "w-56" : "w-12"
                }`}
        >
            {/* Toggle Button */}
            <div className="w-full h-12 flex justify-end bg-white">
                <button
                    onClick={() => setSideBarIsOpen(!sideBarIsOpen)}
                    className="size-12 flex items-center justify-center bg-white cursor-pointer"
                >
                    <MdArrowForwardIos
                        size={24}
                        className={`transition-transform duration-300 ${sideBarIsOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Menu Items */}
            {menuItems.map((item, idx) => (
                <Link
                    href={item.link}
                    key={idx}
                    className="w-full h-12 flex justify-end overflow-hidden hover:scale-105 hover:shadow-md transition-transform"
                >
                    {/* Smoothly expanding/closing content */}
                    <div
                        className={`transition-all duration-300 ease-in-out flex items-center bg-white ${sideBarIsOpen ? "w-44 opacity-100 px-2" : "w-0 opacity-0 px-0"
                            }`}
                    >
                        <span className="whitespace-nowrap">{item.content}</span>
                    </div>

                    {/* Icon stays fixed */}
                    <div className="size-12 flex items-center justify-center bg-white cursor-pointer">
                        {item.icon}
                    </div>
                </Link>
            ))}

        </div>
    );
}
