import React, { useState, ChangeEvent, FormEvent } from 'react';
import ToggleDarkWhite from './ToggleDarkWhite';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import ramdonAuthMessages from '../../../ramdonAuthMessages/ramdon';
import toast, { Toaster } from 'react-hot-toast';

type FormData = {
  nombre: string;
  apellido: string;
  email: string;
  contraseña: string;
  confirmarContraseña: string;
};

type FormData2 = {
  contactoRecuperacion: string;
};

export default function Registro() {
  const [esRegistro, setRegistro] = useState(false);
  const [recuperar, setRecuperar] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  const [formData2, setFormData2] = useState<FormData2>({
    contactoRecuperacion: '',
  });

  const rol = Cookies.get('rol');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData2((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (esRegistro) {
        try {
            // Envío por axios los datos del formulario
            const response = await axios.post('/api/Usuario/registrarUsuario', {
                nombre: formData.nombre,
                apellido: formData.apellido,
                email: formData.email,
                contrasena: formData.contraseña,
                confirmarContrasena: formData.contraseña,
            });

            console.log('Respuesta:', response.data);

            if (response.data.success) {
                toast.success('Registro exitoso');
            } else {
                toast.error('Error al registrar: ' + response.data.error);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error('Error de Axios: ' + error.message);
                console.error('Axios error:', error.response?.data || error.message);
            } else {
                toast.error('Error desconocido: ');
                console.error('Unknown error:', error);
            }
        }
    } else if (recuperar && rol === 'INCOGNITO') {
        try {
            const ramdon = ramdonAuthMessages();
            const response = await axios.post('/api/RecuperacionContrasena/enviarEmail', {
                contactoRecuperacion: formData2.contactoRecuperacion,
                ramdon: ramdon
            });

            if (response.data) {
                router.push('/Paginas/Recuperar');
            } else if (response.data.error) {
                toast.error('Error al enviar el correo: ' + response.data.error);
            } 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error('Error de Axios: ' + error.message);
                console.error('Axios error:', error.response?.data || error.message);
            } else {
                toast.error('Error desconocido: ');
                console.error('Unknown error:', error);
            }
        }
    } else {
        try {
            // Envío por axios los datos del formulario      
            const response = await axios.post('/api/Usuario/inicioSesionUsuario', {
                email: formData.email,
                contrasena: formData.contraseña,
            });

            if (response.data.success) {
                toast.success('Inicio de sesión exitoso');
                const rolNuevo = response.data.response.rol;
                const idUsuario = response.data.response.id;
                Cookies.set('rol', rolNuevo);
                Cookies.set('idUsuario', idUsuario);
                router.push('/Paginas/Turista');
            } else {
                toast.error('Error al iniciar sesión: ' + response.data.error);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error('Error de Axios: ' + error.message);
                console.error('Axios error:', error.response?.data || error.message);
            } else {
                toast.error('Error desconocido: ' );
                console.error('Unknown error:', error);
            }
        }
    }
  };


  const inputsRegistro = [
    { id: 'nombre', type: 'text', placeholder: 'Nombre' },
    { id: 'apellido', type: 'text', placeholder: 'Apellido' },
    { id: 'email', type: 'email', placeholder: 'Email' },
    { id: 'contraseña', type: 'password', placeholder: 'Contraseña' },
    { id: 'confirmarContraseña', type: 'password', placeholder: 'Confirmar Contraseña' },
  ];

  const inputsRecuperar = [
    { id: 'contactoRecuperacion', type: 'text', placeholder: 'Email o Número de Teléfono' },
  ];

  return (
    <div className="flex items-center justify-center w-96 h-auto bg-gray-100 dark:bg-gray-600">
      <div className="fixed top-4 right-4">
        <ToggleDarkWhite />
      </div>
      <div className="w-full h-full p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center dark:text-white">
          {esRegistro ? 'Registro' : recuperar ? 'Recuperar Cuenta' : 'Inicio de Sesión'}
        </h1>
        <form onSubmit={handleSubmit}>
          {!esRegistro && !recuperar && (
            <>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="contraseña">
                  Contraseña
                </label>
                <input
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="contraseña"
                  type="password"
                  placeholder="Contraseña"
                  required
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {esRegistro && inputsRegistro.map(input => (
            <div className="mb-4" key={input.id}>
              <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor={input.id}>
                {input.placeholder}
              </label>
              <input
                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                value={formData[input.id as keyof FormData]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          {recuperar && (
            <>
              {inputsRecuperar.map(input => (
                <div className="mb-4" key={input.id}>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor={input.id}>
                    {input.placeholder}
                  </label>
                  <input
                    className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={formData2[input.id as keyof FormData2]}
                    onChange={handleChange2}
                    required
                  />
                </div>
              ))}
            </>
          )}
          
          <div className="mt-6">
            <button
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              {esRegistro ? 'Registrarse' : recuperar ? 'Recuperar Cuenta' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center dark:text-gray-300">
          {!esRegistro && !recuperar && (
            <>
              <p>¿Eres nuevo? <span className="text-blue-500 cursor-pointer" onClick={() => setRegistro(true)}>Regístrate</span></p>
              <p>¿Perdiste tu cuenta? <span className="text-blue-500 cursor-pointer" onClick={() => setRecuperar(true)}>Recupérala</span></p>
            </>
          )}
          {esRegistro && (
            <p>¿Ya tienes una cuenta? <span className="text-blue-500 cursor-pointer" onClick={() => setRegistro(false)}>Inicia Sesión</span></p>
          )}
          {recuperar && (
            <p>¿Recordaste tu cuenta? <span className="text-blue-500 cursor-pointer" onClick={() => setRecuperar(false)}>Inicia Sesión</span></p>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
