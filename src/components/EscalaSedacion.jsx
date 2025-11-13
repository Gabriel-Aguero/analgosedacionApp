import { useState } from "preact/hooks";
import { Check } from "../icons/Check";

const EscalaSedacion = () => {
  const [nivelSedacion, setNivelSedacion] = useState(null);
  const [observaciones, setObservaciones] = useState("");

  const escalaRamsay = [
    {
      valor: 1,
      descripcion: "Ansioso, agitado o inquieto",
      caracteristicas:
        "Paciente visiblemente nervioso, movimientos constantes, dificultad para permanecer tranquilo",
    },
    {
      valor: 2,
      descripcion: "Cooperativo, orientado y tranquilo",
      caracteristicas:
        "Paciente colaborador, responde adecuadamente, mantiene contacto visual, relajado",
    },
    {
      valor: 3,
      descripcion: "Somnoliento, responde a órdenes",
      caracteristicas:
        "Somnolencia evidente, pero responde adecuadamente a comandos verbales",
    },
    {
      valor: 4,
      descripcion: "Dormido, respuesta rápida al estímulo",
      caracteristicas:
        "Duerme tranquilamente, responde rápidamente a estímulos táctiles o verbales suaves",
    },
    {
      valor: 5,
      descripcion: "Dormido, respuesta lenta al estímulo",
      caracteristicas:
        "Sueño profundo, respuesta lenta o perezosa a estímulos físicos o verbales",
    },
    {
      valor: 6,
      descripcion: "Sin respuesta al estímulo",
      caracteristicas:
        "No responde a estímulos dolorosos o verbales, ausencia de reflejos protectores",
    },
  ];

  const handleNivelChange = (valor) => {
    setNivelSedacion(valor);
  };

  const resetEvaluacion = () => {
    setNivelSedacion(null);
    setObservaciones("");
  };

  const getInterpretacion = () => {
    if (nivelSedacion === null) return null;

    const interpretaciones = {
      1: {
        tipo: "agitación",
        color: "bg-red-100 border-red-300 text-red-800",
        mensaje:
          "Paciente agitado - Considerar evaluación de causas y medidas de contención",
        recomendaciones: [
          "Evaluar causas de agitación (dolor, hipoxia, retención urinaria)",
          "Considerar medidas de contención no farmacológicas",
          "Monitorizar signos vitales frecuentemente",
          "Valorar necesidad de sedación",
        ],
      },
      2: {
        tipo: "ideal",
        color: "bg-green-100 border-green-300 text-green-800",
        mensaje:
          "Nivel de sedación adecuado - Estado óptimo para procedimientos",
        recomendaciones: [
          "Mantener monitorización regular",
          "Continuar con manejo actual",
          "Documentar estado cada hora",
          "Observar cambios en el nivel de conciencia",
        ],
      },
      3: {
        tipo: "sedacion-leve",
        color: "bg-blue-100 border-blue-300 text-blue-800",
        mensaje: "Sedación leve - Adecuado para procedimientos menores",
        recomendaciones: [
          "Monitorizar vía aérea y respiración",
          "Verificar respuesta a estímulos verbales",
          "Documentar cada 30 minutos",
          "Observar profundización de sedación",
        ],
      },
      4: {
        tipo: "sedacion-moderada",
        color: "bg-indigo-100 border-indigo-300 text-indigo-800",
        mensaje: "Sedación moderada - Vigilar función respiratoria",
        recomendaciones: [
          "Monitorización continua de saturación",
          "Verificar permeabilidad de vía aérea",
          "Documentar cada 15-30 minutos",
          "Preparar equipo de emergencia",
        ],
      },
      5: {
        tipo: "sedacion-profunda",
        color: "bg-purple-100 border-purple-300 text-purple-800",
        mensaje: "Sedación profunda - Riesgo aumentado de complicaciones",
        recomendaciones: [
          "Monitorización estrecha de signos vitales",
          "Evaluación constante de vía aérea",
          "Documentar cada 15 minutos",
          "Presencia de personal entrenado en manejo de vía aérea",
        ],
      },
      6: {
        tipo: "coma",
        color: "bg-gray-100 border-gray-300 text-gray-800",
        mensaje: "Estado comatoso - Emergencia médica",
        recomendaciones: [
          "Activar protocolo de emergencia",
          "Manejo avanzado de vía aérea",
          "Monitorización invasiva",
          "Evaluación neurológica inmediata",
        ],
      },
    };

    return interpretaciones[nivelSedacion];
  };

  const interpretacion = getInterpretacion();
  const nivelSeleccionado = escalaRamsay.find(
    (nivel) => nivel.valor === nivelSedacion
  );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-transparent min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Escala de Sedación
          </h1>
          <p className="text-gray-600">
            Evaluación del nivel de conciencia y sedación
          </p>
        </div>

        {/* Escala de Ramsay */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Seleccione el Nivel de Sedación
          </h2>
          <div className="space-y-3">
            {escalaRamsay.map((nivel) => (
              <div
                key={nivel.valor}
                className={`p-4 rounded-lg border-2 border-gray-500 cursor-pointer transition-all duration-200 ${
                  nivelSedacion === nivel.valor
                    ? "border-blue-500 bg-blue-50 transform scale-[1.02] shadow-md"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
                onClick={() => handleNivelChange(nivel.valor)}
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-700 text-lg">
                      {nivel.valor}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 text-lg">
                      {nivel.descripcion}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {nivel.caracteristicas}
                    </p>
                  </div>
                  {nivelSedacion === nivel.valor && (
                    <div className="ml-4">
                      <Check className="text-green-600" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resultado e Interpretación */}
        {nivelSedacion !== null && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Resultado de la Evaluación
            </h2>

            <div className="space-y-6">
              {/* Nivel seleccionado */}
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600 block mb-2">
                  Nivel de Sedación Seleccionado
                </span>
                <div className="text-5xl font-bold text-gray-800 my-2">
                  {nivelSedacion}
                </div>
                <span className="text-xl font-semibold text-gray-700">
                  {nivelSeleccionado?.descripcion}
                </span>
              </div>

              {/* Interpretación */}
              {interpretacion && (
                <div
                  className={`p-4 rounded-lg border-2 ${interpretacion.color}`}
                >
                  <div className="font-semibold text-lg mb-2">
                    Interpretación Clínica:
                  </div>
                  <p className="text-lg">{interpretacion.mensaje}</p>
                </div>
              )}

              {/* Observaciones */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observaciones Adicionales
                </label>
                <textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Registre observaciones relevantes sobre el estado del paciente..."
                />
              </div>

              {/* Recomendaciones */}
              {interpretacion && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-3 text-lg">
                    Recomendaciones:
                  </h3>
                  <ul className="text-yellow-700 list-disc list-inside space-y-2">
                    {interpretacion.recomendaciones.map(
                      (recomendacion, index) => (
                        <li key={index} className="text-sm">
                          {recomendacion}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

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
                    <strong>Score:</strong> Nivel {nivelSedacion} -{" "}
                    {nivelSeleccionado?.descripcion}
                  </p>
                  <p>
                    <strong>Observaciones:</strong> {observaciones || "Ninguna"}
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
          {nivelSedacion !== null && (
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              Imprimir Reporte
            </button>
          )}
        </div>

        {/* Footer informativo */}
        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>
            <strong>Escala de Sedación</strong> - Evaluación del nivel de
            sedación
          </p>
          <p className="text-xs mt-1">
            Niveles 1-2: Sedación insuficiente | Nivel 3: Sedación leve |
            Niveles 4-5: Sedación moderada-profunda | Nivel 6: Coma
          </p>
        </footer>
      </div>
    </div>
  );
};

export default EscalaSedacion;
