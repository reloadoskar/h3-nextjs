import { UbicacionsContextProvider } from "../ubicaciones/UbicacionsContext";
import { ClientesContextProvider } from "./ClientesContext";

export default function layout({ children }) {
    return (
        <main className="w-full">
            <ClientesContextProvider>
                <UbicacionsContextProvider>
                    {children}
                </UbicacionsContextProvider>
            </ClientesContextProvider>
        </main>
    )
}