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

	const parsePrice = (value) => {
		const numberValue = Number(value);
		return Number.isFinite(numberValue) ? numberValue : null;
	};

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
				{productos.map((producto) => {
					const precioDetalle = parsePrice(producto.precio) ?? 0;
					const precioMayor = parsePrice(producto.precio_por_mayor);
					const precioMayorFinal = precioMayor ?? precioDetalle;

					return (
						<div key={producto._id || producto.id} className="rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
							<Link href={`/catalogo/${producto._id || producto.id}`} className="block">
								<div className="aspect-square bg-zinc-50 p-3">
									<img src={producto.img} alt={producto.name} className="w-full h-full object-contain" />
								</div>
							</Link>
							<div className="p-4 flex flex-col flex-grow">
								<h2 className="text-base font-semibold text-zinc-900 line-clamp-2 min-h-[48px]">{producto.name}</h2>
								<p className="text-zinc-500 text-sm mt-2">{producto.codigo || ''}</p>
								<div className="mt-3 space-y-2 text-sm">
									<div className="flex justify-between items-center border-b border-zinc-100 pb-2">
										<span className="text-zinc-500">Detalle</span>
										<span className="font-semibold text-zinc-900">${Math.round(precioDetalle)}</span>
									</div>
									<div className="flex justify-between items-center border-b border-zinc-100 pb-2">
										<span className="text-zinc-500">Mayor</span>
										<span className="font-semibold text-zinc-900">${Math.round(precioMayorFinal)}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-zinc-500">Stock</span>
										<span className="font-medium text-zinc-700">{producto.stock}</span>
									</div>
								</div>
								<div className="mt-4 flex flex-col gap-2">
									<button
										onClick={() => addItem(producto)}
										className="w-full rounded-full border border-zinc-900 bg-zinc-900 text-white py-2.5 text-sm font-medium hover:bg-zinc-800 transition-colors duration-200"
									>
										Agregar al carrito
									</button>
									<Link href={`/catalogo/${producto._id || producto.id}`} className="text-zinc-700 hover:text-zinc-900 hover:underline text-sm font-medium text-center">Ver detalle</Link>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default function Page() {
	return <CatalogoMasivo />;
}
