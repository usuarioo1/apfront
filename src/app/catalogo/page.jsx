'use client';
import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '@/contexts/CartContext';
import { getAccesorios } from '../accesorios/accesoriosApi';
import { getAros } from '../aros/arosApi';
import { getCadenas } from '../cadenas/cadenasApi';
import { getColgantes } from '../colgantes/colgantesApi';
import { getCollares } from '../collares/collaresApi';
import { getConjuntos } from '../conjuntos/conjuntosApi';
import { getFiguras } from '../figuras/figurasApi';
import { getPulseras } from '../pulseras/pulserasApi';
import Link from 'next/link';


const CatalogoMasivo = () => {
	const [productos, setProductos] = useState([]);
	const [loading, setLoading] = useState(true);
	const { addItem } = useContext(CartContext);

	useEffect(() => {
		const fetchAll = async () => {
			setLoading(true);
			try {
				const [accesorios, aros, cadenas, colgantes, collares, conjuntos, figuras, pulseras] = await Promise.all([
					getAccesorios(),
					getAros(),
					getCadenas(),
					getColgantes(),
					getCollares(),
					getConjuntos(),
					getFiguras(),
					getPulseras(),
				]);
				setProductos([
					...accesorios,
					...aros,
					...cadenas,
					...colgantes,
					...collares,
					...conjuntos,
					...figuras,
					...pulseras,
				]);
			} catch (error) {
				console.error('Error cargando productos:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchAll();
	}, []);

	if (loading) {
		return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div></div>;
	}

	return (
		<div className="p-4 bg-gray-100 min-h-screen">
			<h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Catálogo Completo</h1>
			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
				{productos.map((producto) => (
					<div
						key={producto._id || producto.id}
						className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col min-h-[410px] h-full"
						style={{ minHeight: '410px' }}
					>
						<Link href={`/catalogo/${producto._id || producto.id}`}>
							<img src={producto.img} alt={producto.name} className="object-cover w-full h-48 hover:scale-105 transition-transform duration-200" />
						</Link>
						<div className="p-4 flex flex-col flex-1">
							<h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{producto.name}</h2>
							<p className="text-gray-600 text-sm mb-1">{producto.codigo || ''}</p>
							<div className="mb-2">
								<span className="text-gray-900 font-bold text-base mr-2">Precio: ${producto.precio}</span>
								<span className="text-blue-700 font-semibold text-sm mr-2">Por mayor: ${Math.round(producto.precio / 1.5)}</span>
							</div>
							<div className="mt-auto flex flex-col gap-2">
								<button
									onClick={() => addItem(producto)}
									className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-4 rounded-full transition-colors duration-300"
								>
									Agregar al carrito
								</button>
								<Link href={`/catalogo/${producto._id || producto.id}`} className="text-blue-700 hover:underline font-medium text-center">Ver detalle</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default function Page() {
	return <CatalogoMasivo />;
}
