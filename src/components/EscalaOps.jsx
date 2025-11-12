// src/components/EscalaOps.jsx
import { useState, useEffect } from 'preact/hooks'
import { ArrowLeft } from '../icons/ArrowLeft'
import { Check } from '../icons/Check'
import { CircleCheck } from '../icons/CircleCheck'
import { Refresh } from '../icons/Refresh'
import { InfoTriangle } from '../icons/Info-triangle'

const EscalaOps = () => {
  const [puntajes, setPuntajes] = useState({
    presionSistolica: null,
    llanto: null,
    movimiento: null,
    agitacion: null,
    evaluacionVerbal: null,
  })

  const [puntajeTotal, setPuntajeTotal] = useState(0)
  const [nivelDolor, setNivelDolor] = useState(null)
  const [mostrarResultado, setMostrarResultado] = useState(false)

  // Definición de criterios OPS con máximo 2 puntos por ítem
  const criteriosOPS = {
    presionSistolica: {
      titulo: 'Presión Sistólica',
      descripcion: 'Cambios en la presión arterial sistólica',
      opciones: [
        {
          valor: 0,
          texto: 'Sin cambios',
          descripcion: 'Diferencia < 10% del valor basal',
          icono: '💚',
        },
        {
          valor: 1,
          texto: 'Aumento leve',
          descripcion: 'Aumento 10-20% del valor basal',
          icono: '💛',
        },
        {
          valor: 2,
          texto: 'Aumento significativo',
          descripcion: 'Aumento > 20% del valor basal',
          icono: '❤️',
        },
      ],
    },
    llanto: {
      titulo: 'Llanto',
      descripcion: 'Evaluación de las vocalizaciones del paciente',
      opciones: [
        {
          valor: 0,
          texto: 'No llora',
          descripcion: 'Paciente tranquilo, sin quejas vocales',
          icono: '😌',
        },
        {
          valor: 1,
          texto: 'Gemidos ocasionales',
          descripcion: 'Quejas leves, suspiros o gemidos esporádicos',
          icono: '😣',
        },
        {
          valor: 2,
          texto: 'Llanto constante',
          descripcion: 'Llanto continuo o gritos frecuentes',
          icono: '😫',
        },
      ],
    },
    movimiento: {
      titulo: 'Movimiento',
      descripcion: 'Observación de la actividad motora',
      opciones: [
        {
          valor: 0,
          texto: 'Posición normal',
          descripcion: 'Movimientos tranquilos, posición relajada',
          icono: '💤',
        },
        {
          valor: 1,
          texto: 'Inquietud',
          descripcion: 'Movimientos aumentados, cambios de posición',
          icono: '🔄',
        },
        {
          valor: 2,
          texto: 'Agitación motora',
          descripcion: 'Movimientos constantes o bruscos',
          icono: '⚡',
        },
      ],
    },
    agitacion: {
      titulo: 'Agitación',
      descripcion: 'Nivel de agitación psicomotora',
      opciones: [
        {
          valor: 0,
          texto: 'Tranquilo',
          descripcion: 'Paciente calmado, dormido',
          icono: '😊',
        },
        {
          valor: 1,
          texto: 'Levemente agitado',
          descripcion: 'Inquieto pero manejable',
          icono: '😐',
        },
        {
          valor: 2,
          texto: 'Muy agitado',
          descripcion: 'Agitación severa, difícil de consolar',
          icono: '😠',
        },
      ],
    },
    evaluacionVerbal: {
      titulo: 'Evaluación Verbal',
      descripcion: 'Respuestas verbales o paraverbales',
      opciones: [
        {
          valor: 0,
          texto: 'Habla normal o está dormido',
          descripcion: 'Comunicación adecuada, tono normal',
          icono: '🗣️',
        },
        {
          valor: 1,
          texto: 'Quejas verbales',
          descripcion: 'Menciona dolor pero no puede localizarlo',
          icono: '💬',
        },
        {
          valor: 2,
          texto: 'Quejas constantes',
          descripcion: 'Constantemente habla de dolor y puede localizarlo',
          icono: '📢',
        },
      ],
    },
  }

  // Niveles de dolor según puntaje OPS (0-10 puntos)
  const nivelesDolorOPS = {
    0: {
      nivel: 'Sin dolor',
      color: 'green',
      badgeClass: 'bg-green-100 text-green-800',
      interpretacion: 'No hay evidencia objetiva de dolor',
      recomendacion: 'Monitorización rutinaria cada 4-6 horas',
    },
    1: {
      nivel: 'Dolor mínimo',
      color: 'green',
      badgeClass: 'bg-green-100 text-green-800',
      interpretacion: 'Signos mínimos de dolor, probablemente bien controlado',
      recomendacion:
        'Intervenciones no farmacológicas y reevaluación en 2-4 horas',
    },
    2: {
      nivel: 'Dolor leve',
      color: 'green',
      badgeClass: 'bg-green-100 text-green-800',
      interpretacion: 'Dolor leve evidente pero tolerable',
      recomendacion: 'Considerar analgesia no opioide (paracetamol, AINEs)',
    },
    3: {
      nivel: 'Dolor leve a moderado',
      color: 'yellow',
      badgeClass: 'bg-yellow-100 text-yellow-800',
      interpretacion:
        'Dolor que interfiere con actividades pero permite descanso',
      recomendacion: 'Analgesia no opioide + medidas coadyuvantes',
    },
    4: {
      nivel: 'Dolor moderado',
      color: 'yellow',
      badgeClass: 'bg-yellow-100 text-yellow-800',
      interpretacion: 'Dolor moderado que limita algunas actividades',
      recomendacion: 'Considerar opioides menores (tramadol, codeína)',
    },
    5: {
      nivel: 'Dolor moderado',
      color: 'yellow',
      badgeClass: 'bg-yellow-100 text-yellow-800',
      interpretacion: 'Dolor moderado persistente',
      recomendacion: 'Opioides menores + reevaluación en 1-2 horas',
    },
    6: {
      nivel: 'Dolor moderado a severo',
      color: 'orange',
      badgeClass: 'bg-orange-100 text-orange-800',
      interpretacion:
        'Dolor significativo que interfiere con funciones básicas',
      recomendacion: 'Opioides mayores considerados (morfina, fentanilo)',
    },
    7: {
      nivel: 'Dolor severo',
      color: 'orange',
      badgeClass: 'bg-orange-100 text-orange-800',
      interpretacion: 'Dolor severo con alteración del comportamiento',
      recomendacion: 'Opioides mayores necesarios + monitorización frecuente',
    },
    8: {
      nivel: 'Dolor muy severo',
      color: 'red',
      badgeClass: 'bg-red-100 text-red-800',
      interpretacion: 'Dolor intenso con signos de angustia evidentes',
      recomendacion:
        'Intervención inmediata con opioides mayores vía parenteral',
    },
    9: {
      nivel: 'Dolor extremo',
      color: 'red',
      badgeClass: 'bg-red-100 text-red-800',
      interpretacion: 'Dolor extremo con alteraciones fisiológicas',
      recomendacion: 'Manejo en unidad de vigilancia, analgesia intensiva',
    },
    10: {
      nivel: 'Dolor máximo',
      color: 'red',
      badgeClass: 'bg-red-100 text-red-800',
      interpretacion: 'Dolor máximo incapacitante con compromiso vital',
      recomendacion:
        'Todas las medidas de analgesia disponibles, considerar UCI',
    },
  }

  const seleccionarOpcion = (criterio, valor) => {
    setPuntajes((prev) => ({
      ...prev,
      [criterio]: valor,
    }))
  }

  useEffect(() => {
    // Calcular puntaje total cuando cambien los puntajes
    const total = Object.values(puntajes).reduce(
      (sum, valor) => sum + (valor || 0),
      0
    )
    setPuntajeTotal(total)

    if (total >= 0 && Object.values(puntajes).every((val) => val !== null)) {
      const nivel = nivelesDolorOPS[total] || nivelesDolorOPS[0]
      setNivelDolor(nivel)
      setMostrarResultado(true)
    } else {
      setMostrarResultado(false)
    }
  }, [puntajes])

  const reiniciarEscala = () => {
    setPuntajes({
      presionSistolica: null,
      llanto: null,
      movimiento: null,
      agitacion: null,
      evaluacionVerbal: null,
    })
    setPuntajeTotal(0)
    setNivelDolor(null)
    setMostrarResultado(false)
  }

  const todosCriteriosCompletados = Object.values(puntajes).every(
    (val) => val !== null
  )

  const getColorClase = (criterio, valor) => {
    if (puntajes[criterio] === valor) {
      if (valor === 0) return 'border-green-500 bg-green-50 shadow-md'
      if (valor === 1) return 'border-yellow-500 bg-yellow-50 shadow-md'
      if (valor === 2) return 'border-red-500 bg-red-50 shadow-md'
    }
    return 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
  }

  const getTextColor = (criterio, valor) => {
    if (puntajes[criterio] === valor) {
      if (valor === 0) return 'text-green-700'
      if (valor === 1) return 'text-yellow-700'
      if (valor === 2) return 'text-red-700'
    }
    return 'text-gray-600'
  }

  const criteriosCompletados = Object.values(puntajes).filter(
    (val) => val !== null
  ).length
  const totalCriterios = Object.keys(puntajes).length

  return (
    <div class='max-w-7xl mx-auto'>
      {/* Navegación */}
      <div class='mb-6'>
        <a
          href='/dolor'
          class='inline-flex gap-2 items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors'
        >
          <ArrowLeft />
          Volver a Escalas de Dolor
        </a>
        <h1 class='text-3xl font-bold text-blue-800 mb-2'>
          Objective Pain Scale (OPS)
        </h1>
        <p class='text-gray-600'>
          Escala Objetiva del Dolor - 5 criterios, puntaje máximo 10 puntos
        </p>
      </div>

      {/* Contenedor Principal */}
      <div class='bg-white rounded-xl shadow-lg p-6'>
        {/* Instrucciones */}
        <div class='mb-8'>
          <div class='inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4'>
            <CircleCheck />
            Escala Multidimensional del Dolor
          </div>
          <p class='text-gray-700 mb-4'>
            Evalúe cada criterio seleccionando la opción que mejor describa el
            estado del paciente.
            <strong> Cada ítem tiene un puntaje de 0-2 puntos.</strong>
          </p>

          {/* Progreso y puntaje */}
          <div class='bg-gray-50 rounded-lg p-4 mb-4'>
            <div class='flex justify-between items-center mb-2'>
              <div>
                <span class='text-sm font-medium text-gray-600'>
                  Progreso:{' '}
                </span>
                <span class='text-sm font-semibold text-blue-600'>
                  {criteriosCompletados}/{totalCriterios} criterios
                </span>
              </div>
              <div class='flex items-baseline'>
                <span class='text-2xl font-bold text-blue-600'>
                  {puntajeTotal}
                </span>
                <span class='text-gray-500 text-sm ml-1'>/10</span>
              </div>
            </div>
            <div class='w-full bg-gray-200 rounded-full h-2'>
              <div
                class='bg-blue-600 h-2 rounded-full transition-all duration-300'
                style={{
                  width: `${(criteriosCompletados / totalCriterios) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Grid de Criterios OPS */}
        <div class='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {Object.entries(criteriosOPS).map(([key, criterio]) => (
            <div
              key={key}
              class='border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow'
            >
              <div class='flex items-start justify-between mb-4'>
                <div class='flex-1'>
                  <h3 class='text-lg font-semibold text-gray-800 mb-1'>
                    {criterio.titulo}
                  </h3>
                  <p class='text-sm text-gray-600'>{criterio.descripcion}</p>
                </div>
                {puntajes[key] !== null && (
                  <span
                    class={`px-3 py-1 rounded-full text-sm font-medium ${
                      puntajes[key] === 0
                        ? 'bg-green-100 text-green-800'
                        : puntajes[key] === 1
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {puntajes[key]}/2 pts
                  </span>
                )}
              </div>

              <div class='space-y-3'>
                {criterio.opciones.map((opcion) => (
                  <button
                    key={opcion.valor}
                    onClick={() => seleccionarOpcion(key, opcion.valor)}
                    class={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-[1.02] ${getColorClase(
                      key,
                      opcion.valor
                    )}`}
                  >
                    <div class='flex items-start'>
                      <span class='text-2xl mr-3 flex-shrink-0'>
                        {opcion.icono}
                      </span>
                      <div class='flex-1'>
                        <div class='flex justify-between items-start mb-1'>
                          <span
                            class={`font-semibold ${getTextColor(
                              key,
                              opcion.valor
                            )}`}
                          >
                            {opcion.texto}
                          </span>
                          <span class='text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded'>
                            {opcion.valor} pts
                          </span>
                        </div>
                        <p class='text-sm text-gray-500'>
                          {opcion.descripcion}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Resultado */}
        {mostrarResultado && nivelDolor && (
          <div
            class={`mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 transition-all duration-500 ease-in-out ${
              mostrarResultado
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
          >
            <div class='text-center'>
              <h3 class='text-2xl font-bold text-gray-800 mb-6'>
                📊 Resultado de la Evaluación OPS
              </h3>

              <div class='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                <div class='text-center'>
                  <div class='text-5xl font-bold text-blue-600 mb-2'>
                    {puntajeTotal}
                  </div>
                  <div class='text-gray-500'>Puntaje Total /10</div>
                </div>

                <div class='text-center'>
                  <div
                    class={`text-2xl font-semibold mb-2 text-${nivelDolor.color}-600`}
                  >
                    {nivelDolor.nivel}
                  </div>
                  <div
                    class={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${nivelDolor.badgeClass}`}
                  >
                    <span>Nivel de Dolor</span>
                  </div>
                </div>

                <div class='text-center'>
                  <div class='text-lg font-semibold text-gray-700 mb-2'>
                    {puntajeTotal <= 3
                      ? 'Leve'
                      : puntajeTotal <= 7
                      ? 'Moderado'
                      : 'Severo'}
                  </div>
                  <div class='text-sm text-gray-500'>Categoría</div>
                </div>
              </div>

              {/* Interpretación y recomendaciones */}
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
                        ></path>
                      </svg>
                      Interpretación
                    </h4>
                    <p class='text-gray-600 text-sm leading-relaxed'>
                      {nivelDolor.interpretacion}
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
                        ></path>
                      </svg>
                      Recomendación
                    </h4>
                    <p class='text-gray-600 text-sm leading-relaxed'>
                      {nivelDolor.recomendacion}
                    </p>
                  </div>
                </div>

                {/* Barra de severidad */}
                <div class='mt-6'>
                  <div class='flex justify-between text-xs text-gray-500 mb-1'>
                    <span>Leve (0-3)</span>
                    <span>Moderado (4-7)</span>
                    <span>Severo (8-10)</span>
                  </div>
                  <div class='h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full relative'>
                    <div
                      class='absolute top-0 w-3 h-3 bg-white border-2 border-gray-800 rounded-full transform -translate-y-0.5'
                      style={{ left: `${(puntajeTotal / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div class='flex justify-between items-center mt-8 pt-6 border-t border-gray-200'>
          <button
            onClick={reiniciarEscala}
            class='inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200'
          >
            <Refresh />
            Reiniciar Evaluación
          </button>

          {!todosCriteriosCompletados && (
            <div class='text-sm gap-2 text-orange-600 flex items-center'>
              <InfoTriangle />
              Complete todos los criterios para obtener resultado
            </div>
          )}
        </div>
      </div>

      {/* Información adicional */}
      <div class='mt-8 bg-blue-50 rounded-xl p-6'>
        <h3 class='text-lg font-semibold text-blue-800 mb-3'>
          💡 Sobre la Escala OPS (Objective Pain Scale)
        </h3>
        <div class='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700'>
          <div class='flex items-start'>
            <span class='text-blue-500 mr-2'>•</span>
            <span>
              <strong>5 criterios</strong> evaluados con puntaje de 0-2 puntos
              cada uno
            </span>
          </div>
          <div class='flex items-start'>
            <span class='text-blue-500 mr-2'>•</span>
            <span>
              <strong>Puntaje máximo: 10 puntos</strong> (2 puntos × 5
              criterios)
            </span>
          </div>
          <div class='flex items-start'>
            <span class='text-blue-500 mr-2'>•</span>
            <span>
              <strong>Clasificación:</strong> 0-3 leve, 4-7 moderado, 8-10
              severo
            </span>
          </div>
          <div class='flex items-start'>
            <span class='text-blue-500 mr-2'>•</span>
            <span>
              Combina parámetros fisiológicos y conductuales para evaluación
              objetiva
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EscalaOps
