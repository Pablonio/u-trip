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
    //prueba de edicion de perfil
    const[modoEdicion, setModoEdicion]=useState(false);
    const[nuevoNombre, setNuevoNombre]=useState('');
    const[nuevoApellido, setNuevoApellido]=useState('');
    const[nuevoEmail, setNuevoEmail]=useState('');
    const[nuevoTelefono, setNuevoTelefono]=useState('');
    const[nuevaDireccion, setNuevaDireccion]=useState('');
    const[nuevaFotoPerfil, setNuevaFotoPerfil]=useState('');
    const[nuevoSexo, setNuevoSexo]=useState('');
    const[nuevaFechaNacimiento, setNuevaFechaNacimiento]=useState<string | null>(null);
    //constantes que almacenan los nuevos datos

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/api/Usuario/recuperarUnUsuario', {
                 id: idUser
                });
                console.log('Respuesta:', response.data);
                setNombre(response.data.response.nombre);
                setApellido(response.data.response.apellido);
                setEmail(response.data.response.email);
                setTelefono(response.data.response.telefono);
                setDireccion(response.data.response.direccion);
                setFechaNacimiento(response.data.response.fechaNacimiento ? new Date(response.data.response.fechaNacimiento).toLocaleDateString():null);
                setFotoPerfil(response.data.response.fotoPerfil);
                setSexo(response.data.response.sexo);

                //Setear los nuevos valores añadidos
                setNuevoNombre(response.data.response.nombre);
                setNuevoApellido(response.data.response.apellido);
                setNuevoEmail(response.data.response.email);
                setNuevoTelefono(response.data.response.telefono);
                setNuevaDireccion(response.data.response.direccion);
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        };

        fetchData();
    }, [idUser]);




    return (
        <div className=''>
            <div className='flex flex-col items-center justify-center h-96'>
                <div className='w-full max-w-xl'>
                    <img src={fotoPerfil? fotoPerfil: Sexo.Masculino? 'https://i.pinimg.com/236x/47/3f/f4/473ff487acf932216a9ee20e43c83575.jpg': Sexo.Femenino? 'https://i.pinimg.com/736x/17/ec/5c/17ec5c43fc9ed4d94ace97847f3f0183.jpg': 'https://th.bing.com/th/id/OIP.E65BBQbBgXimDkbQ0cS_9AAAAA?rs=1&pid=ImgDetMain'} alt='Foto de perfil' className='w-full h-48 object-cover rounded-lg' />
                    <div className='bg-white p-4 rounded shadow mb-4'>
                        <p>Nombre: {nombre}</p>
                        <p>Apellido: {apellido}</p>
                        <p>Email: {email}</p>
                        <p>Telefono: {telefono? telefono: 'Actualiza tus datos'}</p>
                        <p>Direccion: {direccion? direccion: 'Actualiza tus datos'}</p>
                        <p>Fecha de Nacimiento: {fechaNacimiento || 'Actualiza tus datos'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};