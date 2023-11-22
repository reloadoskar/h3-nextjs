import Link from "next/link"

export default function Bottom() {
    return (
        <section className="bg-yellow-500 font-bold">
            <div className="contenedor py-24 text-center grid gap-6 md:grid-cols-[40%_40%] md:justify-between md:items-center md:text-left">
                <h2 className="text-4xl">Comienza desde hoy a tener el control total de tu negocio.</h2>
                <Link href="#" className="boton bg-gray-900 mx-auto md:mx-0 md:justify-self-end">Registrate ya!</Link>
            </div>
        </section>
    )
}
