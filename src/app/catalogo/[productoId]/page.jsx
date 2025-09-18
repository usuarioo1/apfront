"use client";
import React, { useEffect, useState, useContext } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { CartContext } from "@/contexts/CartContext";
import { useParams } from "next/navigation";
import Link from "next/link";

// Utilidad para buscar el producto en todas las categorías
import { getAccesorios } from "../../accesorios/accesoriosApi";
import { getAros } from "../../aros/arosApi";
import { getCadenas } from "../../cadenas/cadenasApi";
import { getColgantes } from "../../colgantes/colgantesApi";
import { getCollares } from "../../collares/collaresApi";
import { getConjuntos } from "../../conjuntos/conjuntosApi";
import { getFiguras } from "../../figuras/figurasApi";
import { getPulseras } from "../../pulseras/pulserasApi";

const fetchAllProductos = async () => {
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
    return [
        ...accesorios,
        ...aros,
        ...cadenas,
        ...colgantes,
        ...collares,
        ...conjuntos,
        ...figuras,
        ...pulseras,
    ];
};

export default function CatalogoProductoIdPage() {
    const params = useParams();
    const { productoId } = params;
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        const fetchProducto = async () => {
            setLoading(true);
            const productos = await fetchAllProductos();
            const found = productos.find(
                (p) => p._id === productoId || p.id === productoId
            );
            setProducto(found || null);
            setLoading(false);
        };
        fetchProducto();
    }, [productoId]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div></div>;
    }
    if (!producto) {
        return <div className="text-center mt-20 text-xl">Producto no encontrado</div>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 p-6">
            <Zoom>
                <img src={producto.img} alt={producto.name} className="object-contain w-full h-80 mb-4 rounded cursor-zoom-in" />
            </Zoom>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">{producto.name}</h1>
                    <p className="text-gray-600 mb-1">Código: {producto.codigo || ""}</p>
                    <p className="text-gray-600 mb-1">Stock: {producto.stock}</p>
                    <div className="my-2">
                        <span className="text-gray-900 font-bold text-lg mr-4">Precio: ${producto.precio}</span>
                        <span className="text-blue-700 font-semibold text-base mr-4">Por mayor: ${Math.round(producto.precio / 1.5)}</span>
                    </div>
                </div>
                <button
                    onClick={() => addItem(producto)}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 self-start md:self-center"
                >
                    Agregar al carrito
                </button>
            </div>
            <p className="text-gray-600 mb-4">{producto.descripcion}</p>
            <div>
                <Link href="/catalogo" className="text-blue-700 hover:underline">Volver al catálogo</Link>
            </div>
        </div>
    );
}
