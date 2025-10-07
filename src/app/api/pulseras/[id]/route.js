import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const backendUrl = process.env.API_URL_PULSERAS;
        const { id } = params;
        // Validar que backendUrl no termina con /pulseras
        // Si termina, eliminarlo para evitar doble /pulseras
        const cleanUrl = backendUrl.endsWith('/pulseras') ? backendUrl.replace(/\/pulseras$/, '') : backendUrl;
        const res = await fetch(`${cleanUrl}/pulseras/${id}`);
        if (!res.ok) {
            throw new Error(`Backend responded with status: ${res.status}`);
        }
        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Error al obtener la pulsera', message: error.message }, { status: 500 });
    }
}
