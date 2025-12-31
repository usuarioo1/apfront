import { NextResponse } from 'next/server';

// Esta ruta maneja GET /api/conjuntos
export async function GET(request) {
    try {
        // Obtenemos la URL del backend desde las variables de entorno del SERVIDOR
        const backendUrl = process.env.API_URL_CONJUNTOS;
        // Realizamos la petición al backend desde el servidor
        const res = await fetch(`${backendUrl}/conjuntos`, {
            next: { revalidate: 10 },
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Backend responded with status: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
            }
        });
    } catch (error) {
        console.error('Error fetching conjuntos:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Error al obtener los conjuntos',
                message: error.message
            },
            { status: 500 }
        );
    }
}
