import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const backendUrl = process.env.API_URL_ANILLOS;
        const { id } = params;
        const res = await fetch(`${backendUrl}/anillos/${id}`);
        if (!res.ok) {
            throw new Error(`Backend responded with status: ${res.status}`);
        }
        const data = await res.json();
        return NextResponse.json({ success: true, info: data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Error al obtener el anillo', message: error.message }, { status: 500 });
    }
}
