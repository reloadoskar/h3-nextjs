import Image from "next/image";
import avatar from '../../images/avatarH5.png'
import Link from "next/link";
export default function Comentarios() {
    return (
        <section className="contenedor text-center py-24 max-w-lg md:max-w-xl">
            <h2 className="text-3xl font-bold md:text-4xl">¿Qué dicen nuestros clientes?</h2>
            <div className="mt-24 mb-14">
                <article className="bg-gray-500 pt-16 pb-12 px-4 relative rounded-md">
                    <Image src={avatar} alt="avatar cliente" className="absolute w-28 aspect-square -top-12 inset-x-0 mx-auto " />
                    <h3 className="text-xl mb-4 pt-2 font-bold">Oskar</h3>
                    <p>
                        &quot;Es genial tener todo en un mismo lugar, puedo ver todo lo que necesito desde el dashboard, lo que más me gusta es poder visualizar como repartí mi inventario en todas mis sucursales.&quot;
                    </p>
                </article>
            </div>
            <Link href="/register" className="boton mx-auto">Registrate gratis</Link>
        </section>
    )
}
