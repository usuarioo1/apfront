import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const backendUrl = process.env.API_URL_AROS;
        const { id } = params;
        const res = await fetch(`${backendUrl}/aros/${id}`);
        if (!res.ok) {
            throw new Error(`Backend responded with status: ${res.status}`);
        }
        const data = await res.json();
        // El backend ya devuelve { success: true, info: producto }
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Error al obtener el aro', message: error.message }, { status: 500 });
    }
}
