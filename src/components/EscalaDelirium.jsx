import { useState, useEffect } from "preact/hooks";

const EscalasDelirium = () => {
  const [escalaSeleccionada, setEscalaSeleccionada] = useState("pediatrico");
  const [puntuacionTotal, setPuntuacionTotal] = useState(0);
  const [evaluacionCompleta, setEvaluacionCompleta] = useState(false);

  // Cornell Assessment of Pediatric Delirium (CAPD) - Para niños mayores
  const cornellPediatrico = {
    titulo: "Cornell Assessment of Pediatric Delirium (CAPD)",
    descripcion: "Para niños de 6 a 18 años",
    instrucciones:
      "Evalúe al niño durante 2 minutos y responda basándose en su comportamiento observado",
    items: [
      {
        id: 1,
        pregunta: "¿El niño hace contacto visual?",
        opciones: [
          { valor: 0, texto: "Contacto visual normal y apropiado" },
          { valor: 1, texto: "Contacto visual disminuido pero presente" },
          { valor: 2, texto: "Contacto visual pobre o evasivo" },
          { valor: 3, texto: "Sin contacto visual" },
          { valor: 4, texto: "Contacto visual fijo o inapropiado" },
        ],
      },
      {
        id: 2,
        pregunta: "¿El niño sigue órdenes simples?",
        opciones: [
          { valor: 0, texto: "Sigue órdenes apropiadamente" },
          { valor: 1, texto: "Sigue órdenes con retraso leve" },
          { valor: 2, texto: "Sigue solo algunas órdenes" },
          { valor: 3, texto: "No sigue órdenes pero responde a estímulos" },
          { valor: 4, texto: "No responde a órdenes ni estímulos" },
        ],
      },
      {
        id: 3,
        pregunta: "¿Está el niño consciente de su entorno?",
        opciones: [
          { valor: 0, texto: "Totalmente consciente y orientado" },
          { valor: 1, texto: "Levemente desorientado" },
          { valor: 2, texto: "Moderadamente desorientado" },
          { valor: 3, texto: "Gravemente desorientado" },
          { valor: 4, texto: "Completamente desorientado" },
        ],
      },
      {
        id: 4,
        pregunta: "¿Cómo es la comunicación del niño?",
        opciones: [
          { valor: 0, texto: "Comunicación clara y apropiada" },
          { valor: 1, texto: "Comunicación algo confusa" },
          { valor: 2, texto: "Comunicación muy confusa o desorganizada" },
          { valor: 3, texto: "Comunicación incomprensible" },
          { valor: 4, texto: "Sin comunicación verbal" },
        ],
      },
      {
        id: 5,
        pregunta: "¿Está el niño tranquilo y cooperativo?",
        opciones: [
          { valor: 0, texto: "Tranquilo y cooperativo" },
          { valor: 1, texto: "Levemente inquieto" },
          { valor: 2, texto: "Moderadamente inquieto o agitado" },
          { valor: 3, texto: "Muy agitado o combativo" },
          { valor: 4, texto: "Extremadamente agitado o retraído" },
        ],
      },
      {
        id: 6,
        pregunta: "¿El niño se toca o jala tubos/catéteres?",
        opciones: [
          { valor: 0, texto: "No toca dispositivos médicos" },
          { valor: 1, texto: "Toca dispositivos ocasionalmente" },
          { valor: 2, texto: "Jala dispositicos frecuentemente" },
          { valor: 3, texto: "Jala dispositicos vigorosamente" },
          { valor: 4, texto: "Extrae dispositicos activamente" },
        ],
      },
      {
        id: 7,
        pregunta: "¿Cómo es el nivel de actividad?",
        opciones: [
          { valor: 0, texto: "Actividad normal para la situación" },
          { valor: 1, texto: "Ligeramente hiperactivo o hipoactivo" },
          { valor: 2, texto: "Moderadamente hiperactivo o hipoactivo" },
          { valor: 3, texto: "Muy hiperactivo o hipoactivo" },
          {
            valor: 4,
            texto: "Extremadamente hiperactivo o prácticamente inmóvil",
          },
        ],
      },
      {
        id: 8,
        pregunta: "¿El niño parece tener alucinaciones?",
        opciones: [
          { valor: 0, texto: "Sin evidencia de alucinaciones" },
          { valor: 1, texto: "Posibles alucinaciones leves" },
          { valor: 2, texto: "Probables alucinaciones" },
          { valor: 3, texto: "Alucinaciones evidentes" },
          {
            valor: 4,
            texto: "Alucinaciones graves que afectan el comportamiento",
          },
        ],
      },
    ],
    interpretacion: [
      {
        min: 0,
        max: 8,
        resultado: "Sin delirium",
        color: "bg-green-100 border-green-300 text-green-800",
        descripcion: "Paciente sin evidencia de delirium",
      },
      {
        min: 9,
        max: 16,
        resultado: "Delirium leve",
        color: "bg-yellow-100 border-yellow-300 text-yellow-800",
        descripcion: "Delirium subclínico o leve, requiere monitorización",
      },
      {
        min: 17,
        max: 24,
        resultado: "Delirium moderado",
        color: "bg-orange-100 border-orange-300 text-orange-800",
        descripcion: "Delirium evidente, necesita intervención",
      },
      {
        min: 25,
        max: 32,
        resultado: "Delirium grave",
        color: "bg-red-100 border-red-300 text-red-800",
        descripcion: "Delirium grave, requiere intervención inmediata",
      },
    ],
    puntoCorte: 9,
  };

  // Cornell Assessment of Pediatric Delirium (CAPD) - Para lactantes y niños pequeños
  const cornellLactantes = {
    titulo:
      "Cornell Assessment of Pediatric Delirium (CAPD) - Versión Lactantes",
    descripcion: "Para niños de 0 a 2 años",
    instrucciones:
      "Evalúe al niño durante 2 minutos. Para lactantes, observe interacción con padres y entorno",
    items: [
      {
        id: 1,
        pregunta: "Contacto visual y sonrisa social",
        opciones: [
          { valor: 0, texto: "Contacto visual normal, sonríe socialmente" },
          { valor: 1, texto: "Contacto visual disminuido, sonrisa ocasional" },
          { valor: 2, texto: "Poco contacto visual, sonrisa rara" },
          { valor: 3, texto: "Contacto visual mínimo, sin sonrisa social" },
          { valor: 4, texto: "Sin contacto visual ni sonrisa social" },
        ],
      },
      {
        id: 2,
        pregunta: "Respuesta a estímulos verbales",
        opciones: [
          { valor: 0, texto: "Responde apropiadamente a la voz" },
          { valor: 1, texto: "Responde con retraso leve" },
          { valor: 2, texto: "Responde solo a estímulos fuertes" },
          { valor: 3, texto: "Respuesta mínima a estímulos verbales" },
          { valor: 4, texto: "No responde a estímulos verbales" },
        ],
      },
      {
        id: 3,
        pregunta: "Interacción con el entorno",
        opciones: [
          { valor: 0, texto: "Interactúa normalmente con juguetes/personas" },
          { valor: 1, texto: "Interacción disminuida pero presente" },
          { valor: 2, texto: "Interacción pobre y breve" },
          { valor: 3, texto: "Interacción mínima con el entorno" },
          { valor: 4, texto: "Sin interacción con el entorno" },
        ],
      },
      {
        id: 4,
        pregunta: "Consolabilidad",
        opciones: [
          { valor: 0, texto: "Fácilmente consolable" },
          { valor: 1, texto: "Consolable con esfuerzo moderado" },
          { valor: 2, texto: "Difícil de consolar" },
          { valor: 3, texto: "Requiere consuelo constante" },
          { valor: 4, texto: "Inconsolable" },
        ],
      },
      {
        id: 5,
        pregunta: "Movimientos y tono muscular",
        opciones: [
          { valor: 0, texto: "Movimientos y tono normales" },
          { valor: 1, texto: "Ligera hiperactividad o hipotonía" },
          { valor: 2, texto: "Moderada hiperactividad o hipotonía" },
          { valor: 3, texto: "Hiperactividad marcada o flacidez" },
          {
            valor: 4,
            texto: "Extremadamente hiperactivo o prácticamente inmóvil",
          },
        ],
      },
      {
        id: 6,
        pregunta: "Patrón de sueño-vigilia",
        opciones: [
          { valor: 0, texto: "Patrón de sueño normal para la edad" },
          { valor: 1, texto: "Sueño algo alterado" },
          { valor: 2, texto: "Sueño moderadamente alterado" },
          { valor: 3, texto: "Sueño muy alterado" },
          {
            valor: 4,
            texto: "Sueño gravemente alterado (insomnio/hipersomnia)",
          },
        ],
      },
      {
        id: 7,
        pregunta: "Comunicación vocal",
        opciones: [
          { valor: 0, texto: "Vocalización normal para la edad" },
          { valor: 1, texto: "Vocalización algo disminuida o aumentada" },
          { valor: 2, texto: "Vocalización muy disminuida o irritabilidad" },
          { valor: 3, texto: "Llanto constante o muy callado" },
          { valor: 4, texto: "Gritos inconsolables o mutismo" },
        ],
      },
      {
        id: 8,
        pregunta: "Reconocimiento de cuidadores",
        opciones: [
          { valor: 0, texto: "Reconoce y responde a cuidadores normalmente" },
          { valor: 1, texto: "Respuesta a cuidadores algo disminuida" },
          { valor: 2, texto: "Respuesta pobre a cuidadores" },
          { valor: 3, texto: "Reconocimiento mínimo de cuidadores" },
          { valor: 4, texto: "No reconoce a cuidadores" },
        ],
      },
    ],
    interpretacion: [
      {
        min: 0,
        max: 8,
        resultado: "Sin delirium",
        color: "bg-green-100 border-green-300 text-green-800",
        descripcion: "Paciente sin evidencia de delirium",
      },
      {
        min: 9,
        max: 16,
        resultado: "Delirium leve",
        color: "bg-yellow-100 border-yellow-300 text-yellow-800",
        descripcion: "Delirium subclínico o leve, requiere observación",
      },
      {
        min: 17,
        max: 24,
        resultado: "Delirium moderado",
        color: "bg-orange-100 border-orange-300 text-orange-800",
        descripcion: "Delirium evidente, necesita intervención",
      },
      {
        min: 25,
        max: 32,
        resultado: "Delirium grave",
        color: "bg-red-100 border-red-300 text-red-800",
        descripcion: "Delirium grave, requiere intervención inmediata",
      },
    ],
    puntoCorte: 9,
  };

  const [respuestas, setRespuestas] = useState({});

  const handleRespuestaChange = (itemId, valor) => {
    setRespuestas((prev) => ({
      ...prev,
      [itemId]: valor,
    }));
  };

  const calcularPuntuacion = () => {
    const valores = Object.values(respuestas);
    const total = valores.reduce((sum, valor) => sum + (valor || 0), 0);
    setPuntuacionTotal(total);
    setEvaluacionCompleta(valores.length === escalaActual.items.length);
    return total;
  };

  const resetEvaluacion = () => {
    setRespuestas({});
    setPuntuacionTotal(0);
    setEvaluacionCompleta(false);
  };

  const escalaActual =
    escalaSeleccionada === "pediatrico" ? cornellPediatrico : cornellLactantes;

  useEffect(() => {
    calcularPuntuacion();
  }, [respuestas, escalaSeleccionada]);

  const getInterpretacion = () => {
    return escalaActual.interpretacion.find(
      (range) => puntuacionTotal >= range.min && puntuacionTotal <= range.max
    );
  };

  const tieneDelirium = () => {
    return puntuacionTotal >= escalaActual.puntoCorte;
  };

  const interpretacion = getInterpretacion();

  return (
    <div className="max-w-6xl mx-auto p-4 bg-transparent min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Cornell Assessment of Pediatric Delirium (CAPD)
          </h1>
          <p className="text-gray-600">
            Herramienta validada para detección de delirium en población
            pediátrica
          </p>
        </div>

        {/* Selector de Escala */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Seleccione la Versión de la Escala
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => {
                setEscalaSeleccionada("pediatrico");
                resetEvaluacion();
              }}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                escalaSeleccionada === "pediatrico"
                  ? "border-blue-500 bg-blue-50 transform scale-105 shadow-md"
                  : "border-gray-400 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <div className="font-semibold text-lg text-gray-800">
                CAPD - Pediátrico
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Cornell Assessment of Pediatric Delirium
              </div>
              <div className="text-xs text-gray-500 mt-2">6 - 18 años</div>
              <div className="text-xs text-blue-600 mt-1">
                Punto de corte: ≥9 puntos
              </div>
            </button>

            <button
              onClick={() => {
                setEscalaSeleccionada("lactantes");
                resetEvaluacion();
              }}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                escalaSeleccionada === "lactantes"
                  ? "border-green-700 bg-green-50 transform scale-105 shadow-md"
                  : "border-gray-400 hover:border-green-300 hover:bg-gray-50"
              }`}
            >
              <div className="font-semibold text-lg text-gray-800">
                CAPD - Lactantes y Niños
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Cornell Assessment of Pediatric Delirium
              </div>
              <div className="text-xs text-gray-500 mt-2">0 - 2 años</div>
              <div className="text-xs text-green-600 mt-1">
                Punto de corte: ≥9 puntos
              </div>
            </button>
          </div>
        </div>

        {/* Información de la Escala Seleccionada */}
        <div className="bg-transparent rounded-xl shadow-sm p-6">
          <div className="flex items-start justify-between mb-4 border bg-white p-6 rounded-lg">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">
                {escalaActual.titulo}
              </h2>
              <p className="text-gray-600">{escalaActual.descripcion}</p>
              <p className="text-sm text-blue-600 mt-2 bg-blue-50 p-2 rounded-lg">
                <strong>Instrucciones:</strong> {escalaActual.instrucciones}
              </p>
            </div>
            <div className="text-right ml-4">
              <div className="text-2xl font-bold text-gray-800">
                {puntuacionTotal} puntos
              </div>
              <div className="text-sm text-gray-500">Puntuación total</div>
              {evaluacionCompleta && (
                <div
                  className={`text-sm font-semibold mt-2 ${
                    tieneDelirium() ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {tieneDelirium()
                    ? "POSITIVO para delirium"
                    : "NEGATIVO para delirium"}
                </div>
              )}
            </div>
          </div>

          {/* Items de la escala */}
          <div className="space-y-6">
            {escalaActual.items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-500 bg-white rounded-lg p-4"
              >
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                  {item.id}. {item.pregunta}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {item.opciones.map((opcion, index) => (
                    <label
                      key={index}
                      className={`flex items-start p-3 rounded-lg border-2 border-gray-500 cursor-pointer transition-all duration-200 ${
                        respuestas[item.id] === opcion.valor
                          ? escalaSeleccionada === "pediatrico"
                            ? "border-blue-500 bg-blue-50"
                            : "border-green-500 bg-green-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`item-${item.id}`}
                        value={opcion.valor}
                        checked={respuestas[item.id] === opcion.valor}
                        onChange={() =>
                          handleRespuestaChange(item.id, opcion.valor)
                        }
                        className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          {opcion.valor} punto{opcion.valor !== 1 ? "s" : ""}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
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
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Resultado de la Evaluación CAPD
            </h2>

            <div className="space-y-6">
              {/* Puntuación Total y Diagnóstico */}
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">
                  Puntuación Total CAPD
                </div>
                <div className="text-5xl font-bold text-gray-800 mb-2">
                  {puntuacionTotal}
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  de 32 puntos posibles
                </div>
                <div
                  className={`text-xl font-bold ${
                    tieneDelirium() ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {tieneDelirium()
                    ? "🟥 POSITIVO para Delirium"
                    : "🟩 NEGATIVO para Delirium"}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Punto de corte: ≥{escalaActual.puntoCorte} puntos
                </div>
              </div>

              {/* Interpretación */}
              {interpretacion && (
                <div
                  className={`p-6 rounded-lg border-2 ${interpretacion.color}`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">
                      {interpretacion.resultado}
                    </div>
                    <p className="text-lg mb-2">{interpretacion.descripcion}</p>
                    <p className="text-sm text-gray-600">
                      Rango de puntuación: {interpretacion.min} -{" "}
                      {interpretacion.max} puntos
                    </p>
                  </div>
                </div>
              )}

              {/* Recomendaciones según resultado */}
              <div
                className={`rounded-lg p-6 ${
                  tieneDelirium()
                    ? "bg-red-50 border border-red-200"
                    : "bg-green-50 border border-green-200"
                }`}
              >
                <h3
                  className={`font-semibold mb-3 text-lg ${
                    tieneDelirium() ? "text-red-800" : "text-green-800"
                  }`}
                >
                  {tieneDelirium()
                    ? "🔴 Acciones Recomendadas:"
                    : "🟢 Manejo Recomendado:"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 text-gray-700">
                      Manejo Inmediato:
                    </h4>
                    <ul className="text-sm list-disc list-inside space-y-1 text-gray-600">
                      {tieneDelirium() ? (
                        <>
                          <li>Notificar al médico inmediatamente</li>
                          <li>
                            Evaluar causas reversibles (infección, medicamentos)
                          </li>
                          <li>Optimizar entorno (luz, ruido, orientación)</li>
                          <li>Presencia de familiares continuamente</li>
                        </>
                      ) : (
                        <>
                          <li>Continuar monitorización rutinaria</li>
                          <li>Mantener entorno terapéutico</li>
                          <li>Reevaluar si hay cambios en el comportamiento</li>
                          <li>Documentar evaluación negativa</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-gray-700">
                      Seguimiento:
                    </h4>
                    <ul className="text-sm list-disc list-inside space-y-1 text-gray-600">
                      {tieneDelirium() ? (
                        <>
                          <li>Reevaluar cada 4-8 horas con CAPD</li>
                          <li>Monitorización estrecha de signos vitales</li>
                          <li>Consulta con neurología/psiquiatría infantil</li>
                          <li>Considerar estudios de laboratorio</li>
                        </>
                      ) : (
                        <>
                          <li>Reevaluar cada 12-24 horas</li>
                          <li>Monitorizar factores de riesgo</li>
                          <li>Educar a familia sobre signos de alarma</li>
                          <li>Documentar en hoja de evolución</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Resumen para documentación */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Resumen para Documentación:
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Fecha/Hora:</strong> {new Date().toLocaleString()}
                  </p>
                  <p>
                    <strong>Escala:</strong> {escalaActual.titulo}
                  </p>
                  <p>
                    <strong>Puntuación CAPD:</strong> {puntuacionTotal}/32
                    puntos
                  </p>
                  <p>
                    <strong>Resultado:</strong> {interpretacion?.resultado} -{" "}
                    {tieneDelirium() ? "POSITIVO" : "NEGATIVO"} para delirium
                  </p>
                  <p>
                    <strong>Items evaluados:</strong>{" "}
                    {escalaActual.items.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botones de Acción */}
        <div className="flex justify-center space-x-4 pt-6">
          <button
            onClick={resetEvaluacion}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg cursor-pointer font-medium hover:bg-gray-700 transition-colors duration-200 shadow-sm"
          >
            Nueva Evaluación
          </button>
          {evaluacionCompleta && (
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              Imprimir Reporte CAPD
            </button>
          )}
        </div>

        {/* Footer informativo */}
        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>
            <strong>Cornell Assessment of Pediatric Delirium (CAPD)</strong> -
            Herramienta validada para screening de delirium
          </p>
          <p className="text-xs mt-1">
            Punto de corte: ≥9 puntos | Sensibilidad: 94% | Especificidad: 79%
          </p>
          <p className="text-xs mt-1">
            Travers et al. Pediatr Crit Care Med. 2018
          </p>
        </footer>
      </div>
    </div>
  );
};

export default EscalasDelirium;
