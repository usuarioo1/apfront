import { FaBullseye, FaGlobe, FaHeart } from 'react-icons/fa';

export default function Component() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid gap-8 px-4 md:px-6 md:grid-cols-2 mx-auto">
                <div className="grid gap-4 justify-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Quienes Somos</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Somos una empresa chilena de joyería especializada en el lapislázuli, con más de 40 años de trayectoria en
                        el mercado nacional. Nuestro compromiso es brindar a nuestros clientes productos de la más alta calidad,
                        elaborados con el cuidado y la pasión que caracterizan a nuestra marca.
                    </p>
                </div>
                <div className="grid gap-8 justify-center">
                    <div className="grid gap-4 justify-center">
                        <h3 className="text-2xl font-bold">Misión, Visión y Valores</h3>
                        <div className="grid gap-2 justify-center">
                            <div className="flex items-start gap-4">
                                <FaBullseye className="h-6 w-6 text-blue-700 " />
                                <div>
                                    <h4 className="font-semibold">Misión</h4>
                                    <p className="text-muted-foreground">
                                        Ser la principal referencia en joyería de lapislázuli, ofreciendo productos de excelencia que
                                        reflejen la belleza y la riqueza cultural de Chile.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FaGlobe className="h-6 w-6 text-blue-700 " />
                                <div>
                                    <h4 className="font-semibold">Visión</h4>
                                    <p className="text-muted-foreground">
                                        Convertirnos en la marca de joyería de lapislázuli más reconocida a nivel internacional, llevando la
                                        belleza y la calidad de nuestros productos a todo el mundo.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FaHeart className="h-6 w-6 text-blue-700 " />
                                <div>
                                    <h4 className="font-semibold">Valores</h4>
                                    <p className="text-muted-foreground">
                                        Pasión, Excelencia, Innovación, Responsabilidad y Compromiso con la Comunidad.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 justify-center">
                        <h3 className="text-2xl font-bold">Historia</h3>
                        <p className="text-muted-foreground">
                            Nuestra empresa fue fundada en 1980 por un grupo de artesanos apasionados por el lapislázuli, una piedra
                            preciosa única en el mundo que se encuentra principalmente en las minas de la región de Antofagasta, en el
                            norte de Chile. Desde entonces, hemos trabajado incansablemente para preservar y difundir la belleza y la
                            riqueza cultural de este material, convirtiéndonos en líderes en la industria joyera chilena.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
