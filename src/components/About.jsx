import { icons } from '@tabler/icons-preact'
import { Linkedin } from '../icons/Linkedin'
import { useState } from 'preact/hooks'
const About = () => {
  const equipo = [
    {
      nombre: 'Andrea Cazón',
      cargo: 'Investigador Principal',
      descripcion: 'Investigadora Principal',
      imagen: '/andrea.webp',
      url: 'https://www.linkedin.com/in/andrea-cazon-58666693/',
    },
    {
      nombre: 'Yésica Montenegro',
      cargo: 'Investigadora',
      descripcion: 'Investigadora Principal',
      imagen: '/yesi.webp',
      url: '',
    },
    {
      nombre: 'Gabriel Agüero',
      cargo: 'Programador Web',
      descripcion: 'Desarrollador',
      imagen: '/gaby.webp',
      url: 'https://www.linkedin.com/in/gabrielhaguero/',
    },
  ]

  return (
    <div className='max-w-4xl mx-auto'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-blue-700 mb-4'>
          Sobre el Proyecto
        </h1>
        <p className='text-xl text-gray-600 font-semibold'>
          Estratégias de enfermería en el manejo de la Analgosedación en
          pacientes pediátricos críticos
        </p>
      </div>

      {/* Equipo */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold text-blue-700 mb-6'>
          Equipo de Investigación
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {equipo.map((persona) => (
            <div
              key={persona.nombre}
              className='bg-white rounded-lg shadow-md p-6 text-center transition-transform duration-300 hover:shadow-lg hover:-translate-y-1'
            >
              <div className='w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center'>
                <img
                  src={persona.imagen}
                  alt={persona.nombre}
                  className='w-full h-full object-cover object-center'
                />
              </div>
              <h3 className='text-lg font-semibold text-gray-800'>
                {persona.nombre}
              </h3>
              <p className='text-gray-600 text-sm mb-2'>{persona.cargo}</p>
              <p className='text-gray-500 text-xs'>{persona.descripcion}</p>
              <a
                href={persona.url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block mt-6 px-6 py-2 border border-transparent text-white font-semibold'
              >
                <Linkedin className='w-8 h-auto mr-2 text-blue-600' />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Introducción */}
      <section className='mb-12'>
        <div className='bg-white rounded-lg shadow-md p-8'>
          <h2 className='text-2xl font-bold text-blue-700 mb-4'>
            Proyecto de Investigación
          </h2>
          <p className='text-gray-700 mb-4 leading-relaxed'>
            En el área de terapia intensiva del Hospital Garrahan se desarrolló
            un programa de capacitación de enfermería con el propósito de
            optimizar el manejo del dolor, sedación, abstinencia y delirium en
            nuestros pacientes.
          </p>
          <p className='text-gray-700 leading-relaxed'>
            Conocer escalas de valoración del dolor, sedación, abstinencia y
            delirium y entrenar al personal en su uso.
          </p>

          <a
            className='inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors'
            href='https://medicinainfantil.org.ar/index.php/2024-volumen-xxxi/numero-4'
            target='_blank'
            rel='noopener noreferrer'
          >
            Accede a la publicación
          </a>
        </div>
      </section>

      {/* Objetivos */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold text-blue-700 mb-6'>
          Objetivos del Proyecto
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Objetivo Principal */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <div className='flex items-center mb-4'>
              <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold ml-4'>Objetivo Principal</h3>
            </div>
            <p className='text-gray-600'>
              Implementación de un programa de capacitación de enfermería en uso
              de Escalas de analgesia y sedación en pacientes pediátricos
              críticos.
            </p>
          </div>

          {/* Objetivos Específicos */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <div className='flex items-center mb-4'>
              <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
                <svg
                  className='w-6 h-6 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold ml-4'>
                Objetivos Específicos
              </h3>
            </div>
            <ul className='text-gray-600 space-y-2'>
              <li>• Capacitar al personal en el uso de escalas validadas</li>
              <li>• Reducir la subidentificación del dolor</li>
              <li>• Mejorar la adecuación de la analgesia</li>
              <li>• Evaluar impacto en outcomes clínicos</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Metodología */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold text-blue-700 mb-6'>Metodología</h2>

        <div className='bg-white rounded-lg shadow-md p-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* 1 */}
            <div className='text-center'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-blue-600 font-bold text-xl'>1</span>
              </div>
              <h3 className='text-lg font-semibold mb-2'>Diseño del Estudio</h3>
              <p className='text-gray-600 text-sm'>
                Estudio analítico observacional prospectivo de intervención
                cuasi-experimental antes-después.
              </p>
            </div>

            {/* 2 */}
            <div className='text-center'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-green-600 font-bold text-xl'>2</span>
              </div>
              <h3 className='text-lg font-semibold mb-2'>Discusión</h3>
              <p className='text-gray-600 text-sm'>
                En los registros históricos de las UCI no se evidencian
                hallazgos de valoración del Dolor, Sedación, Abstinencia y
                Delirium.
              </p>
            </div>

            {/* 3 */}
            <div className='text-center'>
              <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-purple-600 font-bold text-xl'>3</span>
              </div>
              <h3 className='text-lg font-semibold mb-2'>Conclusión</h3>
              <p className='text-gray-600 text-sm'>
                Una estrategia impulsada por profesionales de enfermería puede
                incluir un enfoque por etapas, seleccionando líderes y
                fomentando la formación continua.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
