import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="footer bg-base-300 text-base-content p-10">

            {/* Grid Layout for 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Company Section */}
                <nav className="flex flex-col items-center">
                    <h6 className="footer-title text-white">Empresa</h6>
                    <Link className="link link-hover" href='/about'>Sobre Nosotros</Link>
                    <Link className="link link-hover" href='/contacto'>Contacto</Link>
                    <Link className="link link-hover" href='/terminos'>Terminos y condiciones</Link>
                </nav>

                {/* Contact Section */}
                <nav className="flex flex-col items-center">
                    <h6 className="footer-title text-white">Contacto</h6>
                    <p>Monjitas 873 LOCAL 577,</p>
                    <p>Galería Plaza de Armas,</p>
                    <p>Santiago, Chile</p>
                </nav>

                {/* Larger Responsive Image */}
                <div className="flex justify-center">
                    <a href="https://getlogovector.com/mercado-pago-logo-vector-svg/" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://res.cloudinary.com/dpbpyzl96/image/upload/v1727738308/apweb/uaon8rdv9yujayialvro.png"
                            alt="Mercado Pago Logo"
                            className="w-40 h-auto md:w-52 lg:w-64"  // Increased size for all screen sizes
                        />
                    </a>
                </div>
                <div className="w-full text-center pt-8 border-t border-base-300">
                    <p className="text-sm">Todos los derechos reservados a <strong>Artesanías Pachy</strong> &copy; {new Date().getFullYear()}</p>
                </div>
            </div>

        </footer>
    )
}

export default Footer
