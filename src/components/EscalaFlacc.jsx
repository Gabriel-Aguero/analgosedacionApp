// src/components/EscalaFlacc.jsx
import { useState, useEffect } from "preact/hooks";
import { ArrowLeft } from "../icons/ArrowLeft";
import { CircleCheck } from "../icons/CircleCheck";

const EscalaFlacc = () => {
  const [puntajes, setPuntajes] = useState({
    facial: null,
    piernas: null,
    actividad: null,
    llanto: null,
    consolabilidad: null,
  });

  const [puntajeTotal, setPuntajeTotal] = useState(0);
  const [nivelDolor, setNivelDolor] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // Definición de criterios FLACC
  const criteriosFLACC = {
    facial: {
      titulo: "Expresión Facial",
      descripcion:
        "Observar la expresión facial en reposo y durante el movimiento",
      opciones: [
        {
          valor: 0,
          descripcion: "Expresión neutra o sonrisa",
          texto: "Sonriente o relajado",
        },
        {
          valor: 1,
          descripcion: "Mirada triste, expresión preocupada, retraído",
          texto: "Occasionalmente frunce el ceño",
        },
        {
          valor: 2,
          descripcion:
            "Frecuente o constante fruncimiento de ceño, mandíbula apretada, barbilla temblorosa",
          texto: "Frecuente/constante fruncimiento",
        },
      ],
    },
    piernas: {
      titulo: "Piernas",
      descripcion: "Observar la posición y movimiento de las piernas",
      opciones: [
        {
          valor: 0,
          descripcion: "Posición relajada, movimientos normales",
          texto: "Posición relajada",
        },
        {
          valor: 1,
          descripcion: "Inquieto, inquietud, tensión",
          texto: "Inquieto, tenso",
        },
        {
          valor: 2,
          descripcion: "Patadas, o piernas rígidas o retiradas",
          texto: "Patalea o piernas rígidas",
        },
      ],
    },
    actividad: {
      titulo: "Actividad",
      descripcion: "Observar el nivel de actividad y movimiento corporal",
      opciones: [
        {
          valor: 0,
          descripcion:
            "Acostado tranquilamente, posición normal, se mueve fácilmente",
          texto: "Tranquilo, se mueve normal",
        },
        {
          valor: 1,
          descripcion: "Retorcerse, cambios de posición, tenso",
          texto: "Se retuerce, cambios frecuentes",
        },
        {
          valor: 2,
          descripcion: "Arqueado, rígido o convulsivo",
          texto: "Arqueado, rígido o convulsivo",
        },
      ],
    },
    llanto: {
      titulo: "Llanto",
      descripcion: "Evaluar las vocalizaciones y sonidos",
      opciones: [
        {
          valor: 0,
          descripcion: "No llora (despierto o dormido)",
          texto: "No llora",
        },
        {
          valor: 1,
          descripcion: "Gemidos o quejidos, quejas ocasionales",
          texto: "Gemidos o quejidos",
        },
        {
          valor: 2,
          descripcion: "Llanto constante, gritos o sollozos, quejas frecuentes",
          texto: "Llanto constante, gritos",
        },
      ],
    },
    consolabilidad: {
      titulo: "Consolabilidad",
      descripcion: "Capacidad de ser consolado",
      opciones: [
        {
          valor: 0,
          descripcion: "Contento, relajado",
          texto: "Contento, relajado",
        },
        {
          valor: 1,
          descripcion:
            "Se tranquiliza con el contacto, abrazos o siendo distraído",
          texto: "Se tranquiliza con contacto",
        },
        {
          valor: 2,
          descripcion: "Difícil de consolar o reconfortar",
          texto: "Difícil de consolar",
        },
      ],
    },
  };

  // Niveles de dolor según puntaje FLACC
  const nivelesDolorFLACC = {
    0: {
      nivel: "Sin dolor",
      color: "green",
      badgeClass: "bg-green-100 text-green-800",
    },
    1: {
      nivel: "Dolor leve",
      color: "green",
      badgeClass: "bg-green-100 text-green-800",
    },
    2: {
      nivel: "Dolor leve",
      color: "green",
      badgeClass: "bg-green-100 text-green-800",
    },
    3: {
      nivel: "Dolor leve a moderado",
      color: "yellow",
      badgeClass: "bg-yellow-100 text-yellow-800",
    },
    4: {
      nivel: "Dolor moderado",
      color: "yellow",
      badgeClass: "bg-yellow-100 text-yellow-800",
    },
    5: {
      nivel: "Dolor moderado",
      color: "orange",
      badgeClass: "bg-orange-100 text-orange-800",
    },
    6: {
      nivel: "Dolor moderado a severo",
      color: "orange",
      badgeClass: "bg-orange-100 text-orange-800",
    },
    7: {
      nivel: "Dolor severo",
      color: "red",
      badgeClass: "bg-red-100 text-red-800",
    },
    8: {
      nivel: "Dolor severo",
      color: "red",
      badgeClass: "bg-red-100 text-red-800",
    },
    9: {
      nivel: "Dolor muy severo",
      color: "red",
      badgeClass: "bg-red-100 text-red-800",
    },
    10: {
      nivel: "Dolor máximo",
      color: "red",
      badgeClass: "bg-red-100 text-red-800",
    },
  };

  const seleccionarOpcion = (criterio, valor) => {
    setPuntajes((prev) => ({
      ...prev,
      [criterio]: valor,
    }));
  };

  useEffect(() => {
    // Calcular puntaje total cuando cambien los puntajes
    const total = Object.values(puntajes).reduce(
      (sum, valor) => sum + (valor || 0),
      0
    );
    setPuntajeTotal(total);

    if (total > 0 && Object.values(puntajes).every((val) => val !== null)) {
      setNivelDolor(nivelesDolorFLACC[total] || nivelesDolorFLACC[0]);
      setMostrarResultado(true);
    } else {
      setMostrarResultado(false);
    }
  }, [puntajes]);

  const reiniciarEscala = () => {
    setPuntajes({
      facial: null,
      piernas: null,
      actividad: null,
      llanto: null,
      consolabilidad: null,
    });
    setPuntajeTotal(0);
    setNivelDolor(null);
    setMostrarResultado(false);
  };

  const todosCriteriosCompletados = Object.values(puntajes).every(
    (val) => val !== null
  );

  const getColorClase = (criterio, valor) => {
    if (puntajes[criterio] === valor) {
      const puntajeActual = puntajes[criterio] || 0;
      if (puntajeActual === 0) return "border-green-500 bg-green-50";
      if (puntajeActual === 1) return "border-yellow-500 bg-yellow-50";
      if (puntajeActual === 2) return "border-red-500 bg-red-50";
    }
    return "border-gray-200 hover:border-blue-300 hover:bg-blue-50";
  };

  const getTextColor = (criterio, valor) => {
    if (puntajes[criterio] === valor) {
      const puntajeActual = puntajes[criterio] || 0;
      if (puntajeActual === 0) return "text-green-700";
      if (puntajeActual === 1) return "text-yellow-700";
      if (puntajeActual === 2) return "text-red-700";
    }
    return "text-gray-600";
  };

  return (
    <div class="max-w-6xl mx-auto">
      {/* Navegación */}
      <div class="mb-6">
        <a
          href="/dolor"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
        >
          <ArrowLeft />
          Volver a Escalas de Dolor
        </a>
        <h1 class="text-3xl font-bold text-purple-800 mb-2">Escala FLACC</h1>
        <p class="text-gray-600">
          Face, Legs, Activity, Cry, Consolability - Para evaluación del dolor
          en pacientes no comunicativos
        </p>
      </div>

      {/* Contenedor Principal */}
      <div class="bg-white rounded-xl shadow-lg p-8">
        {/* Instrucciones */}
        <div class="mb-8">
          <div class="inline-flex gap-2 items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
            <CircleCheck />
            Escala Conductual del Dolor
          </div>
          <p class="text-gray-700 mb-4">
            Evalúe cada criterio observando al paciente y seleccione la opción
            que mejor describa su comportamiento.
          </p>

          {/* Puntaje actual */}
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-gray-600">
                Puntaje parcial:
              </span>
              <div class="flex items-baseline">
                <span class="text-2xl font-bold text-purple-600">
                  {puntajeTotal}
                </span>
                <span class="text-gray-500 text-sm ml-1">/10</span>
              </div>
            </div>
            <div class="mt-2 flex space-x-1">
              {Object.entries(puntajes).map(([criterio, valor]) => (
                <div
                  key={criterio}
                  class={`flex-1 h-2 rounded-full ${
                    valor === null
                      ? "bg-gray-200"
                      : valor === 0
                      ? "bg-green-400"
                      : valor === 1
                      ? "bg-yellow-400"
                      : "bg-red-400"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Criterios FLACC */}
        <div class="space-y-8">
          {Object.entries(criteriosFLACC).map(([key, criterio]) => (
            <div key={key} class="border border-gray-200 rounded-lg p-6">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-1">
                    {criterio.titulo}
                  </h3>
                  <p class="text-sm text-gray-600">{criterio.descripcion}</p>
                </div>
                {puntajes[key] !== null && (
                  <span
                    class={`px-3 py-1 rounded-full text-sm font-medium ${
                      puntajes[key] === 0
                        ? "bg-green-100 text-green-800"
                        : puntajes[key] === 1
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    Puntaje: {puntajes[key]}
                  </span>
                )}
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                {criterio.opciones.map((opcion) => (
                  <button
                    key={opcion.valor}
                    onClick={() => seleccionarOpcion(key, opcion.valor)}
                    class={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md ${getColorClase(
                      key,
                      opcion.valor
                    )}`}
                  >
                    <div class="flex items-start mb-2">
                      <div
                        class={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                          puntajes[key] === opcion.valor
                            ? "border-current bg-current text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {puntajes[key] === opcion.valor && (
                          <svg
                            class="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        )}
                      </div>
                      <span
                        class={`font-medium ${getTextColor(key, opcion.valor)}`}
                      >
                        {opcion.texto}
                      </span>
                    </div>
                    <p class="text-sm text-gray-500 ml-9">
                      {opcion.descripcion}
                    </p>
                    <div class="mt-2 flex justify-between items-center">
                      <span class="text-xs text-gray-400">
                        Puntaje: {opcion.valor}
                      </span>
                      {puntajes[key] === opcion.valor && (
                        <svg
                          class="w-4 h-4 text-current"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
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
            class={`mt-8 bg-gray-50 rounded-xl p-6 border-2 border-purple-200 transition-all duration-300 ease-in-out ${
              mostrarResultado
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-800 mb-4">
                Resultado de la Evaluación FLACC
              </h3>

              <div class="flex items-center justify-center mb-6">
                <div class="text-center mr-8">
                  <div class="text-5xl font-bold text-purple-600 mb-2">
                    {puntajeTotal}
                  </div>
                  <div class="text-gray-500">Puntaje Total</div>
                </div>

                <div class="h-16 w-px bg-gray-300"></div>

                <div class="text-center ml-8">
                  <div
                    class={`text-xl font-semibold mb-2 ${getTextColor(
                      "facial",
                      puntajes.facial
                    )}`}
                  >
                    {nivelDolor.nivel}
                  </div>
                  <div
                    class={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${nivelDolor.badgeClass}`}
                  >
                    <span>Nivel de Dolor</span>
                  </div>
                </div>
              </div>

              {/* Interpretación */}
              <div class="bg-white rounded-lg p-4 border">
                <h4 class="font-semibold text-gray-800 mb-2">
                  Interpretación:
                </h4>
                <p class="text-gray-600 text-sm">
                  {puntajeTotal === 0 &&
                    "El paciente no muestra signos conductuales de dolor."}
                  {puntajeTotal >= 1 &&
                    puntajeTotal <= 3 &&
                    "Dolor leve. Considerar intervenciones no farmacológicas y monitorizar."}
                  {puntajeTotal >= 4 &&
                    puntajeTotal <= 6 &&
                    "Dolor moderado. Se recomienda intervención farmacológica apropiada."}
                  {puntajeTotal >= 7 &&
                    "Dolor severo. Requiere intervención inmediata y reevaluación frecuente."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={reiniciarEscala}
            class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Reiniciar Evaluación
          </button>

          {!todosCriteriosCompletados && (
            <div class="text-sm text-orange-600 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Complete todos los criterios
            </div>
          )}
        </div>
      </div>

      {/* Información adicional */}
      <div class="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 class="text-lg font-semibold text-blue-800 mb-3">
          Sobre la Escala FLACC
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div class="flex items-start">
            <svg
              class="w-5 h-5 mt-0.5 mr-2 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>
              Diseñada para pacientes que no pueden comunicar verbalmente su
              dolor
            </span>
          </div>
          <div class="flex items-start">
            <svg
              class="w-5 h-5 mt-0.5 mr-2 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>
              Ideal para niños pequeños, adultos con demencia o pacientes
              críticos
            </span>
          </div>
          <div class="flex items-start">
            <svg
              class="w-5 h-5 mt-0.5 mr-2 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>
              Evalúa 5 dimensiones conductuales del dolor con puntaje de 0-2
              cada una
            </span>
          </div>
          <div class="flex items-start">
            <svg
              class="w-5 h-5 mt-0.5 mr-2 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>
              Puntaje total de 0-10: 0-3 leve, 4-6 moderado, 7-10 severo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscalaFlacc;
