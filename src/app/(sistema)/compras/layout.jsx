import Providers from "./Providers"
export default function layout({ children }) {
    return (
        <main className="w-full">
            <Providers>
                {children}
            </Providers>
        </main>
    )
}
