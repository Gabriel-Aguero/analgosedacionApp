// src/components/EscalaAbstinencia.jsx
import { useState, useEffect } from 'preact/hooks'

const EscalaAbstinencia = () => {
  const [puntajes, setPuntajes] = useState({
    llantoExcesivo: null,
    trastornoSueno: null,
    tremor: null,
    tonoMuscular: null,
    convulsiones: null,
    sudoracion: null,
    fiebre: null,
    bostezos: null,
    estornudos: null,
    regurgitacion: null,
    succionVigorosa: null,
    reflejoDeMorro: null,
  })

  const [puntajeTotal, setPuntajeTotal] = useState(0)
  const [nivelAbstinencia, setNivelAbstinencia] = useState(null)
  const [mostrarResultado, setMostrarResultado] = useState(false)

  // Definición de criterios de abstinencia (basado en Finnegan)
  const criteriosAbstinencia = {
    llantoExcesivo: {
      titulo: 'Llanto Excesivo',
      descripcion: 'Llanto agudo, continuo o difícil de consolar',
      opciones: [
        {
          valor: 0,
          texto: 'Llanto normal',
          descripcion: 'Llanto ocasional, fácil de consolar',
          icono: '😌',
        },
        {
          valor: 1,
          texto: 'Llanto frecuente',
          descripcion: 'Llanto persistente pero consolable',
          icono: '😢',
        },
        {
          valor: 2,
          texto: 'Llanto agudo continuo',
          descripcion: 'Llanto agudo, difícil de consolar',
          icono: '😫',
        },
      ],
    },
    trastornoSueno: {
      titulo: 'Trastorno del Sueño',
      descripcion: 'Dificultad para conciliar o mantener el sueño',
      opciones: [
        {
          valor: 0,
          texto: 'Sueño normal',
          descripcion: 'Patrón de sueño regular y reparador',
          icono: '💤',
        },
        {
          valor: 1,
          texto: 'Sueño interrumpido',
          descripcion: 'Despierta frecuentemente pero vuelve a dormir',
          icono: '😴',
        },
        {
          valor: 2,
          texto: 'Insomnio severo',
          descripcion: 'Dificultad extrema para dormir, inquieto',
          icono: '🥱',
        },
      ],
    },
    tremor: {
      titulo: 'Tremor',
      descripcion: 'Temblores en extremidades o cuerpo',
      opciones: [
        {
          valor: 0,
          texto: 'Sin tremor',
          descripcion: 'No se observan temblores',
          icono: '✋',
        },
        {
          valor: 1,
          texto: 'Tremor leve',
          descripcion: 'Temblores leves al movimiento',
          icono: '🫲',
        },
        {
          valor: 2,
          texto: 'Tremor severo',
          descripcion: 'Temblores marcados en reposo',
          icono: '📳',
        },
      ],
    },
    tonoMuscular: {
      titulo: 'Tono Muscular',
      descripcion: 'Hipertonía o aumento del tono muscular',
      opciones: [
        {
          valor: 0,
          texto: 'Tono normal',
          descripcion: 'Tono muscular dentro de parámetros normales',
          icono: '💪',
        },
        {
          valor: 1,
          texto: 'Hipertonía leve',
          descripcion: 'Aumento leve de la rigidez muscular',
          icono: '🦵',
        },
        {
          valor: 2,
          texto: 'Hipertonía severa',
          descripcion: 'Rigidez muscular marcada, opistótonos',
          icono: '🏋️',
        },
      ],
    },
    convulsiones: {
      titulo: 'Convulsiones',
      descripcion: 'Actividad convulsiva o movimientos anormales',
      opciones: [
        {
          valor: 0,
          texto: 'Sin convulsiones',
          descripcion: 'No presenta actividad convulsiva',
          icono: '✅',
        },
        {
          valor: 3,
          texto: 'Convulsiones',
          descripcion: 'Presenta actividad convulsiva generalizada o focal',
          icono: '⚠️',
        },
      ],
    },
    sudoracion: {
      titulo: 'Sudoración',
      descripcion: 'Diaforesis o sudoración excesiva',
      opciones: [
        {
          valor: 0,
          texto: 'Sin sudoración',
          descripcion: 'Piel seca, temperatura normal',
          icono: '🌡️',
        },
        {
          valor: 1,
          texto: 'Sudoración leve',
          descripcion: 'Piel húmeda, especialmente en frente',
          icono: '💧',
        },
        {
          valor: 2,
          texto: 'Sudoración profusa',
          descripcion: 'Sudoración excesiva, ropa húmeda',
          icono: '💦',
        },
      ],
    },
    fiebre: {
      titulo: 'Fiebre/Temperatura',
      descripcion: 'Aumento de la temperatura corporal',
      opciones: [
        {
          valor: 0,
          texto: 'Temperatura normal',
          descripcion: '36.5°C - 37.5°C',
          icono: '🌡️',
        },
        {
          valor: 1,
          texto: 'Febrícula',
          descripcion: '37.6°C - 38.0°C',
          icono: '🔥',
        },
        {
          valor: 2,
          texto: 'Fiebre',
          descripcion: '> 38.0°C sin causa infecciosa',
          icono: '🥵',
        },
      ],
    },
    bostezos: {
      titulo: 'Bostezos',
      descripcion: 'Bostezos frecuentes e involuntarios',
      opciones: [
        {
          valor: 0,
          texto: 'Bostezos normales',
          descripcion: '1-3 bostezos por evaluación',
          icono: '😌',
        },
        {
          valor: 1,
          texto: 'Bostezos frecuentes',
          descripcion: '4-6 bostezos por evaluación',
          icono: '🥱',
        },
        {
          valor: 2,
          texto: 'Bostezos excesivos',
          descripcion: '> 6 bostezos por evaluación',
          icono: '😮‍💨',
        },
      ],
    },
    estornudos: {
      titulo: 'Estornudos',
      descripcion: 'Estornudos frecuentes',
      opciones: [
        {
          valor: 0,
          texto: 'Estornudos normales',
          descripcion: '1-3 estornudos por evaluación',
          icono: '🤧',
        },
        {
          valor: 1,
          texto: 'Estornudos frecuentes',
          descripcion: '4-6 estornudos por evaluación',
          icono: '👃',
        },
        {
          valor: 2,
          texto: 'Estornudos excesivos',
          descripcion: '> 6 estornudos por evaluación',
          icono: '💨',
        },
      ],
    },
    regurgitacion: {
      titulo: 'Regurgitación',
      descripcion: 'Vómitos o regurgitación frecuente',
      opciones: [
        {
          valor: 0,
          texto: 'Sin regurgitación',
          descripcion: 'No presenta vómitos ni regurgitación',
          icono: '✅',
        },
        {
          valor: 1,
          texto: 'Regurgitación leve',
          descripcion: '1-2 episodios de regurgitación',
          icono: '🤢',
        },
        {
          valor: 2,
          texto: 'Vómitos frecuentes',
          descripcion: '> 2 episodios de vómitos/regurgitación',
          icono: '🤮',
        },
      ],
    },
    succionVigorosa: {
      titulo: 'Succión Vigorosa',
      descripcion: 'Succión excesiva o descoordinada',
      opciones: [
        {
          valor: 0,
          texto: 'Succión normal',
          descripcion: 'Patrón de succión coordinado',
          icono: '🍼',
        },
        {
          valor: 1,
          texto: 'Succión vigorosa',
          descripcion: 'Succión excesiva pero coordinada',
          icono: '👶',
        },
        {
          valor: 2,
          texto: 'Succión descoordinada',
          descripcion: 'Succión excesiva y desorganizada',
          icono: '🔄',
        },
      ],
    },
    reflejoDeMorro: {
      titulo: 'Reflejo de Morro',
      descripcion: 'Búsqueda exagerada o reflejo de morro aumentado',
      opciones: [
        {
          valor: 0,
          texto: 'Reflejo normal',
          descripcion: 'Reflejo de búsqueda presente pero no exagerado',
          icono: '👄',
        },
        {
          valor: 1,
          texto: 'Reflejo aumentado',
          descripcion: 'Búsqueda exagerada al estímulo',
          icono: '👅',
        },
        {
          valor: 2,
          texto: 'Reflejo exagerado',
          descripcion: 'Búsqueda constante sin estímulo',
          icono: '🥴',
        },
      ],
    },
  }

  // Niveles de abstinencia según puntaje total
  const nivelesAbstinencia = {
    0: {
      nivel: 'Sin abstinencia',
      color: 'green',
      badgeClass: 'bg-green-100 text-green-800',
      interpretacion: 'No hay signos clínicos de síndrome de abstinencia',
      recomendacion: 'Monitorización rutinaria cada 8-12 horas',
    },
    1: {
      nivel: 'Abstinencia mínima',
      color: 'green',
      badgeClass: 'bg-green-100 text-green-800',
      interpretacion:
        'Signos mínimos que no requieren intervención farmacológica',
      recomendacion: 'Medidas de confort y reevaluación en 4-6 horas',
    },
    2: {
      nivel: 'Abstinencia leve',
      color: 'green',
      badgeClass: 'bg-green-100 text-green-800',
      interpretacion: 'Síndrome leve, manejable con medidas no farmacológicas',
      recomendacion: 'Medidas de confort intensivas, reevaluación en 2-4 horas',
    },
    3: {
      nivel: 'Abstinencia leve a moderada',
      color: 'yellow',
      badgeClass: 'bg-yellow-100 text-yellow-800',
      interpretacion:
        'Síndrome que comienza a interferir con funciones básicas',
      recomendacion: 'Considerar inicio de tratamiento farmacológico suave',
    },
    4: {
      nivel: 'Abstinencia moderada',
      color: 'yellow',
      badgeClass: 'bg-yellow-100 text-yellow-800',
      interpretacion: 'Síndrome moderado que requiere intervención',
      recomendacion: 'Iniciar tratamiento farmacológico (metadona o morfina)',
    },
    5: {
      nivel: 'Abstinencia moderada',
      color: 'yellow',
      badgeClass: 'bg-yellow-100 text-yellow-800',
      interpretacion: 'Síndrome moderado persistente',
      recomendacion: 'Ajustar dosis de medicación, reevaluación frecuente',
    },
    6: {
      nivel: 'Abstinencia moderada a severa',
      color: 'orange',
      badgeClass: 'bg-orange-100 text-orange-800',
      interpretacion: 'Síndrome que afecta significativamente el bienestar',
      recomendacion: 'Aumentar dosis de medicación, monitorización estrecha',
    },
    7: {
      nivel: 'Abstinencia severa',
      color: 'orange',
      badgeClass: 'bg-orange-100 text-orange-800',
      interpretacion: 'Síndrome severo con afectación multisistémica',
      recomendacion:
        'Tratamiento farmacológico intensivo, considerar UCI neonatal',
    },
    8: {
      nivel: 'Abstinencia muy severa',
      color: 'red',
      badgeClass: 'bg-red-100 text-red-800',
      interpretacion: 'Síndrome muy severo con riesgo de complicaciones',
      recomendacion: 'Manejo en unidad de cuidados intensivos neonatales',
    },
    9: {
      nivel: 'Abstinencia crítica',
      color: 'red',
      badgeClass: 'bg-red-100 text-red-800',
      interpretacion: 'Síndrome crítico con compromiso vital potencial',
      recomendacion: 'Tratamiento de emergencia, monitorización continua',
    },
    10: {
      nivel: 'Abstinencia máxima',
      color: 'red',
      badgeClass: 'bg-red-100 text-red-800',
      interpretacion: 'Síndrome máximo con convulsiones y compromiso vital',
      recomendacion: 'Todas las medidas de soporte, tratamiento agresivo',
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
      const nivel =
        nivelesAbstinencia[Math.min(total, 10)] || nivelesAbstinencia[0]
      setNivelAbstinencia(nivel)
      setMostrarResultado(true)
    } else {
      setMostrarResultado(false)
    }
  }, [puntajes])

  const reiniciarEscala = () => {
    setPuntajes({
      llantoExcesivo: null,
      trastornoSueno: null,
      tremor: null,
      tonoMuscular: null,
      convulsiones: null,
      sudoracion: null,
      fiebre: null,
      bostezos: null,
      estornudos: null,
      regurgitacion: null,
      succionVigorosa: null,
      reflejoDeMorro: null,
    })
    setPuntajeTotal(0)
    setNivelAbstinencia(null)
    setMostrarResultado(false)
  }

  const criteriosCompletados = Object.values(puntajes).filter(
    (val) => val !== null
  ).length
  const totalCriterios = Object.keys(puntajes).length
  const todosCriteriosCompletados = criteriosCompletados === totalCriterios

  const getColorClase = (criterio, valor) => {
    if (puntajes[criterio] === valor) {
      if (valor === 0) return 'border-green-500 bg-green-50 shadow-md'
      if (valor === 1) return 'border-yellow-500 bg-yellow-50 shadow-md'
      if (valor === 2) return 'border-orange-500 bg-orange-50 shadow-md'
      if (valor === 3) return 'border-red-500 bg-red-50 shadow-md'
    }
    return 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
  }

  const getTextColor = (criterio, valor) => {
    if (puntajes[criterio] === valor) {
      if (valor === 0) return 'text-green-700'
      if (valor === 1) return 'text-yellow-700'
      if (valor === 2) return 'text-orange-700'
      if (valor === 3) return 'text-red-700'
    }
    return 'text-gray-600'
  }

  return (
    <div class='max-w-7xl mx-auto'>
      {/* Navegación */}
      <div class='mb-6'>
        <a
          href='/'
          class='inline-flex items-center text-purple-600 hover:text-purple-800 mb-4 transition-colors'
        >
          <svg
            class='w-4 h-4 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            ></path>
          </svg>
          Volver al Inicio
        </a>
        <h1 class='text-3xl font-bold text-purple-800 mb-2'>
          Escala de Abstinencia
        </h1>
        <p class='text-gray-600'>Evaluación del síndrome de abstinencia</p>
      </div>

      {/* Contenedor Principal */}
      <div class='bg-white rounded-xl shadow-lg p-6'>
        {/* Instrucciones */}
        <div class='mb-8'>
          <div class='inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4'>
            <svg
              class='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z'
              ></path>
            </svg>
            Evaluación del Síndrome de Abstinencia
          </div>
          <p class='text-gray-700 mb-4'>
            Evalúe cada signo de abstinencia observado en el paciente.
            <strong>
              {' '}
              Puntaje máximo: 10+ puntos (convulsiones = 3 puntos)
            </strong>
          </p>

          {/* Progreso y puntaje */}
          <div class='bg-gray-50 rounded-lg p-4 mb-4'>
            <div class='flex justify-between items-center mb-2'>
              <div>
                <span class='text-sm font-medium text-gray-600'>
                  Progreso:{' '}
                </span>
                <span class='text-sm font-semibold text-purple-600'>
                  {criteriosCompletados}/{totalCriterios} criterios
                </span>
              </div>
              <div class='flex items-baseline'>
                <span class='text-2xl font-bold text-purple-600'>
                  {puntajeTotal}
                </span>
                <span class='text-gray-500 text-sm ml-1'>puntos</span>
              </div>
            </div>
            <div class='w-full bg-gray-200 rounded-full h-2'>
              <div
                class='bg-purple-600 h-2 rounded-full transition-all duration-300'
                style={{
                  width: `${(criteriosCompletados / totalCriterios) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Grid de Criterios de Abstinencia */}
        <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Object.entries(criteriosAbstinencia).map(([key, criterio]) => (
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
                        : puntajes[key] === 2
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {puntajes[key]} pts
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
        {mostrarResultado && nivelAbstinencia && (
          <div
            class={`mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 transition-all duration-500 ease-in-out ${
              mostrarResultado
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
          >
            <div class='text-center'>
              <h3 class='text-2xl font-bold text-gray-800 mb-6'>
                📊 Resultado de la Evaluación de Abstinencia
              </h3>

              <div class='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                <div class='text-center'>
                  <div class='text-5xl font-bold text-purple-600 mb-2'>
                    {puntajeTotal}
                  </div>
                  <div class='text-gray-500'>Puntaje Total</div>
                </div>

                <div class='text-center'>
                  <div
                    class={`text-2xl font-semibold mb-2 text-${nivelAbstinencia.color}-600`}
                  >
                    {nivelAbstinencia.nivel}
                  </div>
                  <div
                    class={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${nivelAbstinencia.badgeClass}`}
                  >
                    <span>Nivel de Abstinencia</span>
                  </div>
                </div>

                <div class='text-center'>
                  <div class='text-lg font-semibold text-gray-700 mb-2'>
                    {puntajeTotal <= 2
                      ? 'Leve'
                      : puntajeTotal <= 6
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
                        class='w-5 h-5 mr-2 text-purple-600'
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
                      {nivelAbstinencia.interpretacion}
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
                      {nivelAbstinencia.recomendacion}
                    </p>
                  </div>
                </div>

                {/* Barra de severidad */}
                <div class='mt-6'>
                  <div class='flex justify-between text-xs text-gray-500 mb-1'>
                    <span>Leve (0-2)</span>
                    <span>Moderado (3-6)</span>
                    <span>Severo (7-10+)</span>
                  </div>
                  <div class='h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full relative'>
                    <div
                      class='absolute top-0 w-3 h-3 bg-white border-2 border-gray-800 rounded-full transform -translate-y-0.5'
                      style={{
                        left: `${Math.min((puntajeTotal / 10) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Alerta importante */}
                {puntajeTotal >= 3 && (
                  <div class='mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                    <div class='flex items-center'>
                      <svg
                        class='w-5 h-5 text-yellow-600 mr-2'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                      <span class='text-yellow-700 font-medium'>
                        {puntajeTotal >= 7
                          ? 'Abstinencia severa detectada - Se requiere intervención inmediata'
                          : 'Abstinencia moderada detectada - Considerar tratamiento farmacológico'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div class='flex justify-between items-center mt-8 pt-6 border-t border-gray-200'>
          <button
            onClick={reiniciarEscala}
            class='inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200'
          >
            <svg
              class='w-4 h-4 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              ></path>
            </svg>
            Reiniciar Evaluación
          </button>

          {!todosCriteriosCompletados && (
            <div class='text-sm text-orange-600 flex items-center'>
              <svg class='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
              Complete todos los criterios para obtener resultado
            </div>
          )}
        </div>
      </div>

      {/* Información adicional */}
      <div class='mt-8 bg-purple-50 rounded-xl p-6'>
        <h3 class='text-lg font-semibold text-purple-800 mb-3'>
          💡 Sobre la Escala de Abstinencia
        </h3>
        <div class='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700'>
          <div class='flex items-start'>
            <span class='text-purple-500 mr-2'>•</span>
            <span>
              <strong>12 criterios</strong> evaluados con puntaje de 0-2 puntos
              (convulsiones 3 puntos)
            </span>
          </div>
          <div class='flex items-start'>
            <span class='text-purple-500 mr-2'>•</span>
            <span>
              <strong>Puntaje ≥ 3:</strong> Considerar tratamiento farmacológico
            </span>
          </div>
          <div class='flex items-start'>
            <span class='text-purple-500 mr-2'>•</span>
            <span>
              <strong>Puntaje ≥ 7:</strong> Abstinencia severa, requiere
              intervención inmediata
            </span>
          </div>
          <div class='flex items-start'>
            <span class='text-purple-500 mr-2'>•</span>
            <span>Escala pediátrica para síndrome de abstinencia</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EscalaAbstinencia
