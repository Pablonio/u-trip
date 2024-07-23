import React from "react";
import {useEffect, useState} from 'react';
import axios from 'axios';

type Usuario = {
  id:number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  telefono: string | null;
  direccion: string | null;
}

const ListaUsuarios =()=>{
  const Users = [];
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  useEffect(()=>{
    const fetchUsuarios = async ()=>{
      try{
        const response = await axios.get('/api/Usuario/recuperarusuarios');
        console.log(response.data.response)
        if (response.data.success){
          setUsuarios(response.data.response);
          
        }else{
          console.error('Fallo al obtener los usuarios:',response.data.error);
        }
      } catch(error){
        console.error('Fallo al conectarse con la API:',error);
      }
    };
    fetchUsuarios();
  },[]);

  return (
  <div className="">
      <h1 className="text-center text-2xl font-bold mb-4">Usuarios</h1>
      {usuarios.length === 0?(
        <span className="block p-4 bg-yellow-100 text-yellow-900 rounded">No hay usuarios en la base de datos</span>
      ):(
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Direccion</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map((usuario:Usuario)=>(
              <tr key={usuario.id} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">{usuario.id}</td> 
                <td className="px-6 py-4 whitespace-nowrap">{usuario.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.rol}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.telefono}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.direccion}</td>
            </tr>
            ))} 
          </tbody>
        </table>
      )}     
    </div>
);
};
export default ListaUsuarios;
