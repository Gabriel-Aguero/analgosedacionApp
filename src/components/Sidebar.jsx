import { useState } from 'preact/hooks'
import { Menu } from '../icons/Menu'
import { IconHome } from '../icons/IconHome'
import { About } from '../icons/About'
import { FaceDolor } from '../icons/FaceDolor'
import { IconDelirium } from '../icons/IconDelirium'
import { IconAgitacion } from '../icons/IconAgitacion'
import { Abstinencia } from '../icons/Abstinencia'

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Botón hamburguesa (solo en móvil) */}
      <button
        onClick={() => setOpen(!open)}
        className='md:hidden fixed top-4 right-5 z-60 p-2 bg-black  text-white rounded-lg'
      >
        <Menu size={24} className='text-white' />
      </button>

      <div className='flex flex-col items-center justify-center md:hidden'>
        <a href='/' className='w-36 h-auto'>
          <img
            src='/Logo-escala.webp'
            alt='Logo de Escalas de Analgosedación'
          />
        </a>
        <h2 className='text-xl font-bold mt-4 mb-4 text-center'>
          Escalas de Analgosedación
        </h2>
      </div>

      {/* Overlay al abrir el menú en móvil */}
      {open && (
        <div
          className='fixed inset-0 overflow-y-auto z-50 md:hidden'
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 min-h-screen w-full md:w-80 bg-blue-700 text-white p-6 z-50
          flex flex-col gap-4
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:relative
        `}
      >
        <div className='flex flex-col items-center justify-center'>
          <a href='/' className='w-40 h-auto'>
            <img
              src='/Logo-escala.webp'
              alt='Logo de Escalas de Analgosedación'
            />
          </a>
          <h2 className='text-xl font-bold mt-4 mb-4 text-center'>
            Escalas de Analgosedación
          </h2>
        </div>

        <nav className='flex flex-col gap-3'>
          <a
            href='/'
            className='p-2 rounded hover:bg-blue-600 flex items-center gap-2 border border-slate-400 mb-4'
          >
            <IconHome />

            <span>Inicio</span>
          </a>
          <a
            href='/about'
            className='p-2 rounded hover:bg-blue-600 flex items-center gap-2 border border-slate-400 mb-4'
          >
            <About />

            <span>Acerca de</span>
          </a>
          <a
            href='/escala-dolor'
            className='p-2 rounded hover:bg-blue-600 flex items-center gap-2 border border-slate-400 mb-4'
          >
            <FaceDolor />

            <span>Escala de Dolor</span>
          </a>
          <a
            href='/sedacion'
            className='p-2 rounded hover:bg-blue-600 flex items-center gap-2 border border-slate-400 mb-4'
          >
            <IconAgitacion />

            <span>Escala de Sedación</span>
          </a>
          <a
            href='/delirium'
            className='p-2 rounded hover:bg-blue-600 flex items-center gap-2 border border-slate-400 mb-4'
          >
            <IconDelirium />

            <span>Escala de Delirium</span>
          </a>
          <a
            href='/abstinencia'
            className='p-2 rounded hover:bg-blue-600 flex items-center gap-2 border border-slate-400 mb-4'
          >
            <Abstinencia />

            <span>Escala de Abstinencia</span>
          </a>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
