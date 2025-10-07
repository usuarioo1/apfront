import { NextResponse } from 'next/server';

// Esta ruta maneja GET /api/accesorios/[id]
export async function GET(request, { params }) {
    try {
        // Obtenemos el ID desde los parámetros de la URL
        const { id } = params;
        
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID es requerido' },
                { status: 400 }
            );
        }

        // Obtenemos la URL del backend desde las variables de entorno del SERVIDOR
        const backendUrl = process.env.API_URL_ACCESORIOS
        
        // Realizamos la petición al backend
        const res = await fetch(`${backendUrl}/accesorios/${id}`, {
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            if (res.status === 404) {
                return NextResponse.json(
                    { success: false, error: 'Accesorio no encontrado' },
                    { status: 404 }
                );
            }
            throw new Error(`Backend responded with status: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json({ success: true, info: data }, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
            }
        });

    } catch (error) {
        console.error('Error fetching accesorio by ID:', error);
        
        return NextResponse.json(
            { 
                success: false, 
                error: 'Error al obtener el accesorio',
                message: error.message 
            },
            { status: 500 }
        );
    }
}
