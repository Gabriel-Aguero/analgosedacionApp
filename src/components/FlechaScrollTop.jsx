// components/FlechaScrollTop.jsx
import { useState, useEffect } from 'preact/hooks'

const FlechaScrollTop = () => {
  const [mostrarFlecha, setMostrarFlecha] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setMostrarFlecha(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!mostrarFlecha) return null

  return (
    <button
      onClick={scrollToTop}
      className='fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      aria-label='Volver al principio'
    >
      <svg
        className='w-6 h-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M5 15l7-7 7 7'
        />
      </svg>
    </button>
  )
}

export default FlechaScrollTop
