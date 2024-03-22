// import { UbicacionsContextProvider } from "../ubicaciones/UbicacionsContext";
import { EmpleadosContextProvider } from "./EmpleadosContext";

export default function layout({ children }) {
    return (
        <EmpleadosContextProvider>
            {children}
        </EmpleadosContextProvider>
    )
}