'use client'
import React from 'react'
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsAppButton({ phoneNumber, message }) {
    const handleClick = () => {
        const encodedMessage = encodeURIComponent(message)
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
        window.open(whatsappUrl, '_blank')
    }

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 hover:scale-110"
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle size={28} />
        </button>
    )
}

