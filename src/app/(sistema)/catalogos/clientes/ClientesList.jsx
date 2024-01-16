import ClienteRow from "./ClienteRow";

export default function ClientesList({clientes}) {
    return (
        <div>
            <div className="flex px-2 bg-gray-950">
                <div className="basis-2/5">Nombre/Clave</div>
                <div className="basis-1/5">Teléfono</div>
                <div className="basis-1/5">e-mail</div>
                <div className="basis-1/5">Ubicación</div>
            </div>
            {clientes.filter(cl=>cl.clave!=="PG").map(cliente => (
                <ClienteRow cliente={cliente} key={cliente._id} />
            ))}
        </div>
    )
}
