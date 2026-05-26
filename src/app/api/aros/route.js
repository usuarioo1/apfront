import { NextResponse } from 'next/server';

// Esta ruta maneja GET /api/aros
export async function GET(request) {
    try {
        // Obtenemos la URL del backend desde las variables de entorno del SERVIDOR
        const backendUrl = process.env.API_URL_AROS;
        // Realizamos la petición al backend desde el servidor
        const res = await fetch(`${backendUrl}/aros`, {
<<<<<<< HEAD
=======
            next: { revalidate: 10 },
>>>>>>> 5e60b9f1973f6644a1165f08fc5d480daf8228db
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Backend responded with status: ${res.status}`);
        }

        const data = await res.json();
<<<<<<< HEAD
        return NextResponse.json(data, { status: 200 });
=======
        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
            }
        });
>>>>>>> 5e60b9f1973f6644a1165f08fc5d480daf8228db
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
