// src/components/EscalaGlasgow.jsx
import { useState, useEffect } from 'preact/hooks'
import { Print } from '../icons/Print'
import { Refresh } from '../icons/Refresh'

const EscalaGlasgow = () => {
  const [puntajes, setPuntajes] = useState({
    aperturaOcular: null,
    respuestaVerbal: null,
    respuestaMotora: null,
  })

  const [puntajeTotal, setPuntajeTotal] = useState(0)
  const [nivelConciencia, setNivelConciencia] = useState('')

  const opcionesGlasgow = {
    aperturaOcular: [
      {
        valor: 4,
        texto: 'Espontánea',
        descripcion: 'Abre los ojos espontáneamente',
      },
      {
        valor: 3,
        texto: 'Al estímulo verbal',
        descripcion: 'Abre los ojos al hablarle',
      },
      {
        valor: 2,
        texto: 'Al dolor',
        descripcion: 'Abre los ojos al aplicar estímulo doloroso',
      },
      {
        valor: 1,
        texto: 'No abre',
        descripcion: 'No abre los ojos ante ningún estímulo',
      },
    ],
    respuestaVerbal: [
      {
        valor: 5,
        texto: 'Orientado',
        descripcion: 'Responde coherente y orientado',
      },
      {
        valor: 4,
        texto: 'Confuso',
        descripcion: 'Habla pero desorientado/confuso',
      },
      {
        valor: 3,
        texto: 'Palabras inapropiadas',
        descripcion: 'Dice palabras sueltas o gritos',
      },
      {
        valor: 2,
        texto: 'Sonidos incomprensibles',
        descripcion: 'Emite sonidos, no palabras',
      },
      { valor: 1, texto: 'Ninguna', descripcion: 'No emite ningún sonido' },
    ],
    respuestaMotora: [
      {
        valor: 6,
        texto: 'Obedece órdenes',
        descripcion: 'Sigue órdenes verbales correctamente',
      },
      {
        valor: 5,
        texto: 'Localiza dolor',
        descripcion: 'Localiza estímulo doloroso',
      },
      {
        valor: 4,
        texto: 'Retirada al dolor',
        descripcion: 'Retira extremidad al dolor',
      },
      {
        valor: 3,
        texto: 'Flexión anormal',
        descripcion: 'Flexión decorticación',
      },
      {
        valor: 2,
        texto: 'Extensión anormal',
        descripcion: 'Extensión descerebración',
      },
      {
        valor: 1,
        texto: 'Ninguna',
        descripcion: 'Ausencia de respuesta motora',
      },
    ],
  }

  const seleccionarOpcion = (categoria, valor) => {
    setPuntajes((prev) => ({
      ...prev,
      [categoria]: valor,
    }))
  }

  useEffect(() => {
    const total = Object.values(puntajes).reduce(
      (sum, val) => sum + (val || 0),
      0
    )
    setPuntajeTotal(total)

    // Determinar nivel de conciencia
    if (total >= 13) setNivelConciencia('Leve')
    else if (total >= 9) setNivelConciencia('Moderado')
    else if (total >= 3) setNivelConciencia('Severo')
    else setNivelConciencia('No evaluable')
  }, [puntajes])

  const reiniciarEscala = () => {
    setPuntajes({
      aperturaOcular: null,
      respuestaVerbal: null,
      respuestaMotora: null,
    })
  }

  const getColorNivel = () => {
    if (puntajeTotal >= 13) return 'text-green-600 bg-green-100'
    if (puntajeTotal >= 9) return 'text-yellow-600 bg-yellow-100'
    if (puntajeTotal >= 3) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getInterpretacion = () => {
    if (puntajeTotal === 15) return 'Paciente consciente y orientado'
    if (puntajeTotal >= 13) return 'Alteración leve de conciencia'
    if (puntajeTotal >= 9) return 'Alteración moderada de conciencia'
    if (puntajeTotal >= 3) return 'Alteración grave de conciencia - Coma'
    return 'Estado crítico - Evaluar inmediatamente'
  }

  return (
    <div class='max-w-4xl mx-auto p-6 bg-transparent rounded-lg shadow-lg'>
      {/* Encabezado */}
      <div class='text-center mb-8'>
        <h1 class='mt-10 text-3xl font-bold text-gray-800 mb-2'>
          Escala de Glasgow
        </h1>
        <p class='text-gray-600 font-bold'>Glasgow Coma Scale</p>
      </div>

      {/* Resumen */}
      <div class='bg-blue-50 border border-gray-500 rounded-lg p-6 mb-6'>
        <div class='flex justify-between items-center mb-2'>
          <div>
            <span class='text-gray-600'>Puntaje Total:</span>
            <span class='ml-2 text-2xl font-bold text-blue-600'>
              {puntajeTotal}/15
            </span>
          </div>
          <div
            class={`px-3 py-1 rounded-full text-sm font-medium ${getColorNivel()}`}
          >
            {nivelConciencia}
          </div>
        </div>
        <div class='w-full bg-gray-200 rounded-full h-2'>
          <div
            class='bg-blue-600 h-2 rounded-full transition-all duration-300'
            style={{ width: `${(puntajeTotal / 15) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Categorías */}
      <div class='space-y-6'>
        {/* Apertura Ocular */}
        <div class='border border-gray-500 bg-white rounded-lg p-6'>
          <h3 class='text-xl font-semibold text-gray-800 mb-4 flex items-center'>
            <span class='w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3'>
              A
            </span>
            Apertura Ocular
          </h3>
          <div class='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {opcionesGlasgow.aperturaOcular.map((opcion) => (
              <button
                key={opcion.valor}
                onClick={() =>
                  seleccionarOpcion('aperturaOcular', opcion.valor)
                }
                class={`p-4 rounded-lg border-2 border-gray-300 text-left transition-all ${
                  puntajes.aperturaOcular === opcion.valor
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div class='flex justify-between items-start mb-2'>
                  <span
                    class={`font-semibold ${
                      puntajes.aperturaOcular === opcion.valor
                        ? 'text-blue-700'
                        : 'text-gray-700'
                    }`}
                  >
                    {opcion.texto}
                  </span>
                  <span class='px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm'>
                    {opcion.valor} pts
                  </span>
                </div>
                <p class='text-sm text-gray-600'>{opcion.descripcion}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Respuesta Verbal */}
        <div class='border border-gray-500 bg-white rounded-lg p-6'>
          <h3 class='text-xl font-semibold text-gray-800 mb-4 flex items-center'>
            <span class='w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3'>
              V
            </span>
            Respuesta Verbal
          </h3>
          <div class='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {opcionesGlasgow.respuestaVerbal.map((opcion) => (
              <button
                key={opcion.valor}
                onClick={() =>
                  seleccionarOpcion('respuestaVerbal', opcion.valor)
                }
                class={`p-4 rounded-lg border-2 border-gray-300 text-left transition-all ${
                  puntajes.respuestaVerbal === opcion.valor
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <div class='flex justify-between items-start mb-2'>
                  <span
                    class={`font-semibold ${
                      puntajes.respuestaVerbal === opcion.valor
                        ? 'text-green-700'
                        : 'text-gray-700'
                    }`}
                  >
                    {opcion.texto}
                  </span>
                  <span class='px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm'>
                    {opcion.valor} pts
                  </span>
                </div>
                <p class='text-sm text-gray-600'>{opcion.descripcion}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Respuesta Motora */}
        <div class='border border-gray-500 bg-white rounded-lg p-6'>
          <h3 class='text-xl font-semibold text-gray-800 mb-4 flex items-center'>
            <span class='w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3'>
              M
            </span>
            Respuesta Motora
          </h3>
          <div class='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {opcionesGlasgow.respuestaMotora.map((opcion) => (
              <button
                key={opcion.valor}
                onClick={() =>
                  seleccionarOpcion('respuestaMotora', opcion.valor)
                }
                class={`p-4 rounded-lg border-2 border-gray-300 text-left transition-all ${
                  puntajes.respuestaMotora === opcion.valor
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <div class='flex justify-between items-start mb-2'>
                  <span
                    class={`font-semibold ${
                      puntajes.respuestaMotora === opcion.valor
                        ? 'text-purple-700'
                        : 'text-gray-700'
                    }`}
                  >
                    {opcion.texto}
                  </span>
                  <span class='px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm'>
                    {opcion.valor} pts
                  </span>
                </div>
                <p class='text-sm text-gray-600'>{opcion.descripcion}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resultado */}
      {puntajeTotal > 0 && (
        <div class='mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200'>
          <h3 class='text-2xl font-bold text-center text-gray-800 mb-6'>
            Resultado Glasgow
          </h3>

          <div class='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
            <div class='text-center'>
              <div class='text-3xl font-bold text-blue-600'>{puntajeTotal}</div>
              <div class='text-gray-600 text-sm'>Total</div>
            </div>
            <div class='text-center'>
              <div class='text-xl font-bold text-blue-600'>
                {puntajes.aperturaOcular || 0}
              </div>
              <div class='text-gray-600 text-sm'>A. Ocular</div>
            </div>
            <div class='text-center'>
              <div class='text-xl font-bold text-green-600'>
                {puntajes.respuestaVerbal || 0}
              </div>
              <div class='text-gray-600 text-sm'>Verbal</div>
            </div>
            <div class='text-center'>
              <div class='text-xl font-bold text-purple-600'>
                {puntajes.respuestaMotora || 0}
              </div>
              <div class='text-gray-600 text-sm'>Motora</div>
            </div>
          </div>

          <div class='bg-white rounded-lg p-6 border shadow-sm'>
            <h4 class='font-semibold text-gray-800 mb-3'>Interpretación:</h4>
            <p class='text-gray-600 mb-4'>{getInterpretacion()}</p>

            <div class='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
              <div
                class={`p-3 rounded-lg ${
                  puntajeTotal >= 13
                    ? 'bg-green-100 border border-green-300'
                    : 'bg-gray-100'
                }`}
              >
                <div class='font-semibold text-green-700'>13-15: Leve</div>
                <div class='text-gray-600'>Alteración mínima</div>
              </div>
              <div
                class={`p-3 rounded-lg ${
                  puntajeTotal >= 9 && puntajeTotal <= 12
                    ? 'bg-yellow-100 border border-yellow-300'
                    : 'bg-gray-100'
                }`}
              >
                <div class='font-semibold text-yellow-700'>9-12: Moderado</div>
                <div class='text-gray-600'>Alteración significativa</div>
              </div>
              <div
                class={`p-3 rounded-lg ${
                  puntajeTotal <= 8
                    ? 'bg-red-100 border border-red-300'
                    : 'bg-gray-100'
                }`}
              >
                <div class='font-semibold text-red-700'>3-8: Severo</div>
                <div class='text-gray-600'>Coma</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botones */}
      <div class='flex justify-center gap-4 mt-6'>
        <button
          onClick={reiniciarEscala}
          class='px-6 py-3 flex gap-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium'
        >
          <Refresh />
          Reiniciar
        </button>
        {puntajeTotal > 0 && (
          <button
            onClick={() => window.print()}
            class='px-6 py-3 flex gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
          >
            <Print />
            Imprimir
          </button>
        )}
      </div>
    </div>
  )
}

export default EscalaGlasgow
