// src/components/EscalaCAMICU.jsx
import { useState, useEffect } from 'preact/hooks'
import { InfoTriangle } from '../icons/Info-triangle'
import { Refresh } from '../icons/Refresh'
import { Print } from '../icons/Print'

const EscalaCamIcu = () => {
  const [evaluacion, setEvaluacion] = useState({
    caracteristica1: null,
    caracteristica2: null,
    caracteristica3: null,
    caracteristica4: null,
  })

  const [resultado, setResultado] = useState(null)
  const [mostrarResultadoParcial, setMostrarResultadoParcial] = useState(false)

  const caracteristicas = [
    {
      id: 1,
      titulo: '1. Inicio Agudo o Curso Fluctuante',
      descripcion:
        '¿Hubo cambio agudo en el estado mental o comportamiento fluctuante?',
      opciones: [
        {
          valor: true,
          texto: 'Sí',
          descripcion: 'Cambio agudo o fluctuaciones',
        },
        { valor: false, texto: 'No', descripcion: 'Estado mental estable' },
      ],
    },
    {
      id: 2,
      titulo: '2. Atención',
      descripcion: '¿Presenta dificultad para enfocar la atención?',
      opciones: [
        { valor: true, texto: 'Sí', descripcion: 'Atención deficiente' },
        { valor: false, texto: 'No', descripcion: 'Atención normal' },
      ],
    },
    {
      id: 3,
      titulo: '3. Pensamiento Desorganizado',
      descripcion: '¿El pensamiento está desorganizado o incoherente?',
      opciones: [
        { valor: true, texto: 'Sí', descripcion: 'Pensamiento desorganizado' },
        { valor: false, texto: 'No', descripcion: 'Pensamiento coherente' },
      ],
    },
    {
      id: 4,
      titulo: '4. Alteración del Nivel de Conciencia',
      descripcion: '¿Está alerta, vigil, somnoliento, estuporoso o comatoso?',
      opciones: [
        { valor: true, texto: 'Sí', descripcion: 'Alteración de conciencia' },
        { valor: false, texto: 'No', descripcion: 'Conciencia normal' },
      ],
    },
  ]

  const seleccionarOpcion = (caracteristica, valor) => {
    setEvaluacion((prev) => ({
      ...prev,
      [caracteristica]: valor,
    }))
    setMostrarResultadoParcial(true)
  }

  useEffect(() => {
    const todasEvaluadas = Object.values(evaluacion).every(
      (val) => val !== null
    )

    if (todasEvaluadas) {
      // CAM-ICU positivo si Característica 1 + Característica 2 + (Característica 3 o 4)
      const esPositivo =
        evaluacion.caracteristica1 === true &&
        evaluacion.caracteristica2 === true &&
        (evaluacion.caracteristica3 === true ||
          evaluacion.caracteristica4 === true)

      setResultado(esPositivo)
    } else {
      setResultado(null)
    }
  }, [evaluacion])

  const reiniciarEvaluacion = () => {
    setEvaluacion({
      caracteristica1: null,
      caracteristica2: null,
      caracteristica3: null,
      caracteristica4: null,
    })
    setResultado(null)
    setMostrarResultadoParcial(false)
  }

  const getColorResultado = () => {
    if (resultado === null)
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return resultado
      ? 'bg-red-100 text-red-800 border-red-200'
      : 'bg-green-100 text-green-800 border-green-200'
  }

  const getTextoResultado = () => {
    if (resultado === null) {
      const evaluadas = Object.values(evaluacion).filter(
        (val) => val !== null
      ).length
      return `Evaluación en progreso (${evaluadas}/4 características)`
    }
    return resultado
      ? 'CAM-ICU POSITIVO - Delirium presente'
      : 'CAM-ICU NEGATIVO - Sin delirium'
  }

  const getEstadoActual = () => {
    const estados = []

    if (evaluacion.caracteristica1 !== null) {
      estados.push(`Car. 1: ${evaluacion.caracteristica1 ? 'Sí' : 'No'}`)
    }
    if (evaluacion.caracteristica2 !== null) {
      estados.push(`Car. 2: ${evaluacion.caracteristica2 ? 'Sí' : 'No'}`)
    }
    if (evaluacion.caracteristica3 !== null) {
      estados.push(`Car. 3: ${evaluacion.caracteristica3 ? 'Sí' : 'No'}`)
    }
    if (evaluacion.caracteristica4 !== null) {
      estados.push(`Car. 4: ${evaluacion.caracteristica4 ? 'Sí' : 'No'}`)
    }

    return estados.join(' • ')
  }

  const getRecomendacionParcial = () => {
    const evaluadas = Object.values(evaluacion).filter(
      (val) => val !== null
    ).length

    if (evaluadas === 0) return 'Seleccione las características evaluadas'

    // Verificar criterios parciales
    if (
      evaluacion.caracteristica1 === true &&
      evaluacion.caracteristica2 === true
    ) {
      return 'Criterios 1 y 2 positivos - Si característica 3 o 4 son positivas: DELIRIUM'
    }

    if (
      evaluacion.caracteristica1 === false ||
      evaluacion.caracteristica2 === false
    ) {
      return 'Criterio 1 o 2 negativo - Probablemente sin delirium'
    }

    return 'Complete todas las características para resultado final'
  }

  return (
    <div class='max-w-4xl mx-auto p-6 bg-transparent rounded-lg shadow-lg'>
      {/* Encabezado */}
      <div class='text-center mb-8'>
        <h1 class='mt-10 text-3xl font-bold text-gray-800 mb-2'>
          Escala CAM-ICU
        </h1>
        <p class='text-gray-600 font-bold'>
          Confusion Assessment Method for the ICU
        </p>
      </div>

      {/* Instrucciones */}
      <div class='bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6'>
        <div class='flex gap-2 items-start'>
          <InfoTriangle className='text-orange-600' />
          <div>
            <p class='text-orange-800 font-medium mb-2'>
              Criterios para CAM-ICU positivo:
            </p>
            <ul class='text-orange-700 text-sm list-disc list-inside space-y-1'>
              <li>
                <strong>Característica 1:</strong> Inicio agudo o curso
                fluctuante <strong>Y</strong>
              </li>
              <li>
                <strong>Característica 2:</strong> Atención deficiente{' '}
                <strong>Y</strong>
              </li>
              <li>
                <strong>Característica 3 o 4:</strong> Pensamiento desorganizado
                O Alteración de conciencia
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Estado Actual - SIEMPRE VISIBLE cuando hay selecciones */}
      {(mostrarResultadoParcial || resultado !== null) && (
        <div class={`mb-6 p-4 rounded-lg border-2 ${getColorResultado()}`}>
          <div class='text-center font-semibold text-lg mb-2'>
            {getTextoResultado()}
          </div>
          {getEstadoActual() && (
            <div class='text-center text-sm opacity-75 mt-2'>
              {getEstadoActual()}
            </div>
          )}
          {resultado === null && mostrarResultadoParcial && (
            <div class='text-center text-sm mt-2'>
              {getRecomendacionParcial()}
            </div>
          )}
        </div>
      )}

      {/* Características */}
      <div class='space-y-6'>
        {caracteristicas.map((caracteristica) => (
          <div
            key={caracteristica.id}
            class='border border-gray-500 bg-white rounded-lg p-6'
          >
            <div class='flex items-start justify-between mb-3'>
              <div>
                <h3 class='text-lg font-semibold text-gray-800'>
                  {caracteristica.titulo}
                </h3>
                <p class='text-gray-600 mt-1'>{caracteristica.descripcion}</p>
              </div>
              {evaluacion[`caracteristica${caracteristica.id}`] !== null && (
                <span
                  class={`px-3 py-1 rounded-full text-sm font-medium ${
                    evaluacion[`caracteristica${caracteristica.id}`]
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {evaluacion[`caracteristica${caracteristica.id}`]
                    ? 'Sí'
                    : 'No'}
                </span>
              )}
            </div>

            <div class='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {caracteristica.opciones.map((opcion) => (
                <button
                  key={opcion.texto}
                  onClick={() =>
                    seleccionarOpcion(
                      `caracteristica${caracteristica.id}`,
                      opcion.valor
                    )
                  }
                  class={`p-4 rounded-lg border-2 border-gray-400 text-left transition-all duration-200 hover:scale-[1.02] ${
                    evaluacion[`caracteristica${caracteristica.id}`] ===
                    opcion.valor
                      ? opcion.valor
                        ? 'border-red-500 bg-red-50 shadow-md'
                        : 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  <div class='flex items-center justify-between'>
                    <div class='flex-1'>
                      <span
                        class={`font-semibold text-lg block mb-1 ${
                          evaluacion[`caracteristica${caracteristica.id}`] ===
                          opcion.valor
                            ? opcion.valor
                              ? 'text-red-700'
                              : 'text-green-700'
                            : 'text-gray-700'
                        }`}
                      >
                        {opcion.texto}
                      </span>
                      <p class='text-sm text-gray-600'>{opcion.descripcion}</p>
                    </div>
                    {evaluacion[`caracteristica${caracteristica.id}`] ===
                      opcion.valor && (
                      <div
                        class={`w-8 h-8 rounded-full flex items-center justify-center ml-4 ${
                          opcion.valor ? 'bg-red-500' : 'bg-green-500'
                        }`}
                      >
                        <svg
                          class='w-5 h-5 text-white'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Resultado Final - Solo cuando todas están evaluadas */}
      {resultado !== null && (
        <div class='mt-8 bg-linear-to-r from-orange-50 to-red-50 rounded-lg p-6 border-2 border-orange-200'>
          <h3 class='text-2xl font-bold text-center text-gray-800 mb-6'>
            Resultado Final CAM-ICU
          </h3>

          <div class='bg-white rounded-lg p-6 border shadow-sm'>
            <div
              class={`text-center p-6 rounded-lg mb-6 border-2 ${
                resultado
                  ? 'bg-red-100 border-red-300'
                  : 'bg-green-100 border-green-300'
              }`}
            >
              <div
                class={`text-3xl font-bold mb-3 ${
                  resultado ? 'text-red-700' : 'text-green-700'
                }`}
              >
                {resultado ? 'DELIRIUM DETECTADO' : 'SIN EVIDENCIA DE DELIRIUM'}
              </div>
              <p class='text-gray-700 text-lg'>
                {resultado
                  ? 'El paciente cumple criterios para delirium según CAM-ICU'
                  : 'El paciente no cumple criterios para delirium'}
              </p>
            </div>

            {/* Resumen de características */}
            <div class='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
              {caracteristicas.map((caract, index) => (
                <div
                  key={caract.id}
                  class='text-center p-3 rounded-lg bg-gray-50'
                >
                  <div
                    class={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      evaluacion[`caracteristica${caract.id}`]
                        ? 'bg-red-100 text-red-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {evaluacion[`caracteristica${caract.id}`] ? '✓' : '✗'}
                  </div>
                  <div class='text-sm font-medium text-gray-700'>
                    Car. {index + 1}
                  </div>
                  <div
                    class={`text-xs font-semibold ${
                      evaluacion[`caracteristica${caract.id}`]
                        ? 'text-red-600'
                        : 'text-green-600'
                    }`}
                  >
                    {evaluacion[`caracteristica${caract.id}`]
                      ? 'Positivo'
                      : 'Negativo'}
                  </div>
                </div>
              ))}
            </div>

            {/* Criterios cumplidos */}
            <div class='bg-blue-50 rounded-lg p-4 mb-4'>
              <h4 class='font-semibold text-blue-800 mb-2'>
                Criterios evaluados:
              </h4>
              <ul class='text-blue-700 text-sm space-y-1'>
                <li>
                  • <strong>Característica 1:</strong>{' '}
                  {evaluacion.caracteristica1 ? 'SÍ' : 'NO'} - Inicio
                  agudo/fluctuante
                </li>
                <li>
                  • <strong>Característica 2:</strong>{' '}
                  {evaluacion.caracteristica2 ? 'SÍ' : 'NO'} - Atención
                  deficiente
                </li>
                <li>
                  • <strong>Característica 3:</strong>{' '}
                  {evaluacion.caracteristica3 ? 'SÍ' : 'NO'} - Pensamiento
                  desorganizado
                </li>
                <li>
                  • <strong>Característica 4:</strong>{' '}
                  {evaluacion.caracteristica4 ? 'SÍ' : 'NO'} - Alteración
                  conciencia
                </li>
              </ul>
            </div>

            <div class='bg-gray-50 rounded-lg p-4'>
              <h4 class='font-semibold text-gray-800 mb-3'>Recomendaciones:</h4>
              <ul class='text-gray-600 text-sm space-y-2'>
                {resultado ? (
                  <>
                    <li>
                      • <strong>Evaluar causas reversibles</strong> de delirium
                      (infección, metabólico, etc.)
                    </li>
                    <li>
                      • <strong>Optimizar manejo del dolor</strong> y comfort
                    </li>
                    <li>
                      • <strong>Revisar medicación</strong> sedante/analgésica
                    </li>
                    <li>
                      • <strong>Implementar medidas no farmacológicas</strong>{' '}
                      (reorientación, familia)
                    </li>
                    <li>
                      • <strong>Considerar intervención farmacológica</strong>{' '}
                      si es necesario
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      • <strong>Continuar monitorización</strong> rutinaria del
                      estado mental
                    </li>
                    <li>
                      • <strong>Mantener medidas preventivas</strong> de
                      delirium
                    </li>
                    <li>
                      • <strong>Reevaluar periódicamente</strong> según
                      condición clínica
                    </li>
                    <li>
                      • <strong>Documentar</strong> evaluación en historia
                      clínica
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Botones */}
      <div class='flex justify-center gap-4 mt-6'>
        <button
          onClick={reiniciarEvaluacion}
          class='px-6 py-3 gap-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center'
        >
          <Refresh />
          Nueva Evaluación
        </button>

        {(mostrarResultadoParcial || resultado !== null) && (
          <button
            onClick={() => window.print()}
            class='px-6 py-3 gap-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center'
          >
            <Print />
            Imprimir Reporte
          </button>
        )}
      </div>
    </div>
  )
}

export default EscalaCamIcu
