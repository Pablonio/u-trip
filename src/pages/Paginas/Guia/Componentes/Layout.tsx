import React from 'react';
import Navbar from '../Componentes/Navbar';
import Sidebar from './Sidebar';
import Messaging from '../../Guia/Componentes/Messaging';
import Feed from './Feed';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <Feed />
        <Messaging />
      </div>
    </div>
  );
};
