
export default function MenuItem({ open, openEditMode, openMovimientoMode, itm, toggleMovs, vermovs }) {
    return (
        <div className={` transition-transform duration-700 ease-in-out ${open ? "" : "hidden"} absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none `} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            <div className="py-1" role="none">
                <button
                    className="text-gray-300 block px-4 py-2 text-sm hover:bg-gray-500 w-full text-left"
                    onClick={openEditMode}
                    disabled={itm.stock > 0 ? false : true}
                >Editar
                </button>
                <button className="text-gray-300 block px-4 py-2 text-sm hover:bg-gray-500 w-full text-left"
                    onClick={openMovimientoMode}
                    disabled={itm.stock > 0 ? false : true}
                >Mover
                </button>
                {itm.movimientos?.length >0 ?
                <button className="text-gray-300 block px-4 py-2 text-sm hover:bg-gray-500 w-full text-left"
                    onClick={toggleMovs}
                >
                    { !vermovs ?  "Ver movimientos" : "Ocultar Movimientos" }
                </button>
                : null }
            </div>
            <div className="py-1" role="none">
                <button
                    className="text-gray-300 block px-4 py-2 text-sm hover:bg-gray-500 w-full text-left" role="menuitem"
                    disabled={itm.stock > 1 ? false : true}
                >
                    Unidades disponibles a mermas
                </button>
                <button
                    className="text-gray-300 block px-4 py-2 text-sm hover:bg-gray-500 w-full text-left" role="menuitem"
                    disabled={itm.empaquesStock > 1 ? false : true}
                >
                    Empaques disponibles a empaques vacíos
                </button>
            </div>
        </div>
    )
}
