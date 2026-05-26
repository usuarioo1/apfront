import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const backendUrl = process.env.API_URL_CADENAS;
        const { id } = params;
        const res = await fetch(`${backendUrl}/cadenas/${id}`, {
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
        return NextResponse.json({ success: false, error: 'Error al obtener la cadena', message: error.message }, { status: 500 });
    }
}
