import { NextResponse } from 'next/server';

// Esta ruta maneja GET /api/aros
export async function GET(request) {
    try {
        // Obtenemos la URL del backend desde las variables de entorno del SERVIDOR
        const backendUrl = process.env.API_URL_AROS;
        // Realizamos la petición al backend desde el servidor
        const res = await fetch(`${backendUrl}/aros`, {
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            throw new Error(`Backend responded with status: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
            }
        });
    } catch (error) {
        console.error('Error fetching aros:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Error al obtener los aros',
                message: error.message
            },
            { status: 500 }
        );
    }
}
