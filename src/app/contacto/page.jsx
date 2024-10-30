'use client'
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { apiContactos } from '@/utils/api';



export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(apiContactos, {
                name: formData.name,
                mail: formData.email, // Asegúrate de que coincida con el esquema del backend
                phone: formData.phone,
                message: formData.message
            });

            // Si el mensaje se envió correctamente, muestra una alerta de éxito
            Swal.fire({
                icon: 'success',
                title: 'Mensaje enviado',
                text: 'Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.'
            });

            // Reiniciar el formulario
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            // Si hay un error, muestra una alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde. Recuerda rellenar todos los campos.'
            });

            console.error('Error al enviar el mensaje:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Contáctanos</h1>
            <p className="text-gray-600 text-center mb-8">
                Si tienes algún problema no dudes en ponerte en contacto con nosotros, te responderemos a la brevedad.
            </p>
            <div className="max-w-md mx-auto">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Número de teléfono
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Mensaje
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                        >
                            Enviar mensaje
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
