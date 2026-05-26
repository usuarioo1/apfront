import { NextResponse } from 'next/server';

// Esta ruta maneja GET /api/accesorios
export async function GET(request) {
    try {
        // Obtenemos la URL del backend desde las variables de entorno del SERVIDOR
        // Nota: NO usa NEXT_PUBLIC_ por lo que no se expone al cliente
        const backendUrl = process.env.API_URL_ACCESORIOS

        // Realizamos la petición al backend desde el servidor
        const res = await fetch(`${backendUrl}/accesorios`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`Backend responded with status: ${res.status}`);
        }

        const data = await res.json();

        // Retornamos los datos al cliente
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Error fetching accesorios:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'Error al obtener los accesorios',
                message: error.message
            },
            { status: 500 }
        );
    }
}
