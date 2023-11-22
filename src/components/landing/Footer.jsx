import Image from "next/image";
import Link from "next/link";
import facebook from "../../images/facebook.svg"
import instagram from "../../images/instagram.svg"
import twitter from "../../images/twitter.svg"
import youtube from "../../images/youtube.svg"
import logoHadria from '../../images/logob_hadria3.svg'

export default function Footer() {
  return (
    <footer className="py-24 ">
        <section className="contenedor grid gap-12 justify-items-center footer-area md:footer-area-md md:grid-cols-3 md:justify-items-stretch">
            <form className="flex gap-4 min-w-[100px] w-full [grid-area:form]">
                <input type="email" placeholder="Recibe noticias en tu correo" className="min-w-[50px] flex-1 rounded-full px-4"/>
                <input type="submit" value="Ok" className="boton py-3 py-8" />
            </form>
            <nav className="grid grid-cols-[max-content_max-content] gap-y-4 justify-between w-4/5 [grid-area:navigation] md:w-full">
                <Link href="#">Home</Link>
                <Link href="#">Precios</Link>
                <Link href="#">Productos</Link>
                <Link href="#">¿Quienes somos?</Link>
                <Link href="#">Contacto</Link>
                <Link href="#">Politica de privacidad</Link>
            </nav>

            <div className="flex flex-wrap gap-4 justify-between w-full [grid-area:social-media]">
                <Link href="#">
                    <Image className="w-8" src={facebook}  alt="fb icon" />
                </Link>
                <Link href="#">
                    <Image className="w-8" src={instagram}  alt="fb icon" />
                </Link>
                <Link href="#">
                    <Image className="w-8" src={twitter}  alt="fb icon" />
                </Link>
                <Link href="#">
                    <Image className="w-8" src={youtube}  alt="fb icon" />
                </Link>
            </div>
            <Image width={120} src={logoHadria} alt="logo hadria" className="[grid-area:logo] mx-auto"/>
            <p className="text-gray-300 text-center [grid-area:copy] md:text-right">Copyright 2023. Todos los derechos reservados. </p>
        </section>
    </footer>
  )
}
