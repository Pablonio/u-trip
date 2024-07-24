import React, { useState, ChangeEvent, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

type FormData = {
  contactoRecuperacion: string;
  codigoRecuperacion: string;
  nuevaContrasena: string;
};

export default function Recuperar() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    contactoRecuperacion: '',
    codigoRecuperacion: '',
    nuevaContrasena: '',
  });

  const [step, setStep] = useState<number>(1); // Step 1: recovery form, Step 2: update password form

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      try {
        const response = await axios.post('/api/RecuperacionContrasena/comprobarCorreo', formData);
        if (!response.data.success) {
          alert(response.data.error || 'Error desconocido');
        } else {
          toast.success('Código de recuperación válido');
          Cookie.set("correo", formData.contactoRecuperacion); // Guarda el correo en la cookie
          setStep(2); 
        }
      } catch (error) {
        toast.error('Error al enviar el correo: ' + error);
      }
    } else if (step === 2) {
      try {
        const correo = Cookie.get("correo");
        const response = await axios.patch('/api/RecuperacionContrasena/actualizarContrasena', {
          correo: correo,
          contrasena: formData.nuevaContrasena,
        });
        console.log('Response:', response.data);
        if (!response.data.success) {
          toast.error(response.data.error || 'Error desconocido');
        } else {
          router.push('/Paginas/Turista');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar la contraseña');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-600">
      <div className="w-96 p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center dark:text-white">Recuperar Cuenta</h1>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="contactoRecuperacion">
                  Correo electrónico o número de teléfono
                </label>
                <input
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="contactoRecuperacion"
                  type="text"
                  value={formData.contactoRecuperacion}
                  onChange={handleChange}
                  placeholder="Correo electrónico o número de teléfono"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="codigoRecuperacion">
                  Código de recuperación
                </label>
                <input
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="codigoRecuperacion"
                  type="text"
                  value={formData.codigoRecuperacion}
                  onChange={handleChange}
                  placeholder="Código de recuperación"
                />
              </div>
            </>
          )}
          {step === 2 && (
            <div className="mb-4">
              <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="nuevaContrasena">
                Nueva Contraseña
              </label>
              <input
                className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="nuevaContrasena"
                type="password"
                value={formData.nuevaContrasena}
                onChange={handleChange}
                placeholder="Nueva Contraseña"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {step === 1 ? 'Recuperar Cuenta' : 'Actualizar Contraseña'}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
