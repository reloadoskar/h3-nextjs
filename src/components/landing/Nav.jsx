import Link from "next/link"
import Image from "next/image"
import logoHadria from '../../images/logob_h_sola_180.svg'
export default function Navigation() {
  return (
    <nav className="contenedor h-20 flex items-center justify-between ">
        <Link href="/" className="w-1/3 max-w-[80px]">
            <Image width={50} src={logoHadria} alt="logo hadria"/>
        </Link>

        <input type="checkbox" id="menu" className="peer hidden"/>
        <label htmlFor="menu" className="bg-open-menu w-6 h-5 bg-cover bg-center cursor-pointer peer-checked:bg-close-menu transition-all z-50 md:hidden"></label>

        <div className="fixed inset-0 bg-gradient-to-b from-black/40 to-black/90 translate-x-full peer-checked:translate-x-0 transition-transform md:static md:translate-x-0 md:bg-none">
            <ul className="absolute inset-x-0 top-24 p-12 bg-gray-700 w-[90%] mx-auto rounded-md h-max text-center grid gap-4 font-bold md:w-max md:bg-transparent md:p-0 md:grid-flow-col md:static">
                <li>Precios</li>
                <li><Link href="/blog">Blog</Link></li>
                <li>Contacto</li>
                <li>¿Quienes somos?</li>
            </ul>
        </div>

        <Link className="lg:block font-extrabold" href="/login">Log In</Link>
        <Link className="boton shadow-md shadow-yellow-700 hidden lg:block" href="/register">Registro</Link>

    </nav>
  )
}
