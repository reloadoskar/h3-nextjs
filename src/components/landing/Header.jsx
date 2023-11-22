import Image from 'next/image'
import Navigation from './Nav'
import Link from 'next/link'
import Composicion from '../../images/comp1.png'

export default function Header() {
    return (
        <header>
            <Navigation />
            <section className="contenedor grid gap-4 justify-items-center items-center pb-10 md:grid-cols-2">
                <Image src={Composicion} alt="main image" className="w-full max-w-lg md:order-1" />
                <article className="text-center space-y-5 md:text-left md:space-y-8">
                    <h1 className="text-4xl font-bold md:text-5xl">Todos los detalles de tu negocio bajo control</h1>
                    <p>Controla tu inventario, compras, ventas, gastos, productos, empleados, sucursales, todo en un mismo lugar.</p>
                    <Link href="/register" className="boton mx-auto shadow-xl shadow-red-900/90 md:mx-0">Registro</Link>
                </article>
            </section>
        </header>
    )
}
