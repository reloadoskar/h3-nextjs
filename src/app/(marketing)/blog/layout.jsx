import Navigation from '@/components/landing/Nav'

export default function layout({children}) {
  return (
    <div>
        <header>
            <Navigation />
        </header>
        <main className='contenedor'>
            {children}
        </main>
    </div>
  )
}
