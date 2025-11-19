// src/components/EscalaAbstinencia.jsx
import { useState, useEffect } from 'preact/hooks'

const EscalaAbstinencia = () => {
  const [sintomas, setSintomas] = useState({
    taquicardia: false,
    agitacion: false,
    hipertonia: false,
    muecas: false,
    sudoracion: false,
    movimientosAnormales: false,
    alucionaciones: false,
    diarrea: false,
    taquipnea: false,
    ansiedad: false,
    llanto: false,
    fiebre: false,
    temblores: false,
    insomnio: false,
    vomitos: false,
  })

  const [totalSeleccionados, setTotalSeleccionados] = useState(0)
  const [severidad, setSeveridad] = useState('')

  const toggleSintoma = (sintoma) => {
    setSintomas((prev) => ({
      ...prev,
      [sintoma]: !prev[sintoma],
    }))
  }

  useEffect(() => {
    const seleccionados = Object.values(sintomas).filter(Boolean).length
    setTotalSeleccionados(seleccionados)

    // Determinar severidad basada en el número de síntomas
    if (seleccionados === 0) {
      setSeveridad('Sin abstinencia')
    } else if (seleccionados <= 3) {
      setSeveridad('Leve')
    } else if (seleccionados <= 7) {
      setSeveridad('Moderada')
    } else {
      setSeveridad('Severa')
    }
  }, [sintomas])

  const reiniciarEscala = () => {
    setSintomas({
      taquicardia: false,
      agitacion: false,
      hipertonia: false,
      muecas: false,
      sudoracion: false,
      movimientosAnormales: false,
      alucionaciones: false,
      diarrea: false,
      taquipnea: false,
      ansiedad: false,
      llanto: false,
      fiebre: false,
      temblores: false,
      insomnio: false,
      vomitos: false,
    })
  }

  const getSeveridadColor = () => {
    switch (severidad) {
      case 'Sin abstinencia':
        return 'text-green-600 bg-green-100'
      case 'Leve':
        return 'text-blue-600 bg-blue-100'
      case 'Moderada':
        return 'text-yellow-600 bg-yellow-100'
      case 'Severa':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div class='max-w-4xl mx-auto p-6 bg-transparent rounded-lg shadow-lg'>
      {/* Encabezado */}
      <div class='text-center mb-8'>
        <h1 class='text-3xl font-bold text-gray-800 mb-2'>Escala de SOPHIA</h1>
        <p class='text-gray-600 font-bold'>
          Evaluación de síntomas de abstinencia
        </p>
      </div>

      {/* Resumen */}
      <div class='bg-gray-50 border border-gray-500 p-6 rounded-lg mb-6'>
        <div class='flex justify-between items-center'>
          <div>
            <span class='text-sm text-gray-600'>Síntomas seleccionados:</span>
            <span class='ml-2 text-lg font-semibold text-purple-600'>
              {totalSeleccionados}/15
            </span>
          </div>
          <div
            class={`px-3 py-1 rounded-full text-sm font-medium ${getSeveridadColor()}`}
          >
            {severidad}
          </div>
        </div>
        <div class='w-full bg-gray-200 rounded-full h-2 mt-2'>
          <div
            class='bg-purple-600 h-2 rounded-full transition-all duration-300'
            style={{ width: `${(totalSeleccionados / 15) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Grid de Síntomas */}
      <div class='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Columna Izquierda */}
        <div class='space-y-4'>
          <div class='bg-white border border-gray-200 rounded-lg p-4'>
            <h3 class='text-lg font-semibold text-gray-800 mb-3'>
              Síntomas Cardiovasculares y Motores
            </h3>
            <div class='space-y-3'>
              {/* Taquicardia */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.taquicardia}
                  onChange={() => toggleSintoma('taquicardia')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Taquicardia (mayor 15% FC basal)
                  </span>
                </div>
              </label>

              {/* Agitación */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.agitacion}
                  onChange={() => toggleSintoma('agitacion')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Agitación, si muestra irritabilidad, inquietud o nerviosismo
                  </span>
                </div>
              </label>

              {/* Hipertonia Muscular */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.hipertonia}
                  onChange={() => toggleSintoma('hipertonia')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Hipertonia Muscular, puños y pies apretados
                  </span>
                </div>
              </label>

              {/* Muecas */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.muecas}
                  onChange={() => toggleSintoma('muecas')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Muecas o gestos de malestar, cejas contraídas
                  </span>
                </div>
              </label>

              {/* Sudoración */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.sudoracion}
                  onChange={() => toggleSintoma('sudoracion')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Sudoración
                  </span>
                </div>
              </label>

              {/* Movimientos anormales */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.movimientosAnormales}
                  onChange={() => toggleSintoma('movimientosAnormales')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Movimientos anormales de brazos o piernas, espontáneos o
                    ante estímulos, desde sacudidas hasta coreoatetosis
                  </span>
                </div>
              </label>

              {/* Alucinaciones */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.alucionaciones}
                  onChange={() => toggleSintoma('alucionaciones')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Alucinaciones
                  </span>
                </div>
              </label>

              {/* Diarrea */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.diarrea}
                  onChange={() => toggleSintoma('diarrea')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Diarrea
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div class='space-y-4'>
          <div class='bg-white border border-gray-200 rounded-lg p-4'>
            <h3 class='text-lg font-semibold text-gray-800 mb-3'>
              Síntomas Respiratorios y Conductuales
            </h3>
            <div class='space-y-3'>
              {/* Taquipnea */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.taquipnea}
                  onChange={() => toggleSintoma('taquipnea')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Taquipnea (mayor 15% FR basal)
                  </span>
                </div>
              </label>

              {/* Ansiedad */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.ansiedad}
                  onChange={() => toggleSintoma('ansiedad')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Ansiedad, si muestra ojos abiertos, cejas tensas y elevadas,
                    expresión desde alerta hasta pánico
                  </span>
                </div>
              </label>

              {/* Llanto inconsolable */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.llanto}
                  onChange={() => toggleSintoma('llanto')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Llanto inconsolable
                  </span>
                </div>
              </label>

              {/* Fiebre */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.fiebre}
                  onChange={() => toggleSintoma('fiebre')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Fiebre (mayor a 38.4ºC)
                  </span>
                </div>
              </label>

              {/* Temblores */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.temblores}
                  onChange={() => toggleSintoma('temblores')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Temblores, espontáneos o a estímulos ambientales
                  </span>
                </div>
              </label>

              {/* Insomnio */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.insomnio}
                  onChange={() => toggleSintoma('insomnio')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Insomnio (sueño mayor 1 hora)
                  </span>
                </div>
              </label>

              {/* Vómitos */}
              <label class='flex items-start space-x-3 cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={sintomas.vomitos}
                  onChange={() => toggleSintoma('vomitos')}
                  class='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2'
                />
                <div class='flex-1'>
                  <span class='text-gray-700 group-hover:text-purple-700 transition-colors'>
                    Vómitos
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Resultado y Acciones */}
      <div class='mt-8 bg-linear-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200'>
        <div class='text-center'>
          <h3 class='text-xl font-semibold text-gray-800'>
            Resultado de la Evaluación
          </h3>
          <span class='text-md font-semibold text-purple-800 mb-8'>
            Punto de corte ≥4
          </span>

          <div class='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
            <div class='text-center'>
              <div class='text-3xl font-bold text-purple-600'>
                {totalSeleccionados}
              </div>
              <div class='text-gray-600 text-sm'>Síntomas Presentes</div>
            </div>

            <div class='text-center'>
              <div
                class={`text-xl font-semibold ${
                  getSeveridadColor().split(' ')[0]
                }`}
              >
                {severidad}
              </div>
              <div class='text-gray-600 text-sm'>Nivel de Severidad</div>
            </div>

            <div class='text-center'>
              <div class='text-lg font-semibold text-gray-700'>
                {totalSeleccionados <= 3
                  ? 'Leve'
                  : totalSeleccionados <= 7
                  ? 'Moderado'
                  : 'Severo'}
              </div>
              <div class='text-gray-600 text-sm'>Categoría</div>
            </div>
          </div>

          {/* Recomendaciones */}
          <div class='bg-white rounded-lg p-4 border'>
            <h4 class='font-semibold text-gray-800 mb-2'>Recomendación:</h4>
            <p class='text-gray-600 text-sm'>
              {severidad === 'Sin abstinencia'
                ? 'No se detectan signos de abstinencia. Continuar con monitorización rutinaria.'
                : severidad === 'Leve'
                ? 'Abstinencia leve detectada. Implementar medidas de confort y reevaluar en 4-6 horas.'
                : severidad === 'Moderada'
                ? 'Abstinencia moderada. Considerar intervención farmacológica y monitorización estrecha.'
                : 'Abstinencia severa. Requiere intervención inmediata y manejo especializado.'}
            </p>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div class='flex justify-center gap-4 mt-6'>
        <button
          onClick={reiniciarEscala}
          class='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium'
        >
          Reiniciar Evaluación
        </button>

        {totalSeleccionados > 0 && (
          <button
            onClick={() => window.print()}
            class='px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium'
          >
            Imprimir Reporte
          </button>
        )}
      </div>

      {/* Información Adicional */}
      <div class='mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200'>
        <h4 class='font-semibold text-blue-800 mb-2'>Notas Importantes:</h4>
        <ul class='text-sm text-blue-700 space-y-1'>
          <li>• Punto de corte 4</li>
          <li>• La escala evalúa 15 síntomas comunes de abstinencia</li>
          <li>• Cada síntoma presente contribuye al puntaje total</li>
          <li>
            • La severidad se determina por el número de síntomas presentes
          </li>
          <li>
            • Considere el contexto clínico completo para la toma de decisiones
          </li>
        </ul>
      </div>
    </div>
  )
}

export default EscalaAbstinencia
