import CategoriasContextProvider from "./CategoriasContext";
import MenuContextProvider from "./MenuContext";
import SubcategoriasContextProvider from "./SubcategoriasContext";

export default function layout({ children }) {
    return (
        <MenuContextProvider>
            <CategoriasContextProvider>
                <SubcategoriasContextProvider>
                    <div>          
                        {children}
                    </div>
                </SubcategoriasContextProvider>
            </CategoriasContextProvider>
        </MenuContextProvider>
    )
}
