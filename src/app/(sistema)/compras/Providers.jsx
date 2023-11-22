'use client'
import ComprasContextProvider from "./ComprasContext"

export default function Providers({children}) {
  return (
    <ComprasContextProvider>
        {children}
    </ComprasContextProvider>
  )
}
