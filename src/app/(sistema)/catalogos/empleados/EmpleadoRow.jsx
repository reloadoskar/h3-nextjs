export default function EmpleadoRow({empleado}) {
  return (
    <div className="flex flex-row justify-between ">
        <div>{empleado.nombre}</div>
        <div>{empleado.email}</div>
        <div>{empleado.telefono}</div>
        <div>{empleado.sueldo}</div>
    </div>
  )
}
