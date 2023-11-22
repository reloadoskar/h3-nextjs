import Sidebar from '@/components/dashboard/Sidebar'
import Navigation from './Navigation'

export default function layout({ children }) {
  return (
    <main
      className="flex flex-row"
    >
      <Navigation />
      {/* <Sidebar activo="dashboard" /> */}

      {children}



    </main>
  )
}
