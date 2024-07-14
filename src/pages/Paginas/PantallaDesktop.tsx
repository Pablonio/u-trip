import React from 'react';
import ToggleDarkWhite from './Componentes/ToggleDarkWhite';
import InicioSesion from './Componentes/InicioDeSesion';

export default function PantallaDesktop() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <InicioSesion />
    </div>
  );
}