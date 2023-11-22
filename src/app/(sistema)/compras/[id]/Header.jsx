import moment from "moment"
export default function Header({ compra }) {
    return (
        <article className="mt-5 text-center border-b-2 border-gray-500">
            <p className="">
                <span className="text-2xl font-bold">
                    #{compra.folio} {compra.productor?.nombre}
                </span>
            </p>
            <div className="text-gray-400">{compra.clave} Remisión: {compra.remision}</div>
            <div className="text-gray-400">{moment(compra.fecha).format("MMMM DD YYYY")}</div>
        </article>
    )
}
