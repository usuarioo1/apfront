import React from 'react';
import Link from 'next/link';

const CardCategory = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 justify-items-center my-9">
            <Link href='/aros'>
                <div className="card bg-white w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">AROS</h2>
                    </div>
                    <figure>
                        <img
                            className=''
                            src="https://res.cloudinary.com/dpbpyzl96/image/upload/v1729644121/apweb/categorias/kceeikppxfbnmmvvf24n.jpg"
                            alt="Shoes" />
                    </figure>
                </div>
            </Link>
            <Link href='/colgantes'>
                <div className="card bg-white w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">COLGANTES</h2>
                    </div>
                    <figure>
                        <img
                            className=''
                            src="https://res.cloudinary.com/dpbpyzl96/image/upload/v1729644005/apweb/categorias/aytpslpajger7xqgphuw.jpg"
                            alt="Shoes" />
                    </figure>
                </div>
            </Link>
            <Link href='/pulseras'>
                <div className="card bg-white w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">PULSERAS</h2>
                    </div>
                    <figure>
                        <img
                            className=''
                            src="https://res.cloudinary.com/dpbpyzl96/image/upload/v1730500737/apweb/categorias/bhnzzfx46uj9jqgblnyc.jpg"
                            alt="Shoes" />
                    </figure>
                </div>
            </Link>
            <Link href='/conjuntos'>
                <div className="card bg-white w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">CONJUNTOS</h2>
                    </div>
                    <figure>
                        <img
                            className=''
                            src="https://res.cloudinary.com/dpbpyzl96/image/upload/v1729643715/apweb/categorias/gfvdovj17bxnqwpxsc8r.jpg"
                            alt="Shoes" />
                    </figure>
                </div>
            </Link>
            <Link href='/collares'>
                <div className="card bg-white w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">COLLARES</h2>
                    </div>
                    <figure>
                        <img
                            className=''
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbH141TM62ZQ1jzKNw4cAGcd85M6l5rPSoSA&s"
                            alt="Shoes" />
                    </figure>
                </div>
            </Link>
            <Link href='/figuras'>
                <div className="card bg-white w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">FIGURAS</h2>
                    </div>
                    <figure>
                        <img
                            className=''
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbH141TM62ZQ1jzKNw4cAGcd85M6l5rPSoSA&s"
                            alt="Shoes" />
                    </figure>
                </div>
            </Link>
            <Link href='/ofertas'>
                <div className="card bg-white w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Ofertas</h2>
                    </div>
                    <figure>
                        <img
                            className=''
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbH141TM62ZQ1jzKNw4cAGcd85M6l5rPSoSA&s"
                            alt="Shoes" />
                    </figure>
                </div>
            </Link>
            <Link href='/cadenas'>
                <div className="card bg-white w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Cadenas</h2>
                    </div>
                    <figure>
                        <img
                            className=''
                            src="https://res.cloudinary.com/dc9kszgso/image/upload/v1731939414/artesanias%20pachy/cadenas/uehrmjiwwopvyoq1kunr.webp"
                            alt="Shoes" />
                    </figure>
                </div>
            </Link>
            <Link href='/accesorios'>
                <div className="card bg-white w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Accesorios</h2>
                    </div>
                    <figure>
                        <img
                            className=''
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbH141TM62ZQ1jzKNw4cAGcd85M6l5rPSoSA&s"
                            alt="Shoes" />
                    </figure>
                </div>
            </Link>

        </div>
    )
}

export default CardCategory;
