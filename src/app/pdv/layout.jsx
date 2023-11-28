import { PdvContextProvider } from "./PdvContext";
import { VentasContextProvider } from "./VentaContext";

export default function layout({ children }) {
    return (
        <PdvContextProvider>
            <VentasContextProvider>
                {children}
            </VentasContextProvider>
        </PdvContextProvider>
    )
}
