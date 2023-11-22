export default function LandingMain() {
  return (
    <section className='contenedor text-center py-24 grid gap-12 md:grid-cols-2 md:text-left'>
      <article>
        <h2 className='text-3xl font-bold mb-6 md:text-4xl'>Controla todo</h2>
        <p>Tus compras, tus ventas, tus sucursales... Todo está en un sólo lugar y muy fácil de usar.</p>
      </article>
      <div className='grid gap-12'>
        <article className='space-y-4 md:space-y-6'>
          <p className='bg-gray-500 rounded-l-full flex font-bold items-center md:bg-transparent'>
            <span className='bg-yellow-400 text-white px-6 rounded-full py-2'>01</span>
            <span className='flex-1 p-2'>Un lugar para todo</span>
          </p>
          <p className='text-left'>
            Encuentra un espacio para crear, actualizar, eliminar, cualquier dato relacionado a la actividad de tu negocio. Crea compras, productores, clientes, etc. y manten su información siempre al día.
          </p>
        </article>

        <article className='space-y-4 md:space-y-6'>
          <p className='bg-gray-500 rounded-l-full flex font-bold items-center md:bg-transparent'>
            <span className='bg-yellow-400 text-white px-6 rounded-full py-2'>02</span>
            <span className='flex-1 p-2'>Reportes, ¡claro que sí!</span>
          </p>
          <p className='text-left'>
            Crea tus reportes de ventas, gastos, compras, liquidaciones, fácil y rápido, en pocos clicks y con un formato muy intuitivo.
          </p>
        </article>

        <article className='space-y-4 md:space-y-6'>
          <p className='bg-gray-500 rounded-l-full flex font-bold items-center md:bg-transparent'>
            <span className='bg-yellow-400 text-white px-6 rounded-full py-2'>03</span>
            <span className='flex-1 p-2'>Inventario, siempre en orden.</span>
          </p>
          <p className='text-left'>
            Haz movimientos entre sucursales, captura tus mermas, crea tus productos personalizados y visualiza en dónde están tus productos en cualquier momento.
          </p>
        </article>
      </div>
    </section>
  )
}