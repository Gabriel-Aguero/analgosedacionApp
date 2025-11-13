// src/components/EscalaNumerica.jsx
import { useState, useEffect } from "preact/hooks";
import { ArrowLeft } from "../icons/ArrowLeft";
import { Refresh } from "../icons/Refresh";

const EscalaNumerica = () => {
  const [numeroSeleccionado, setNumeroSeleccionado] = useState(null);
  const [nivelDolor, setNivelDolor] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // Definición de niveles de dolor
  const nivelesDolor = {
    0: {
      nivel: "Sin dolor",
      descripcion: "No se percibe dolor",
      color: "green",
      badgeClass: "bg-green-100 text-green-800",
    },
    1: {
      nivel: "Dolor muy leve",
      descripcion: "Dolor apenas perceptible",
      color: "green",
      badgeClass: "bg-green-100 text-green-800",
    },
    2: {
      nivel: "Dolor leve",
      descripcion: "Dolor molesto pero tolerable",
      color: "green",
      badgeClass: "bg-green-100 text-green-800",
    },
    3: {
      nivel: "Dolor leve",
      descripcion: "Dolor molesto que interfiere ligeramente con actividades",
      color: "green",
      badgeClass: "bg-green-100 text-green-800",
    },
    4: {
      nivel: "Dolor moderado",
      descripcion: "Dolor que interfiere significativamente con actividades",
      color: "yellow",
      badgeClass: "bg-yellow-100 text-yellow-800",
    },
    5: {
      nivel: "Dolor moderado",
      descripcion: "Dolor que dificulta las actividades diarias",
      color: "yellow",
      badgeClass: "bg-yellow-100 text-yellow-800",
    },
    6: {
      nivel: "Dolor moderado-severo",
      descripcion: "Dolor que requiere atención médica",
      color: "orange",
      badgeClass: "bg-orange-100 text-orange-800",
    },
    7: {
      nivel: "Dolor severo",
      descripcion: "Dolor que domina los pensamientos y limita actividades",
      color: "orange",
      badgeClass: "bg-orange-100 text-orange-800",
    },
    8: {
      nivel: "Dolor intenso",
      descripcion: "Dolor que dificulta la concentración y el sueño",
      color: "red",
      badgeClass: "bg-red-100 text-red-800",
    },
    9: {
      nivel: "Dolor intenso",
      descripcion: "Dolor incapacitante que requiere tratamiento urgente",
      color: "red",
      badgeClass: "bg-red-100 text-red-800",
    },
    10: {
      nivel: "El peor dolor imaginable",
      descripcion: "Dolor máximo, insoportable e incapacitante",
      color: "red",
      badgeClass: "bg-red-100 text-red-800",
    },
  };

  const seleccionarNumero = (numero) => {
    setNumeroSeleccionado(numero);
    setNivelDolor(nivelesDolor[numero]);
    setMostrarResultado(false);
  };

  useEffect(() => {
    if (numeroSeleccionado !== null) {
      // Pequeño delay para permitir que React actualice el DOM antes de la animación
      const timer = setTimeout(() => {
        setMostrarResultado(true);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [numeroSeleccionado]);

  const reiniciarEscala = () => {
    setNumeroSeleccionado(null);
    setNivelDolor(null);
    setMostrarResultado(false);
  };

  // Mapeo de clases de color para Tailwind
  const colorClasses = {
    green: {
      border: "border-green-500",
      bg: "bg-green-100",
      text: "text-green-600",
    },
    yellow: {
      border: "border-yellow-500",
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    orange: {
      border: "border-orange-500",
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    red: {
      border: "border-red-500",
      bg: "bg-red-100",
      text: "text-red-600",
    },
  };

  const getColorClase = (numero) => {
    if (numeroSeleccionado === numero) {
      const color = nivelesDolor[numero]?.color;
      const classes = colorClasses[color];
      if (classes) {
        return `${classes.border} ${classes.bg} scale-105`;
      }
    }
    return "border-gray-200 hover:border-green-400 hover:bg-green-50";
  };

  const getTextColorClase = (numero) => {
    if (numeroSeleccionado === numero) {
      const color = nivelesDolor[numero]?.color;
      const classes = colorClasses[color];
      if (classes) {
        return classes.text;
      }
    }
    return numero === 0 ? "text-gray-400" : "text-gray-600";
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navegación */}
      <div className="mb-6 flex flex-col items-center justify-center gap-2">
        <h1 className="mt-10 text-3xl font-bold text-green-800 mb-2">
          Escala Numérica del Dolor
        </h1>
        <p className="text-gray-600">
          Seleccione un número del 0 al 10 que mejor represente su nivel de
          dolor
        </p>
      </div>

      {/* Contenedor Principal */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Instrucciones */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Escala Verbal Numérica
          </div>
          <p className="text-gray-700">
            Donde{" "}
            <strong className="text-green-600">0 significa "Sin dolor"</strong>{" "}
            y
            <strong className="text-red-600">
              {" "}
              10 significa "El peor dolor imaginable"
            </strong>
          </p>
        </div>

        {/* Barra Numérica */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600 font-medium">Sin dolor</span>
            <span className="text-sm text-gray-600 font-medium">
              Peor dolor imaginable
            </span>
          </div>

          <div className="grid grid-cols-11 gap-2 mb-4">
            {/* Números 0-10 */}
            {Array.from({ length: 11 }, (_, i) => i).map((numero) => (
              <button
                key={numero}
                onClick={() => seleccionarNumero(numero)}
                className={`
                  flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ease-in-out hover:-translate-y-0.5 active:translate-y-0 group
                  ${getColorClase(numero)}
                `}
                title={`${numero}: ${nivelesDolor[numero]?.nivel} - ${nivelesDolor[numero]?.descripcion}`}
              >
                <span
                  className={`text-2xl font-bold transition-colors duration-200 ${getTextColorClase(
                    numero
                  )}`}
                >
                  {numero}
                </span>
              </button>
            ))}
          </div>

          {/* Indicadores de color */}
          <div className="flex justify-between text-xs text-gray-500 px-1">
            <span>Leve</span>
            <span>Moderado</span>
            <span>Severo</span>
          </div>
          <div className="h-2 bg-linear-to-r from-green-400 via-yellow-400 to-red-500 rounded-full mt-1"></div>
        </div>

        {/* Resultado */}
        {numeroSeleccionado !== null && nivelDolor && (
          <div
            className={`bg-gray-50 rounded-lg p-6 border-2 border-green-200 transition-all duration-300 ease-in-out ${
              mostrarResultado
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <div className="text-center">
              <div className="flex justify-center items-baseline mb-4">
                <span
                  className={`text-4xl font-bold mr-2 ${
                    colorClasses[nivelDolor.color]?.text || "text-gray-600"
                  }`}
                >
                  {numeroSeleccionado}
                </span>
                <span className="text-gray-500 text-lg">/10</span>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {nivelDolor.nivel}
              </h3>
              <p className="text-gray-600 mb-4">{nivelDolor.descripcion}</p>

              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${nivelDolor.badgeClass}`}
              >
                <span>{nivelDolor.nivel}</span>
              </div>
            </div>
          </div>
        )}

        {/* Botón de reinicio */}
        <div className="text-center mt-6 flex gap-2 items-center justify-center">
          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={reiniciarEscala}
              className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 gap-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Refresh className="w-4 h-4" />
              Reiniciar Evaluación
            </button>

            {numeroSeleccionado !== null && (
              <button
                onClick={() => window.print()}
                class="inline-flex items-center px-4 gap-2 py-2 bg-green-600 text-gray-100 font-bold rounded-lg hover:bg-green-800 transition-colors duration-200"
              >
                Imprimir Reporte
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">
          Sobre la Escala Numérica
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 mt-0.5 mr-2 shrink-0"
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
              Es la escala más utilizada en pacientes adultos comunicativos
            </span>
          </div>
          <div className="flex items-start">
            <svg
              className="w-5 h-5 mt-0.5 mr-2 shrink-0"
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
              Proporciona una medición subjetiva pero estandarizada del dolor
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscalaNumerica;
