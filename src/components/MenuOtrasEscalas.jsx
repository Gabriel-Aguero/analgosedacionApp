// Iconos (puedes reemplazar estos con tus componentes reales)
const RassIcon = () => <span className='font-bold'>R</span>

const GlasgowIcon = () => <span className='font-bold'>G</span>

const CamIcon = () => <span className='font-bold'>C</span>

const MenuOtrasEscalas = () => {
  return (
    <div className='max-w-6xl mx-auto'>
      {/* Header */}
      <div className='text-center m-10'>
        <h1 className='text-xl md:text-3xl font-bold text-blue-800 mb-4 text-center'>
          Sistema de Evaluación de Escalas Neurológicas
        </h1>
      </div>

      {/* Información sobre escalas */}
      <section className='mb-12'>
        {/* <h2 className='text-2xl text-center font-bold text-blue-700 mb-6'>
          Escalas de Evaluación Disponibles
        </h2> */}

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Tarjeta RASS */}
          <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center'>
                <span className='text-red-600 font-bold'>
                  <RassIcon />
                </span>
              </div>
              <h3 className='text-xl font-semibold ml-4'>Escala RASS</h3>
            </div>
            <p className='text-gray-600 mb-4'>
              Richmond Agitation-Sedation Scale para evaluación del nivel de
              sedación y agitación.
            </p>
            <ul className='text-sm text-gray-500 space-y-1 mb-4'>
              <li>• 10 niveles (+4 a -5)</li>
              <li>• Evaluación rápida</li>
              <li>• Validada en UCI</li>
              <li>• Monitoreo continuo</li>
            </ul>
            <a
              href='/escala-rass'
              className='inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
            >
              Usar Escala
            </a>
          </div>

          {/* Tarjeta Glasgow */}
          <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                <span className='text-green-600 font-bold'>
                  <GlasgowIcon />
                </span>
              </div>
              <h3 className='text-xl font-semibold ml-4'>Escala de Glasgow</h3>
            </div>
            <p className='text-gray-600 mb-4'>
              Escala de Coma de Glasgow para evaluación del nivel de conciencia.
            </p>
            <ul className='text-sm text-gray-500 space-y-1 mb-4'>
              <li>• Apertura ocular (1-4)</li>
              <li>• Respuesta verbal (1-5)</li>
              <li>• Respuesta motora (1-6)</li>
              <li>• Total: 3-15 puntos</li>
            </ul>
            <a
              href='/escala-glasgow'
              className='inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
            >
              Usar Escala
            </a>
          </div>

          {/* Tarjeta CAM-ICU */}
          <div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                <span className='text-purple-600 font-bold'>
                  <CamIcon />
                </span>
              </div>
              <h3 className='text-xl font-semibold ml-4'>CAM-ICU</h3>
            </div>
            <p className='text-gray-600 mb-4'>
              Confusion Assessment Method for the ICU para detección de
              delirium.
            </p>
            <ul className='text-sm text-gray-500 space-y-1 mb-4'>
              <li>• Evaluación rápida (2 min)</li>
              <li>• Alta sensibilidad</li>
              <li>• Específico para UCI</li>
              <li>• 4 características clave</li>
            </ul>
            <a
              href='/escala-cam-icu'
              className='inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors'
            >
              Usar Escala
            </a>
          </div>
        </div>
      </section>

      {/* Biblioteca */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold text-blue-700 mb-6'>
          Bibliografía y Recursos
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Artículo RASS */}
          <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
            <div className='flex items-start mb-4'>
              <div className='w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0'>
                <svg
                  className='w-5 h-5 text-red-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-semibold text-gray-800'>
                  Validación de la Escala RASS
                </h3>
                <p className='text-sm text-gray-500'>
                  Sessler CN, et al. American Journal of Respiratory and
                  Critical Care Medicine 2002
                </p>
              </div>
            </div>
            <p className='text-gray-600 text-sm mb-4'>
              Estudio de validación original de la Richmond Agitation-Sedation
              Scale en pacientes críticos.
            </p>
            <a
              href='#'
              className='text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center'
            >
              Ver artículo completo
              <svg
                className='w-4 h-4 ml-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                />
              </svg>
            </a>
          </div>

          {/* Artículo Glasgow */}
          <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
            <div className='flex items-start mb-4'>
              <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0'>
                <svg
                  className='w-5 h-5 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-semibold text-gray-800'>
                  Escala de Coma de Glasgow
                </h3>
                <p className='text-sm text-gray-500'>
                  Teasdale G, Jennett B. Lancet 1974
                </p>
              </div>
            </div>
            <p className='text-gray-600 text-sm mb-4'>
              Publicación original que describe la Escala de Coma de Glasgow
              para evaluación del nivel de conciencia.
            </p>
            <a
              href='#'
              className='text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center'
            >
              Ver artículo completo
              <svg
                className='w-4 h-4 ml-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                />
              </svg>
            </a>
          </div>

          {/* Artículo CAM-ICU */}
          <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
            <div className='flex items-start mb-4'>
              <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0'>
                <svg
                  className='w-5 h-5 text-purple-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-semibold text-gray-800'>
                  Validación del CAM-ICU
                </h3>
                <p className='text-sm text-gray-500'>
                  Ely EW, et al. JAMA 2001
                </p>
              </div>
            </div>
            <p className='text-gray-600 text-sm mb-4'>
              Estudio de validación del Confusion Assessment Method for the ICU
              para detección de delirium en pacientes críticos.
            </p>
            <a
              href='#'
              className='text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center'
            >
              Ver artículo completo
              <svg
                className='w-4 h-4 ml-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                />
              </svg>
            </a>
          </div>

          {/* Artículo Guías */}
          <div className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
            <div className='flex items-start mb-4'>
              <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0'>
                <svg
                  className='w-5 h-5 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <h3 className='text-lg font-semibold text-gray-800'>
                  Guías de Manejo PAD
                </h3>
                <p className='text-sm text-gray-500'>
                  SCCM Clinical Practice Guidelines 2018
                </p>
              </div>
            </div>
            <p className='text-gray-600 text-sm mb-4'>
              Guías actualizadas para el manejo del dolor, agitación/sedación,
              delirium, inmovilidad y alteraciones del sueño en la UCI.
            </p>
            <a
              href='#'
              className='text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center'
            >
              Ver guías completas
              <svg
                className='w-4 h-4 ml-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MenuOtrasEscalas
