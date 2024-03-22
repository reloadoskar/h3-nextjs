import { ProductorsContextProvider } from "./ProductorsContext";

export default function layout({ children }) {
    return (
        <ProductorsContextProvider>
            {children}
        </ProductorsContextProvider>
    )
}