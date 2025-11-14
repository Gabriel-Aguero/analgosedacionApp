// src/components/EscalaSedacion.jsx
import { useState } from 'preact/hooks'
import { InfoCircle } from '../icons/InfoCircle'

const EscalaSedacion = () => {
  const [nivelSedacion, setNivelSedacion] = useState(null)
  const [mostrarResultado, setMostrarResultado] = useState(false)

  const nivelesSedacion = [
    {
      id: 1,
      valor: 'no-responde',
      texto: 'No responde',
      descripcion: 'Sin respuesta a estímulos verbales o físicos',
      puntaje: -3,
      icono: '😴',
      color: 'bg-red-100 border-red-300 text-red-800',
      interpretacion: 'Sedación profunda - Riesgo de depresión respiratoria',
      recomendacion:
        'Monitorización continua de signos vitales, considerar reducción de sedación',
    },
    {
      id: 2,
      valor: 'responde-nociceptivos',
      texto: 'Responde a estímulos nociceptivos',
      descripcion: 'Solo responde a estímulos dolorosos',
      puntaje: -2,
      icono: '😵',
      color: 'bg-orange-100 border-orange-300 text-orange-800',
      interpretacion: 'Sedación profunda - Respuesta solo al dolor',
      recomendacion: 'Monitorización estrecha, evaluar necesidad de sedación',
    },
    {
      id: 3,
      valor: 'responde-tacto-voz',
      texto: 'Responde al tocarlo o a la voz',
      descripcion: 'Responde a estímulos táctiles o verbales',
      puntaje: -1,
      icono: '😌',
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      interpretacion: 'Sedación moderada - Respuesta adecuada a estímulos',
      recomendacion: 'Nivel de sedación adecuado para procedimientos',
    },
    {
      id: 4,
      valor: 'despierto-calmo',
      texto: 'Despierto o calmo',
      descripcion: 'Paciente despierto y tranquilo',
      puntaje: 0,
      icono: '😊',
      color: 'bg-green-100 border-green-300 text-green-800',
      interpretacion: 'Sedación leve - Estado óptimo para recuperación',
      recomendacion: 'Continuar monitorización rutinaria',
    },
    {
      id: 5,
      valor: 'inquieto',
      texto: 'Inquieto y difícil de calmar',
      descripcion: 'Paciente despierto pero agitado',
      puntaje: 1,
      icono: '😟',
      color: 'bg-blue-100 border-blue-300 text-blue-800',
      interpretacion: 'Ansiedad o dolor - Requiere intervención',
      recomendacion: 'Evaluar dolor, considerar analgesia o sedación suave',
    },
    {
      id: 6,
      valor: 'agitado',
      texto: 'Agitado',
      descripcion: 'Paciente muy agitado, requiere contención',
      puntaje: 2,
      icono: '😠',
      color: 'bg-purple-100 border-purple-300 text-purple-800',
      interpretacion: 'Agitación severa - Riesgo de autoextubación o lesión',
      recomendacion: 'Intervención inmediata, considerar sedación',
    },
  ]

  const seleccionarNivel = (nivel) => {
    setNivelSedacion(nivel)
    setMostrarResultado(true)
  }

  const reiniciarEscala = () => {
    setNivelSedacion(null)
    setMostrarResultado(false)
  }

  const getNivelSeleccionado = () => {
    return nivelesSedacion.find((nivel) => nivel.valor === nivelSedacion?.valor)
  }

  return (
    <div class='max-w-4xl mx-auto p-6 bg-transparent rounded-lg shadow-lg'>
      {/* Encabezado */}
      <div class='text-center mb-8'>
        <h1 class='text-3xl font-bold text-gray-800 mb-2'>
          ESCALA DE SEDACIÓN
        </h1>
        <p class='text-gray-600 font-bold'>
          Evaluación del nivel de sedación del paciente
        </p>
      </div>

      {/* Instrucciones */}
      <div class='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
        <div class='flex items-center'>
          <svg
            class='w-5 h-5 text-blue-600 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span class='text-blue-800 font-medium'>
            Seleccione una opción que mejor describa el estado del paciente
          </span>
        </div>
      </div>

      {/* Opciones de Sedación */}
      <div class='space-y-4 mb-8'>
        {nivelesSedacion.map((nivel) => (
          <button
            key={nivel.id}
            onClick={() => seleccionarNivel(nivel)}
            class={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
              nivelSedacion?.valor === nivel.valor
                ? `${nivel.color} border-2 shadow-lg transform scale-[1.02]`
                : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div class='flex items-start'>
              <span class='text-2xl mr-4 shrink-0'>{nivel.icono}</span>
              <div class='flex-1'>
                <div class='flex justify-between items-start mb-1'>
                  <span
                    class={`text-lg font-semibold ${
                      nivelSedacion?.valor === nivel.valor
                        ? nivel.color.split(' ')[2]
                        : 'text-gray-800'
                    }`}
                  >
                    {nivel.texto}
                  </span>
                  {nivelSedacion?.valor === nivel.valor && (
                    <span class='px-3 py-1 bg-blue-600 text-white text-sm rounded-full font-medium'>
                      Seleccionado
                    </span>
                  )}
                </div>
                <p class='text-gray-600'>{nivel.descripcion}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Resultado */}
      {mostrarResultado && nivelSedacion && (
        <div class='bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200 mb-6 transition-all duration-500'>
          <div class='text-center'>
            <h3 class='text-2xl font-bold text-gray-800 mb-6'>
              Resultado de la Evaluación
            </h3>

            <div class='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
              <div class='text-center'>
                <div class='text-4xl font-bold text-blue-600 mb-2'>
                  {getNivelSeleccionado()?.puntaje}
                </div>
                <div class='text-gray-600'>Puntaje</div>
              </div>

              <div class='text-center'>
                <div
                  class={`text-xl font-semibold mb-2 px-4 py-2 rounded-full ${
                    getNivelSeleccionado()?.color
                  }`}
                >
                  {getNivelSeleccionado()?.texto}
                </div>
                <div class='text-gray-600'>Nivel de Sedación</div>
              </div>

              <div class='text-center'>
                <div class='text-lg font-semibold text-gray-700 mb-2'>
                  {getNivelSeleccionado()?.puntaje <= 1
                    ? 'Profunda'
                    : getNivelSeleccionado()?.puntaje <= 3
                    ? 'Moderada'
                    : 'Leve/Agitación'}
                </div>
                <div class='text-gray-600'>Categoría</div>
              </div>
            </div>

            {/* Interpretación y Recomendaciones */}
            <div class='bg-white rounded-lg p-6 border shadow-sm'>
              <div class='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h4 class='font-semibold text-gray-800 mb-3 flex items-center'>
                    <svg
                      class='w-5 h-5 mr-2 text-blue-600'
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
                    Interpretación
                  </h4>
                  <p class='text-gray-600 text-sm leading-relaxed'>
                    {getNivelSeleccionado()?.interpretacion}
                  </p>
                </div>

                <div>
                  <h4 class='font-semibold text-gray-800 mb-3 flex items-center'>
                    <svg
                      class='w-5 h-5 mr-2 text-green-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    Recomendación
                  </h4>
                  <p class='text-gray-600 text-sm leading-relaxed'>
                    {getNivelSeleccionado()?.recomendacion}
                  </p>
                </div>
              </div>

              {/* Escala Visual */}
              <div class='mt-6'>
                <div class='flex justify-between text-xs text-gray-500 mb-2'>
                  <span>Sedación Profunda</span>
                  <span>Óptima</span>
                  <span>Agitación</span>
                </div>
                <div class='h-3 bg-linear-to-r from-red-400 via-yellow-400 to-purple-500 rounded-full relative'>
                  <div
                    class='absolute top-0 w-4 h-4 bg-white border-2 border-gray-800 rounded-full transform -translate-y-0.5 -translate-x-2'
                    style={{
                      left: `${(getNivelSeleccionado()?.puntaje / 5) * 100}%`,
                    }}
                  ></div>
                </div>
                <div class='flex justify-between text-xs text-gray-500 mt-1'>
                  <span>0-1</span>
                  <span>2-3</span>
                  <span>4-5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botones de Acción */}
      <div class='flex flex-col sm:flex-row justify-center gap-4'>
        <button
          onClick={reiniciarEscala}
          class='px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center'
        >
          <svg
            class='w-5 h-5 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            />
          </svg>
          Nueva Evaluación
        </button>

        {mostrarResultado && (
          <button
            onClick={() => window.print()}
            class='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center'
          >
            <svg
              class='w-5 h-5 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
              />
            </svg>
            Imprimir Reporte
          </button>
        )}
      </div>

      {/* Información Adicional */}
      <div class='mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200'>
        <h3 class='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
          <InfoCircle />
          Acerca de la Escala de Sedación
        </h3>

        <div class='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600'>
          <div>
            <h4 class='font-medium text-gray-700 mb-2'>Niveles de Sedación:</h4>
            <ul class='space-y-2'>
              <li class='flex items-start'>
                <span class='text-red-500 mr-2'>•</span>
                <span>
                  <strong>-3:</strong> Sedación profunda - Riesgo respiratorio
                </span>
              </li>
              <li class='flex items-start'>
                <span class='text-yellow-500 mr-2'>•</span>
                <span>
                  <strong>-1 -2:</strong> Sedación moderada - Ideal para
                  procedimientos
                </span>
              </li>
              <li class='flex items-start'>
                <span class='text-purple-500 mr-2'>•</span>
                <span>
                  <strong>0 - 2:</strong> Sedación leve/Agitación - Requiere
                  intervención
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 class='font-medium text-gray-700 mb-2'>Consideraciones:</h4>
            <ul class='space-y-2'>
              <li class='flex items-start'>
                <span class='text-blue-500 mr-2'>•</span>
                <span>Evaluar cada 2-4 horas según condición</span>
              </li>
              <li class='flex items-start'>
                <span class='text-blue-500 mr-2'>•</span>
                <span>Documentar cambios en el nivel de sedación</span>
              </li>
              <li class='flex items-start'>
                <span class='text-blue-500 mr-2'>•</span>
                <span>Considerar contexto clínico completo</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EscalaSedacion
