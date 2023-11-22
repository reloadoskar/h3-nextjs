import Info from "@/components/landing/Info";
import Comentarios from "@/components/landing/Comentarios";
import Footer from "@/components/landing/Footer";
import Bottom from "@/components/landing/Bottom";
import Header from "@/components/landing/Header"
export default function Landing() {
  return (
    <div>
      <Header />
      <main>
        <Info />
        <Comentarios />
        <Bottom />
      </main>
      <Footer />
    </div>
  )
}
