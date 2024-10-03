export default function Component() {
    return (
        <div className="flex items-center justify-center h-auto bg-[#f0f4f8] rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row w-full max-w-7xl">
                <div className="w-full lg:w-2/5 mb-4 lg:mb-0">
                    <img
                        src="https://res.cloudinary.com/dpbpyzl96/image/upload/v1725586656/apweb/grghquqmxhrlbfc4aa1c.webp"
                        alt="Lapis Lazuli"
                        className="object-cover h-full w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none"
                    />
                </div>
                <div className="w-full lg:w-3/5 p-4 lg:p-8 bg-[#f0f4f8]">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#2c4b6c]">Lapislázuli</h2>
                        {/* <div className="mt-2 sm:mt-0 px-4 py-2 text-center text-[#2c4b6c] bg-[#d8e3f0] rounded-lg">
                            Explora Ahora
                        </div> */}
                    </div>
                    <div className="mt-4 text-[#2c4b6c] text-lg lg:text-xl">
                        <p>
                            El lapislázuli, con su profundo azul adornado por destellos dorados, ha sido venerado a lo largo de los siglos por su belleza y misticismo. Esta gema excepcional está compuesta principalmente de lazurita, con inclusiones de pirita que le otorgan su brillo característico, y calcita que añade un toque de blancura.
                        </p>
                        <p className="mt-2">
                            Desde las civilizaciones antiguas, el lapislázuli ha sido utilizado en joyería, arte y decoración, representando poder y sabiduría. Además de su valor estético, se le atribuyen propiedades curativas y espirituales, siendo considerado un amuleto protector que favorece la claridad mental y la expresión de la verdad interior.
                        </p>
                        <p className="mt-2">
                            En el mundo moderno, el lapislázuli sigue siendo un símbolo de elegancia y sofisticación, perfecto para aquellos que buscan una joya única que cuente una historia ancestral de realeza y espiritualidad.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
