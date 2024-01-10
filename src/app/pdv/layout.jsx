import { UbicacionsContextProvider } from "../(sistema)/catalogos/ubicaciones/UbicacionsContext";
import { PdvContextProvider } from "./PdvContext";
import { VentasContextProvider } from "./VentaContext";

export default function layout({ children }) {
    return (
        <UbicacionsContextProvider>
            <PdvContextProvider>
                <VentasContextProvider>
                    {children}
                </VentasContextProvider>
            </PdvContextProvider>
        </UbicacionsContextProvider>
    )
}
