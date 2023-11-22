import { PdvContextProvider } from "./PdvContext";
import { VentasContextProvider } from "./VentaContext";

export default function layout({ children }) {
    return (
        <PdvContextProvider>
            <VentasContextProvider>
                <main
                // className="flex flex-row"
                >
                    {children}
                </main>
            </VentasContextProvider>
        </PdvContextProvider>
    )
}
