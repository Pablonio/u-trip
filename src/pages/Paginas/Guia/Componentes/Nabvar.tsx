import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">Travel Social</div>
        <div className="text-white">User Profile</div>
      </div>
    </nav>
  );
};

export default Navbar;