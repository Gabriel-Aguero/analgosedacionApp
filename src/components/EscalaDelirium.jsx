import { useState, useEffect } from 'preact/hooks'

const EscalasDelirium = () => {
  const [escalaSeleccionada, setEscalaSeleccionada] = useState('pediatrico')
  const [puntuacionTotal, setPuntuacionTotal] = useState(0)
  const [evaluacionCompleta, setEvaluacionCompleta] = useState(false)

  // Escala de Delirium Pediátrico (PDC)
  const escalaPediatrico = {
    titulo: 'Escala de Delirium Pediátrico (PDC)',
    descripcion: 'Para niños de 0 a 18 años',
    items: [
      {
        id: 1,
        pregunta: '¿El niño tiene alteración de la atención?',
        opciones: [
          { valor: 0, texto: 'Atención normal - Se concentra adecuadamente' },
          { valor: 1, texto: 'Atención leve - Se distrae ocasionalmente' },
          {
            valor: 2,
            texto: 'Atención moderada - Dificultad para mantener el enfoque',
          },
          {
            valor: 3,
            texto: 'Atención grave - Incapaz de mantener la atención',
          },
        ],
      },
      {
        id: 2,
        pregunta: '¿Existe alteración del nivel de conciencia?',
        opciones: [
          { valor: 0, texto: 'Alerta - Estado normal de vigilia' },
          { valor: 1, texto: 'Vigil - Hiperalerta o excesivamente alerta' },
          {
            valor: 2,
            texto: 'Letárgico - Somnoliento pero se despierta fácilmente',
          },
          { valor: 3, texto: 'Estupor - Dificultad para despertar' },
          { valor: 4, texto: 'Coma - No responde' },
        ],
      },
      {
        id: 3,
        pregunta: '¿Hay alteración en la orientación?',
        opciones: [
          {
            valor: 0,
            texto: 'Orientado - Sabe dónde está y quiénes son las personas',
          },
          { valor: 1, texto: 'Desorientado leve - Confusión ocasional' },
          {
            valor: 2,
            texto:
              'Desorientado moderado - No reconoce lugar o personas familiares',
          },
          { valor: 3, texto: 'Desorientado grave - Desconocimiento completo' },
        ],
      },
      {
        id: 4,
        pregunta: '¿Presenta alteraciones perceptuales?',
        opciones: [
          { valor: 0, texto: 'Sin alteraciones - Percepción normal' },
          {
            valor: 1,
            texto: 'Ilusiones leves - Interpretaciones erróneas ocasionales',
          },
          {
            valor: 2,
            texto: 'Alucinaciones - Ve o escucha cosas que no existen',
          },
          {
            valor: 3,
            texto:
              'Alucinaciones graves - Comportamiento influenciado por percepciones falsas',
          },
        ],
      },
      {
        id: 5,
        pregunta: '¿Existe psicomotricidad alterada?',
        opciones: [
          { valor: 0, texto: 'Actividad normal' },
          { valor: 1, texto: 'Inquietud leve - Movimientos aumentados' },
          { valor: 2, texto: 'Agitación - Hiperactividad significativa' },
          { valor: 3, texto: 'Retardo psicomotor - Lentitud extrema' },
        ],
      },
      {
        id: 6,
        pregunta: '¿Hay alteración del sueño-vigilia?',
        opciones: [
          { valor: 0, texto: 'Patrón normal - Sueño adecuado por la noche' },
          { valor: 1, texto: 'Somnolencia diurna leve' },
          { valor: 2, texto: 'Inversión sueño-vigilia - Sueño durante el día' },
          { valor: 3, texto: 'Insomnio grave - Pocas horas de sueño' },
        ],
      },
      {
        id: 7,
        pregunta: '¿Presenta labilidad emocional?',
        opciones: [
          { valor: 0, texto: 'Estado de ánimo estable' },
          { valor: 1, texto: 'Cambios emocionales leves' },
          {
            valor: 2,
            texto: 'Cambios emocionales moderados - Ira o llanto fácil',
          },
          { valor: 3, texto: 'Labilidad grave - Cambios extremos y rápidos' },
        ],
      },
    ],
    interpretacion: [
      {
        min: 0,
        max: 4,
        resultado: 'Sin delirium',
        color: 'bg-green-100 border-green-300 text-green-800',
      },
      {
        min: 5,
        max: 9,
        resultado: 'Delirium leve',
        color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      },
      {
        min: 10,
        max: 14,
        resultado: 'Delirium moderado',
        color: 'bg-orange-100 border-orange-300 text-orange-800',
      },
      {
        min: 15,
        max: 21,
        resultado: 'Delirium grave',
        color: 'bg-red-100 border-red-300 text-red-800',
      },
    ],
  }

  // Escala de Delirium para Lactantes y Niños Pequeños (CAP-D)
  const escalaLactantes = {
    titulo: 'Escala de Delirium para Lactantes y Niños Pequeños (CAP-D)',
    descripcion: 'Para niños de 0 a 5 años',
    items: [
      {
        id: 1,
        pregunta: 'Contacto visual y respuesta social',
        opciones: [
          {
            valor: 0,
            texto: 'Normal - Contacto visual adecuado, sonríe socialmente',
          },
          {
            valor: 1,
            texto:
              'Leve - Contacto visual disminuido, respuesta social limitada',
          },
          {
            valor: 2,
            texto: 'Moderado - Evita contacto visual, pobre respuesta social',
          },
          {
            valor: 3,
            texto: 'Grave - Sin contacto visual, no responde socialmente',
          },
        ],
      },
      {
        id: 2,
        pregunta: 'Consolabilidad',
        opciones: [
          { valor: 0, texto: 'Fácilmente consolable' },
          { valor: 1, texto: 'Consolable con esfuerzo' },
          {
            valor: 2,
            texto: 'Difícil de consolar - Requiere intervención constante',
          },
          {
            valor: 3,
            texto: 'Inconsolable - No responde a esfuerzos de consuelo',
          },
        ],
      },
      {
        id: 3,
        pregunta: 'Interacción con el entorno',
        opciones: [
          { valor: 0, texto: 'Interacción normal - Explora y juega' },
          {
            valor: 1,
            texto: 'Interacción disminuida - Poco interés en juguetes',
          },
          { valor: 2, texto: 'Interacción pobre - Evita el entorno' },
          { valor: 3, texto: 'Sin interacción - Completamente retraído' },
        ],
      },
      {
        id: 4,
        pregunta: 'Movimientos y tono muscular',
        opciones: [
          { valor: 0, texto: 'Movimientos normales, tono adecuado' },
          { valor: 1, texto: 'Inquietud leve o tono ligeramente aumentado' },
          { valor: 2, texto: 'Agitación moderada o hipotonía' },
          { valor: 3, texto: 'Hiperactividad grave o flacidez marcada' },
        ],
      },
      {
        id: 5,
        pregunta: 'Comunicación vocal',
        opciones: [
          { valor: 0, texto: 'Vocalización normal para la edad' },
          { valor: 1, texto: 'Vocalización disminuida' },
          { valor: 2, texto: 'Llanto inconsolable o irritabilidad' },
          { valor: 3, texto: 'Gritos o ausencia completa de vocalización' },
        ],
      },
      {
        id: 6,
        pregunta: 'Patrón sueño-vigilia',
        opciones: [
          { valor: 0, texto: 'Patrón normal para la edad' },
          { valor: 1, texto: 'Somnolencia diurna leve' },
          { valor: 2, texto: 'Inversión marcada del ciclo' },
          { valor: 3, texto: 'Insomnio grave o hipersomnia' },
        ],
      },
    ],
    interpretacion: [
      {
        min: 0,
        max: 3,
        resultado: 'Sin delirium',
        color: 'bg-green-100 border-green-300 text-green-800',
      },
      {
        min: 4,
        max: 7,
        resultado: 'Delirium subclínico',
        color: 'bg-blue-100 border-blue-300 text-blue-800',
      },
      {
        min: 8,
        max: 12,
        resultado: 'Delirium leve-moderado',
        color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      },
      {
        min: 13,
        max: 18,
        resultado: 'Delirium grave',
        color: 'bg-red-100 border-red-300 text-red-800',
      },
    ],
  }

  const [respuestas, setRespuestas] = useState({})

  const handleRespuestaChange = (itemId, valor) => {
    setRespuestas((prev) => ({
      ...prev,
      [itemId]: valor,
    }))
  }

  const calcularPuntuacion = () => {
    const valores = Object.values(respuestas)
    const total = valores.reduce((sum, valor) => sum + (valor || 0), 0)
    setPuntuacionTotal(total)
    setEvaluacionCompleta(valores.length === escalaActual.items.length)
    return total
  }

  const resetEvaluacion = () => {
    setRespuestas({})
    setPuntuacionTotal(0)
    setEvaluacionCompleta(false)
  }

  const escalaActual =
    escalaSeleccionada === 'pediatrico' ? escalaPediatrico : escalaLactantes

  useEffect(() => {
    calcularPuntuacion()
  }, [respuestas, escalaSeleccionada])

  const getInterpretacion = () => {
    return escalaActual.interpretacion.find(
      (range) => puntuacionTotal >= range.min && puntuacionTotal <= range.max
    )
  }

  const interpretacion = getInterpretacion()

  return (
    <div className='max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen'>
      <div className='space-y-6'>
        {/* Header */}
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>
            Escalas de Delirium Pediátrico
          </h1>
          <p className='text-gray-600'>
            Evaluación especializada para población pediátrica
          </p>
        </div>

        {/* Selector de Escala */}
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            Seleccione la Escala
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <button
              onClick={() => {
                setEscalaSeleccionada('pediatrico')
                resetEvaluacion()
              }}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                escalaSeleccionada === 'pediatrico'
                  ? 'border-blue-500 bg-blue-50 transform scale-105 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className='font-semibold text-lg text-gray-800'>PDC</div>
              <div className='text-sm text-gray-600 mt-1'>
                Escala de Delirium Pediátrico
              </div>
              <div className='text-xs text-gray-500 mt-2'>0 - 18 años</div>
            </button>

            <button
              onClick={() => {
                setEscalaSeleccionada('lactantes')
                resetEvaluacion()
              }}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                escalaSeleccionada === 'lactantes'
                  ? 'border-green-500 bg-green-50 transform scale-105 shadow-md'
                  : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
              }`}
            >
              <div className='font-semibold text-lg text-gray-800'>CAP-D</div>
              <div className='text-sm text-gray-600 mt-1'>
                Escala para Lactantes y Niños Pequeños
              </div>
              <div className='text-xs text-gray-500 mt-2'>0 - 5 años</div>
            </button>
          </div>
        </div>

        {/* Información de la Escala Seleccionada */}
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h2 className='text-xl font-semibold text-gray-800'>
                {escalaActual.titulo}
              </h2>
              <p className='text-gray-600'>{escalaActual.descripcion}</p>
            </div>
            <div className='text-right'>
              <div className='text-2xl font-bold text-gray-800'>
                {puntuacionTotal} puntos
              </div>
              <div className='text-sm text-gray-500'>Puntuación total</div>
            </div>
          </div>

          {/* Items de la escala */}
          <div className='space-y-6'>
            {escalaActual.items.map((item) => (
              <div
                key={item.id}
                className='border border-gray-200 rounded-lg p-4'
              >
                <h3 className='font-semibold text-gray-800 mb-3 text-lg'>
                  {item.id}. {item.pregunta}
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                  {item.opciones.map((opcion, index) => (
                    <label
                      key={index}
                      className={`flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        respuestas[item.id] === opcion.valor
                          ? escalaSeleccionada === 'pediatrico'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type='radio'
                        name={`item-${item.id}`}
                        value={opcion.valor}
                        checked={respuestas[item.id] === opcion.valor}
                        onChange={() =>
                          handleRespuestaChange(item.id, opcion.valor)
                        }
                        className='mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500'
                      />
                      <div className='flex-1'>
                        <div className='font-medium text-gray-800'>
                          {opcion.valor} punto{opcion.valor !== 1 ? 's' : ''}
                        </div>
                        <div className='text-sm text-gray-600 mt-1'>
                          {opcion.texto}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resultado e Interpretación */}
        {evaluacionCompleta && (
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Resultado de la Evaluación
            </h2>

            <div className='space-y-6'>
              {/* Puntuación Total */}
              <div className='text-center p-6 bg-gray-50 rounded-lg'>
                <div className='text-sm text-gray-600 mb-2'>
                  Puntuación Total Obtenida
                </div>
                <div className='text-5xl font-bold text-gray-800 mb-2'>
                  {puntuacionTotal}
                </div>
                <div className='text-lg text-gray-600'>
                  de{' '}
                  {escalaActual.items.reduce((max, item) => {
                    const maxOpcion = Math.max(
                      ...item.opciones.map((op) => op.valor)
                    )
                    return max + maxOpcion
                  }, 0)}{' '}
                  puntos posibles
                </div>
              </div>

              {/* Interpretación */}
              {interpretacion && (
                <div
                  className={`p-6 rounded-lg border-2 ${interpretacion.color}`}
                >
                  <div className='text-center'>
                    <div className='text-2xl font-bold mb-2'>
                      {interpretacion.resultado}
                    </div>
                    <p className='text-lg'>
                      Puntuación: {interpretacion.min} - {interpretacion.max}{' '}
                      puntos
                    </p>
                  </div>
                </div>
              )}

              {/* Recomendaciones */}
              <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
                <h3 className='font-semibold text-yellow-800 mb-3 text-lg'>
                  Recomendaciones:
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <h4 className='font-medium text-yellow-700 mb-2'>
                      Manejo Inmediato:
                    </h4>
                    <ul className='text-yellow-600 text-sm list-disc list-inside space-y-1'>
                      <li>Evaluar causas reversibles</li>
                      <li>Optimizar entorno (luz, ruido, orientación)</li>
                      <li>Presencia de familiares</li>
                      <li>Revisión de medicamentos</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='font-medium text-yellow-700 mb-2'>
                      Seguimiento:
                    </h4>
                    <ul className='text-yellow-600 text-sm list-disc list-inside space-y-1'>
                      <li>Reevaluar cada 8-12 horas</li>
                      <li>Monitorizar signos vitales</li>
                      <li>Documentar evolución</li>
                      <li>Consulta con neurología si persiste</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Resumen para documentación */}
              <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
                <h3 className='font-semibold text-gray-700 mb-2'>
                  Resumen para Documentación:
                </h3>
                <div className='text-sm text-gray-600 space-y-1'>
                  <p>
                    <strong>Fecha/Hora:</strong> {new Date().toLocaleString()}
                  </p>
                  <p>
                    <strong>Escala:</strong> {escalaActual.titulo}
                  </p>
                  <p>
                    <strong>Puntuación:</strong> {puntuacionTotal} puntos -{' '}
                    {interpretacion?.resultado}
                  </p>
                  <p>
                    <strong>Items evaluados:</strong>{' '}
                    {escalaActual.items.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones de Acción */}
        <div className='flex justify-center space-x-4 pt-6'>
          <button
            onClick={resetEvaluacion}
            className='px-6 py-3 bg-gray-600 text-white rounded-lg cursor-pointer font-medium hover:bg-gray-700 transition-colors duration-200 shadow-sm'
          >
            Nueva Evaluación
          </button>
          {evaluacionCompleta && (
            <button
              onClick={() => window.print()}
              className='px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm'
            >
              Imprimir Reporte
            </button>
          )}
        </div>

        {/* Footer informativo */}
        <footer className='text-center text-gray-500 text-sm mt-8'>
          <p>
            <strong>Escalas de Delirium Pediátrico</strong> - Herramientas
            validadas para evaluación clínica
          </p>
          <p className='text-xs mt-1'>
            PDC: Pediatric Delirium Checklist | CAP-D: Cornell Assessment of
            Pediatric Delirium
          </p>
        </footer>
      </div>
    </div>
  )
}

export default EscalasDelirium
