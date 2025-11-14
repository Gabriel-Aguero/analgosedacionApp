// src/components/EscalaRASS.jsx
import { useState } from 'preact/hooks'
import { Print } from '../icons/Print'
import { InfoTriangle } from '../icons/Info-triangle'
import { Refresh } from '../icons/Refresh'

const EscalaRass = () => {
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null)
  const [mostrarResultado, setMostrarResultado] = useState(false)

  const nivelesRASS = [
    {
      puntaje: +4,
      descripcion: 'Combativo',
      comportamiento: 'Violento, peligro inmediato para el personal',
      icono: '💥',
      color: 'bg-red-100 border-red-300 text-red-800',
      intervencion: 'Restricciones físicas, sedación de emergencia',
    },
    {
      puntaje: +3,
      descripcion: 'Muy agitado',
      comportamiento:
        'Retira o retira tubos/catéteres, comportamiento agresivo',
      icono: '😠',
      color: 'bg-orange-100 border-orange-300 text-orange-800',
      intervencion: 'Sedación, restricciones según protocolo',
    },
    {
      puntaje: +2,
      descripcion: 'Agitado',
      comportamiento:
        'Movimientos no propositivos frecuentes, lucha contra el ventilador',
      icono: '😟',
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      intervencion: 'Sedación suave, reorientación frecuente',
    },
    {
      puntaje: +1,
      descripcion: 'Inquieto',
      comportamiento: 'Ansioso, pero movimientos no agresivos o vigorosos',
      icono: '😔',
      color: 'bg-blue-100 border-blue-300 text-blue-800',
      intervencion: 'Reaseguro, ambiente tranquilo',
    },
    {
      puntaje: 0,
      descripcion: 'Alerta y calmado',
      comportamiento: 'Estado normal, alerta',
      icono: '😊',
      color: 'bg-green-100 border-green-300 text-green-800',
      intervencion: 'Estado deseable, continuar monitorización',
    },
    {
      puntaje: -1,
      descripcion: 'Somnoliento',
      comportamiento:
        'No completamente alerta, pero se despierta con estímulo verbal',
      icono: '😴',
      color: 'bg-indigo-100 border-indigo-300 text-indigo-800',
      intervencion: 'Vigilar nivel de conciencia',
    },
    {
      puntaje: -2,
      descripcion: 'Sedación leve',
      comportamiento:
        'Se despierta brevemente al contacto visual (>10 segundos)',
      icono: '😪',
      color: 'bg-purple-100 border-purple-300 text-purple-800',
      intervencion: 'Monitorizar signos vitales',
    },
    {
      puntaje: -3,
      descripcion: 'Sedación moderada',
      comportamiento: 'Movimiento o apertura ocular al estímulo verbal',
      icono: '🛌',
      color: 'bg-pink-100 border-pink-300 text-pink-800',
      intervencion: 'Evaluar necesidad de sedación',
    },
    {
      puntaje: -4,
      descripcion: 'Sedación profunda',
      comportamiento:
        'No responde al estímulo verbal, pero se mueve al estímulo físico',
      icono: '💤',
      color: 'bg-gray-100 border-gray-300 text-gray-800',
      intervencion: 'Riesgo de depresión respiratoria',
    },
    {
      puntaje: -5,
      descripcion: 'No despierta',
      comportamiento: 'No responde al estímulo verbal o físico',
      icono: '⚫',
      color: 'bg-black text-white border-gray-800',
      intervencion: 'Emergencia médica, evaluar inmediatamente',
    },
  ]

  const seleccionarNivel = (nivel) => {
    setNivelSeleccionado(nivel)
    setMostrarResultado(true)
  }

  const reiniciarEscala = () => {
    setNivelSeleccionado(null)
    setMostrarResultado(false)
  }

  const getCategoria = (puntaje) => {
    if (puntaje > 0) return 'Agitación'
    if (puntaje === 0) return 'Óptimo'
    return 'Sedación'
  }

  const getColorCategoria = (puntaje) => {
    if (puntaje > 0) return 'text-red-600 bg-red-100'
    if (puntaje === 0) return 'text-green-600 bg-green-100'
    return 'text-blue-600 bg-blue-100'
  }

  return (
    <div class='max-w-4xl mx-auto p-6 bg-transparent rounded-lg shadow-lg'>
      {/* Encabezado */}
      <div class='text-center mb-8'>
        <h1 class='mt-10 text-3xl font-bold text-gray-800 mb-2'>Escala RASS</h1>
        <p class='text-gray-600'>Richmond Agitation-Sedation Scale</p>
      </div>

      {/* Instrucciones */}
      <div class='bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6'>
        <div class='flex gap-2 items-start'>
          <InfoTriangle className='text-purple-600' />
          <div>
            <p class='text-purple-800 font-medium mb-1'>
              Instrucciones de evaluación:
            </p>
            <ol class='text-purple-700 text-sm list-decimal list-inside space-y-1'>
              <li>Observe al paciente sin estimular</li>
              <li>Si está alerta, evalúe comportamiento</li>
              <li>Si está somnoliento, aplique estímulo verbal</li>
              <li>Si no responde, aplique estímulo físico</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Escala RASS */}
      <div class='space-y-3 mb-8'>
        {nivelesRASS.map((nivel) => (
          <button
            key={nivel.puntaje}
            onClick={() => seleccionarNivel(nivel)}
            class={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
              nivelSeleccionado?.puntaje === nivel.puntaje
                ? `${nivel.color} border-2 shadow-lg transform scale-[1.02]`
                : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
            }`}
          >
            <div class='flex items-center justify-between'>
              <div class='flex items-center space-x-4'>
                <div
                  class={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    nivel.puntaje > 0
                      ? 'bg-red-100 text-red-700'
                      : nivel.puntaje === 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {nivel.puntaje > 0 ? `+${nivel.puntaje}` : nivel.puntaje}
                </div>
                <div>
                  <div class='flex items-center space-x-2 mb-1'>
                    <span class='text-xl'>{nivel.icono}</span>
                    <span
                      class={`font-semibold text-lg ${
                        nivelSeleccionado?.puntaje === nivel.puntaje
                          ? nivel.color.split(' ')[2]
                          : 'text-gray-800'
                      }`}
                    >
                      {nivel.descripcion}
                    </span>
                  </div>
                  <p class='text-gray-600 text-sm'>{nivel.comportamiento}</p>
                </div>
              </div>
              {nivelSeleccionado?.puntaje === nivel.puntaje && (
                <div class='bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium'>
                  Seleccionado
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Resultado */}
      {mostrarResultado && nivelSeleccionado && (
        <div class='bg-linear-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200 mb-6'>
          <h3 class='text-2xl font-bold text-center text-gray-800 mb-6'>
            Resultado RASS
          </h3>

          <div class='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            <div class='text-center'>
              <div class='text-4xl font-bold text-purple-600 mb-2'>
                {nivelSeleccionado.puntaje > 0
                  ? `+${nivelSeleccionado.puntaje}`
                  : nivelSeleccionado.puntaje}
              </div>
              <div class='text-gray-600'>Puntaje RASS</div>
            </div>

            <div class='text-center'>
              <div
                class={`text-xl font-semibold mb-2 px-4 py-2 rounded-full ${nivelSeleccionado.color}`}
              >
                {nivelSeleccionado.descripcion}
              </div>
              <div class='text-gray-600'>Nivel</div>
            </div>

            <div class='text-center'>
              <div
                class={`text-lg font-semibold mb-2 px-4 py-2 rounded-full ${getColorCategoria(
                  nivelSeleccionado.puntaje
                )}`}
              >
                {getCategoria(nivelSeleccionado.puntaje)}
              </div>
              <div class='text-gray-600'>Categoría</div>
            </div>
          </div>

          <div class='bg-white rounded-lg p-6 border shadow-sm'>
            <h4 class='font-semibold text-gray-800 mb-3 flex items-center'>
              <svg
                class='w-5 h-5 mr-2 text-red-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z'
                />
              </svg>
              Intervención Recomendada
            </h4>
            <p class='text-gray-600 mb-4'>{nivelSeleccionado.intervencion}</p>

            {/* Escala Visual */}
            <div class='mt-4'>
              <div class='flex justify-between text-xs text-gray-500 mb-2'>
                <span>Agitación (+4)</span>
                <span>Óptimo (0)</span>
                <span>Sedación (-5)</span>
              </div>
              <div class='h-3 bg-linear-to-r from-red-400 via-green-400 to-blue-400 rounded-full relative'>
                <div
                  class='absolute top-0 w-4 h-4 bg-white border-2 border-gray-800 rounded-full transform -translate-y-0.5 -translate-x-2'
                  style={{
                    left: `${((nivelSeleccionado.puntaje + 5) / 9) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botones de Acción */}
      <div class='flex flex-col sm:flex-row justify-center gap-4'>
        <button
          onClick={reiniciarEscala}
          class='px-6 flex gap-2 py-3 bg-gray-200 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium'
        >
          <Refresh />
          Nueva Evaluación
        </button>

        {mostrarResultado && (
          <button
            onClick={() => window.print()}
            class='px-6 py-3 flex gap-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium'
          >
            <Print />
            Imprimir Reporte
          </button>
        )}
      </div>
    </div>
  )
}

export default EscalaRass
