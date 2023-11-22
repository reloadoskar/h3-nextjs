export default function ClienteRow({ cliente }) {
  return (
      <div className='flex flex-row gap-2 justify-between items-center mx-auto'>
          <span>{cliente.nombre}</span>
          <span>{cliente.email}</span>
          <span>{cliente.tel1}</span>
      </div>
  )
}
