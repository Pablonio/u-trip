import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import { Sexo } from '@prisma/client';

export default function PerfilUsuario(){
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState<string | null>(null);
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [sexo, setSexo] = useState('');
    const id = Cookie.get('idUsuario');
    const idUser = id ? parseInt(id, 10) : null;
    const [modoEdicion, setModoEdicion] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/api/Usuario/recuperarUnUsuario', {
                 id: idUser
                });
                const usuario = response.data.response;
                setNombre(usuario.nombre || '');
                setApellido(usuario.apellido || '');
                setEmail(usuario.email || '');
                setTelefono(usuario.telefono || '');
                setDireccion(usuario.direccion || '');
                setFechaNacimiento(usuario.fechaNacimiento ? new Date(usuario.fechaNacimiento).toLocaleDateString():null);
                setFotoPerfil(usuario.fotoPerfil || '');
                setSexo(usuario.sexo || Sexo.Masculino);

            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        };

        fetchData();
    }, [idUser]);

    const handleSave = async ()=>{
        try{
            await axios.patch('/api/Usuario/actualizardatos', {
                id: idUser,
                nombre,
                apellido,
                email,
                telefono,
                direccion,
                fotoPerfil,
                sexo,
                fechaNacimiento
            });
            setModoEdicion(false);
        } catch(error){
            console.error('Fallo al actualizar los datos:',error);
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900'>
            <div className='flex flex-col items-center justify-center p-4'>
                <div className='w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
                    <img src={fotoPerfil? fotoPerfil: Sexo.Masculino? 'https://i.pinimg.com/236x/47/3f/f4/473ff487acf932216a9ee20e43c83575.jpg': Sexo.Femenino? 'https://i.pinimg.com/736x/17/ec/5c/17ec5c43fc9ed4d94ace97847f3f0183.jpg': 'https://th.bing.com/th/id/OIP.E65BBQbBgXimDkbQ0cS_9AAAAA?rs=1&pid=ImgDetMain'} alt='Foto de perfil' className='w-full h-48 object-cover rounded-lg mb-4' />
                    <div className='space-y-4'>
                        {modoEdicion ?(
                            <div>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>
                                    Nombre: 
                                    <input type='text' value={nombre} onChange={(e)=>setNombre(e.target.value)} className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100'/>
                                </p>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>
                                    Apellido:
                                    <input type='text' value={apellido} onChange={(e)=>setApellido(e.target.value)} className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100'/>
                                </p>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>
                                    Email: 
                                    <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100'/>
                                </p>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>
                                    Telefono:
                                    <input type='text' value={telefono} onChange={(e)=>setTelefono(e.target.value)} className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100'/>
                                </p>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>
                                    Direccion:
                                    <input type='text' value={direccion} onChange={(e)=>setDireccion(e.target.value)} className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100'/>
                                </p>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>
                                    Sexo: 
                                    <select value={sexo} onChange={(e)=>setSexo(e.target.value as Sexo)} className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100'>
                                        <option value={Sexo.Masculino}>Masculino</option>
                                        <option value={Sexo.Femenino}>Femenino</option>
                                    </select>
                                </p>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>
                                    Fecha de Nacimiento:
                                    <input type='date' value={fechaNacimiento || ''} onChange={(e)=> setFechaNacimiento(e.target.value)} className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100'/>
                                </p>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>
                                    Foto de perfil:
                                    <input type='text' value={fotoPerfil} onChange={(e)=>setFotoPerfil(e.target.value)} className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100'/>
                                </p>  
                                <button className='bg-gray-500 text-white p-2 rounded shadow-sm hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700' onClick={handleSave}>Guardar</button>  
                                <button className='bg-gray-500 text-white p-2 rounded shadow-sm hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700' onClick={()=>setModoEdicion(false)}>Cancelar</button>
                            </div>
                        ):(
                            <div>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>Nombre: {nombre}</p>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>Apellido: {apellido}</p>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>Email: {email}</p>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>Telefono: {telefono? telefono: 'Actualiza tus datos'}</p>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>Direccion: {direccion? direccion: 'Actualiza tus datos'}</p>
                                <p className='block text-sm font-medium text-gray-900 dark:text-gray-100'>Fecha de Nacimiento: {fechaNacimiento || 'Actualiza tus datos'}</p>
                                <button className='bg-blue-500 text-white p-2 rounded shadow-sm hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700' onClick={()=>setModoEdicion(true)}>Editar</button>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}