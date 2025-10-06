import React from "react";

// CyberMondayBanner: muestra una franja si la fecha está dentro del rango del Cyber Monday
export default function CyberMondayBanner() {
    // // Fechas: desde domingo 24:00 (lunes 00:00) hasta miércoles 23:59
    // const now = new Date();
    // const year = now.getFullYear();
    // // Encuentra el próximo domingo
    // const dayOfWeek = now.getDay(); // 0=domingo
    // const daysToSunday = (7 - dayOfWeek) % 7;
    // const nextSunday = new Date(now);
    // nextSunday.setDate(now.getDate() + daysToSunday);
    // nextSunday.setHours(24, 0, 0, 0); // Lunes 00:00
    // // Cyber Monday inicia el lunes 00:00
    // const cyberStart = new Date(nextSunday);
    // // Termina el miércoles 23:59:59
    // const cyberEnd = new Date(cyberStart);
    // cyberEnd.setDate(cyberStart.getDate() + 2); // miércoles
    // cyberEnd.setHours(23, 59, 59, 999);

    // const isCyberMonday = now >= cyberStart && now <= cyberEnd;

    // if (!isCyberMonday) return null;

    return (
        <div className="w-full bg-gradient-to-r from-pink-600 to-indigo-600 text-white text-center py-2 font-bold text-lg shadow-md z-50">
            ¡Cyber Monday! 10% de descuento en todos los productos hasta el miércoles 🎉
        </div>
    );
}
