import { FaGlobe } from 'react-icons/fa';

export default function Component() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid gap-8 px-4 md:px-6 mx-auto">
                {/* Sección de "Quienes Somos" en español */}
                <div className="grid gap-4 justify-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Quienes Somos</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed">
                        Artesanías Pachy es una empresa dedicada a satisfacer eficientemente las demandas de nuestros clientes mediante la producción de piezas artesanales de alta calidad. Nuestra fabricación se complementa con piezas estampadas y micro fusión, lo que nos permite ofrecer un servicio ágil y efectivo.
                    </p>
                </div>

                {/* Sección de "Quienes Somos" en inglés */}
                <div className="grid gap-4 justify-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Who We Are</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed">
                        Artesanías Pachy is a company dedicated to efficiently meeting the demands of our clients through the production of high-quality handcrafted pieces. Our manufacturing is complemented by stamped pieces and micro fusion, allowing us to offer an agile and effective service.
                    </p>
                </div>

                {/* Sección de Misión, Visión y Valores */}
                <div className="grid gap-4 justify-center">
                    <h3 className="text-2xl font-bold">Misión, Visión y Valores</h3>
                    <div className="grid gap-2 justify-center">
                        <div className="flex items-start gap-4">
                        <FaGlobe className="h-6 w-6 text-blue-700 " />
                            <div>
                                <h4 className="font-semibold">Misión</h4>
                                <p className="text-muted-foreground">
                                    Ser la principal referencia en joyería de lapislázuli, ofreciendo productos de excelencia que reflejen la belleza y la riqueza cultural de Chile.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <FaGlobe className="h-6 w-6 text-blue-700 " />
                            <div>
                                <h4 className="font-semibold">Visión</h4>
                                <p className="text-muted-foreground">
                                    Convertirnos en la marca de joyería de lapislázuli más reconocida a nivel internacional, llevando la belleza y la calidad de nuestros productos a todo el mundo.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                        <FaGlobe className="h-6 w-6 text-blue-700 " />
                            <div>
                                <h4 className="font-semibold">Valores</h4>
                                <p className="text-muted-foreground">
                                    Pasión, Excelencia, Innovación, Responsabilidad y Compromiso con la Comunidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
