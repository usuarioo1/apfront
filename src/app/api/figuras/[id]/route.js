import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const backendUrl = process.env.API_URL_FIGURAS;
        const { id } = params;
        const res = await fetch(`${backendUrl}/figuras/${id}`);
        if (!res.ok) {
            throw new Error(`Backend responded with status: ${res.status}`);
        }
        const data = await res.json();
        return NextResponse.json({ success: true, info: data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Error al obtener la figura', message: error.message }, { status: 500 });
    }
}
