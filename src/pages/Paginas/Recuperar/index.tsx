import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

type FormData = {
  contactoRecuperacion: string;
  codigoRecuperacion: string;
};

export default function Recuperar() {
  const [formData, setFormData] = useState<FormData>({
    contactoRecuperacion: '',
    codigoRecuperacion: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Recuperar:', formData);
    try {
      const response = await axios.post('/api/recover', formData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center w-96 h-96 bg-gray-100 dark:bg-gray-600">
      <div className="w-full h-full p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center dark:text-white">Recuperar Cuenta</h1>
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Recuperar Cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
