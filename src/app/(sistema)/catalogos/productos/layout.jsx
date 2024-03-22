// import { UbicacionsContextProvider } from "../ubicaciones/UbicacionsContext";
import { ProductosContextProvider } from "./ProductosContext";

export default function layout({ children }) {
    return (
        <ProductosContextProvider>
            {/* <UbicacionsContextProvider> */}
            {children}
            {/* </UbicacionsContextProvider> */}
        </ProductosContextProvider>
    )
}