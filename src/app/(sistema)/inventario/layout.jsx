import { UbicacionsContextProvider } from "../catalogos/ubicaciones/UbicacionsContext";
import InventarioContextProvider from "./InventarioContext";


export default function layout({ children }) {
    return (
        <InventarioContextProvider>
            <UbicacionsContextProvider>
                {children}
            </UbicacionsContextProvider>
        </InventarioContextProvider>
    )
}
