import { Toaster } from 'sonner'
import './globals.css'
import Providers from './Providers'
export const metadata = {
  title: 'HADRIA3',
  description: 'Sistema de administración de empresas.',
}
import moment from 'moment'

moment.locale('es')

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
          <Toaster richColors />
      </body>
    </html>
  )
}
