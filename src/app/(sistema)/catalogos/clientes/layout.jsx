import { UbicacionsContextProvider } from "../ubicaciones/UbicacionsContext";
import { ClientesContextProvider } from "./ClientesContext";

export default function layout({ children }) {
    return (
        <ClientesContextProvider>
            <UbicacionsContextProvider>
                {children}
            </UbicacionsContextProvider>
        </ClientesContextProvider>
    )
}