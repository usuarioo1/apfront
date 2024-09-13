'use client'
import React, { useEffect, useState } from 'react'
import { getAnillos } from './anillosApi'
import Link from 'next/link'

export default function ListaDeAnillos() {
    const [anillos, setAnillos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAnillos = async () => {
            try {
                const data = await getAnillos()
                setAnillos(data)
            } catch (error) {
                console.error('Error fetching anillos:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchAnillos()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Lista de Anillos</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {anillos.map((anillo) => (
                    <div key={anillo._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <Link href={`/anillos/${anillo._id}`}>
                        <div className="aspect-square relative">
                            <img
                                src={anillo.img}
                                alt={anillo.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        </Link>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{anillo.name}</h2>
                            <button className="w-full bg-gray-800 text-white text-sm py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300">
                                Comprar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}