import React, { useEffect, useState } from "react";
import axios from 'axios';

type Usuario = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
  telefono: string | null;
  direccion: string | null;
}

export default function ListaUsuarios () {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editandoUsuarioId, setEditandoUsuarioId] = useState<number | null>(null);
  const [nuevoRolUsuario, setNuevoRolUsuario] = useState<string>('');
  const [busqueda, setBusqueda] = useState<string>('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('/api/Usuario/recuperarusuarios',{params: {search: busqueda || ''}});
        if (response.data.success) {
          setUsuarios(response.data.response);
        } else {
          console.error('Fallo al obtener los usuarios:', response.data.error);
        }
      } catch (error) {
        console.error('Fallo al conectarse con la API:', error);
      }
    };
    fetchUsuarios();
  }, [busqueda]);

  const handleEditarRol = (id: number, rolActual: string) => {
    setEditandoUsuarioId(id);
    setNuevoRolUsuario(rolActual);
  };

  const handleGuardarRol = async (id: number) => {
    try {
      const response = await axios.patch('/api/Usuario/actualizarUsuario', {
        idUsuario: id,
        rol: nuevoRolUsuario
      });
      if (response.data.success) {
        const updatedUsuarios = usuarios.map(usuario =>
          usuario.id === id ? { ...usuario, rol: nuevoRolUsuario } : usuario
        );
        setUsuarios(updatedUsuarios);
        setEditandoUsuarioId(null);
      } else {
        console.error('Fallo al editar el rol:', response.data.error);
      }
    } catch (error) {
      console.error('Fallo al conectar con la API:', error);
    }
  };

  const handleChangeNuevoRol = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNuevoRolUsuario(e.target.value);
  };

  const handleChangeBusqueda = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setBusqueda(e.target.value);
  }

  return (
    <div className="max-w-auto mx-auto p-8 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-center text-2xl font-bold mb-4">Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por nombre, apellido o email"
        value={busqueda}
        onChange={handleChangeBusqueda}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-lg"
      />
      {usuarios.length === 0 ? (
        <span className="block p-4 bg-yellow-100 text-yellow-900 rounded">No hay usuarios en la base de datos</span>
      ) : (
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map((usuario: Usuario) => (
              <tr key={usuario.id} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">{usuario.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editandoUsuarioId === usuario.id ? (
                    <select
                      value={nuevoRolUsuario}
                      onChange={handleChangeNuevoRol}
                      className="border border-gray-300 px-2 py-1 rounded"
                    >
                      <option value="GUIA">GUIA</option>
                      <option value="TURISTA">TURISTA</option>
                      <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                      <option value="BANEADO">BANEADO</option>
                    </select>
                  ) : (
                    usuario.rol
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.telefono}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.direccion}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editandoUsuarioId === usuario.id ? (
                    <button
                      onClick={() => handleGuardarRol(usuario.id)}
                      className="bg-cean-l hover:bg-cean-2l text-white font-bold py-2 px-4 rounded"
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditarRol(usuario.id, usuario.rol)}
                      className="bg-teal-dark hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                    >
                      Editar Rol
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
