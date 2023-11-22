'use client'
import {SessionProvider} from "next-auth/react"
// import ComprasContextProvider from "./(sistema)/compras/ComprasContext"
export default function Providers({children}) {
  return (
    <SessionProvider>
      {/* <ComprasContextProvider> */}
        {children}
      {/* </ComprasContextProvider> */}
    </SessionProvider>
  )
}
