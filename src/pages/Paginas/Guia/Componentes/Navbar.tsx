import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-gray-800 font-bold">Travel Social</div>
      <div className="text-gray-800">User Profile</div>
    </div>
  </nav>
  );
};

export default Navbar;
