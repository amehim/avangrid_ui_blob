import React from "react";

const Header = ({ activePage, setActivePage }) => {
  const navItems = [
    {
      label: "TALKDESK",
      activeClass: "bg-emerald-600 text-white shadow-xl scale-110 ring-4 ring-emerald-300",
      inactiveClass: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-800"
    },
    {
      label: "VPI",
      activeClass: "bg-blue-600 text-white shadow-xl scale-110 ring-4 ring-blue-300",
      inactiveClass: "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800"
    },
    {
      label: "NICE",
      activeClass: "bg-green-600 text-white shadow-xl scale-110 ring-4 ring-green-300",
      inactiveClass: "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800"
    },
    {
      label: "GENESYS",
      activeClass: "bg-purple-600 text-white shadow-xl scale-110 ring-4 ring-purple-300",
      inactiveClass: "bg-purple-100 text-purple-700 hover:bg-purple-200 hover:text-purple-800"
    }
    
  ];

  return (
    <div className="container grid grid-cols-4 gap-6 p-6">
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => setActivePage(item.label)}
          className={`
            text-sm
            px-4
            py-3
            rounded-lg
            text-center
            font-semibold
            transition-all
            duration-300
            ease-in-out
            transform
            ${activePage === item.label ? item.activeClass : item.inactiveClass}
          `}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Header;