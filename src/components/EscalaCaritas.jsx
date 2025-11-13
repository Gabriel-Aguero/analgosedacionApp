// src/components/EscalaCaritas.jsx
import { useState, useEffect } from "preact/hooks";
import { Info } from "../icons/Info";
import { ArrowLeft } from "../icons/ArrowLeft";
import { Refresh } from "../icons/Refresh";

const EscalaCaritas = () => {
  const [caritaSeleccionada, setCaritaSeleccionada] = useState(null);
  const [nivelDolor, setNivelDolor] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // Definición de caritas y niveles de dolor
  const caritasDolor = [
    {
      id: 0,
      emoji: "😊",
      nivel: "Sin dolor",
      descripcion: "No duele nada, me siento bien",
      color: "green",
      badgeClass: "bg-green-100 text-green-800",
      valor: 0,
    },
    {
      id: 1,
      emoji: "🙂",
      nivel: "Dolor muy leve",
      descripcion: "Duele muy poco, apenas se nota",
      color: "green",
      badgeClass: "bg-green-100 text-green-800",
      valor: 2,
    },
    {
      id: 2,
      emoji: "😐",
      nivel: "Dolor leve",
      descripcion: "Duele un poco, pero puedo hacer mis actividades",
      color: "yellow",
      badgeClass: "bg-yellow-100 text-yellow-800",
      valor: 4,
    },
    {
      id: 3,
      emoji: "😖",
      nivel: "Dolor moderado",
      descripcion: "Duele bastante y me molesta para algunas actividades",
      color: "orange",
      badgeClass: "bg-orange-100 text-orange-800",
      valor: 6,
    },
    {
      id: 4,
      emoji: "😫",
      nivel: "Dolor severo",
      descripcion: "Duele mucho y me cuesta concentrarme",
      color: "red",
      badgeClass: "bg-red-100 text-red-800",
      valor: 8,
    },
    {
      id: 5,
      emoji: "😭",
      nivel: "El peor dolor",
      descripcion: "Duele muchísimo, no puedo pensar en otra cosa",
      color: "red",
      badgeClass: "bg-red-100 text-red-800",
      valor: 10,
    },
  ];

  const seleccionarCarita = (carita) => {
    console.log(`Carita seleccionada: ${carita.emoji} - ${carita.nivel}`);
    setCaritaSeleccionada(carita);
    setNivelDolor(carita);
    setMostrarResultado(false);
  };

  useEffect(() => {
    if (caritaSeleccionada !== null) {
      const timer = setTimeout(() => {
        setMostrarResultado(true);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [caritaSeleccionada]);

  const reiniciarEscala = () => {
    setCaritaSeleccionada(null);
    setNivelDolor(null);
    setMostrarResultado(false);
  };

  // Función para obtener clases del botón
  const getButtonClasses = (carita) => {
    const baseClasses =
      "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ease-in-out hover:scale-105 hover:-translate-y-1 active:translate-y-0";

    if (caritaSeleccionada?.id === carita.id) {
      switch (carita.color) {
        case "green":
          return `${baseClasses} border-green-500 bg-green-50 scale-110 shadow-lg`;
        case "yellow":
          return `${baseClasses} border-yellow-500 bg-yellow-50 scale-110 shadow-lg`;
        case "orange":
          return `${baseClasses} border-orange-500 bg-orange-50 scale-110 shadow-lg`;
        case "red":
          return `${baseClasses} border-red-500 bg-red-50 scale-110 shadow-lg`;
        default:
          return `${baseClasses} border-green-500 bg-green-50 scale-110 shadow-lg`;
      }
    }

    return `${baseClasses} border-gray-200 bg-white hover:border-blue-300 hover:shadow-md`;
  };

  const getTextColor = (carita) => {
    if (caritaSeleccionada?.id === carita.id) {
      switch (carita.color) {
        case "green":
          return "text-green-700";
        case "yellow":
          return "text-yellow-700";
        case "orange":
          return "text-orange-700";
        case "red":
          return "text-red-700";
        default:
          return "text-green-700";
      }
    }
    return "text-gray-600";
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navegación */}
      <div className="mb-6 flex flex-col items-center justify-center gap-2">
        <h1 className="mt-10 text-3xl font-bold text-orange-800 mb-2">
          Escala de Caritas del Dolor
        </h1>
        <p className="text-gray-600">
          Seleccione la carita que mejor represente cómo se siente
        </p>
      </div>

      {/* Contenedor Principal */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Instrucciones */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            😉​ Escala de Expresiones Faciales
          </div>
          <p className="text-gray-700">
            Elija la cara que muestre mejor cómo se siente por el dolor
          </p>
        </div>

        {/* Grid de Caritas */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {caritasDolor.map((carita) => (
              <button
                key={carita.id}
                onClick={() => seleccionarCarita(carita)}
                className={getButtonClasses(carita)}
              >
                <span className="text-5xl mb-3 transition-transform duration-200 hover:scale-110">
                  {carita.emoji}
                </span>
                <span
                  className={`text-sm font-medium text-center ${getTextColor(
                    carita
                  )}`}
                >
                  {carita.nivel}
                </span>
              </button>
            ))}
          </div>

          {/* Escala de intensidad */}
          <div className="flex justify-between text-xs text-gray-500 px-2 mb-2">
            <span>Sin dolor</span>
            <span>Dolor leve</span>
            <span>Dolor moderado</span>
            <span>Dolor severo</span>
          </div>
          <div className="h-3 bg-linear-to-r from-green-400 via-orange-400 to-red-500 rounded-full"></div>
          <div className="flex justify-between text-xs text-gray-500 px-2 mt-1">
            <span>0</span>
            <span>2</span>
            <span>4</span>
            <span>6</span>
            <span>8</span>
            <span>10</span>
          </div>
        </div>

        {/* Resultado */}
        {caritaSeleccionada && (
          <div
            className={`bg-gray-50 rounded-xl p-6 border-2 border-orange-200 transition-all duration-300 ease-in-out ${
              mostrarResultado
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-6xl mr-4">
                  {caritaSeleccionada.emoji}
                </span>
                <div className="text-left">
                  <div className="flex items-baseline mb-2">
                    <span
                      className={`text-3xl font-bold mr-2 ${getTextColor(
                        caritaSeleccionada
                      )}`}
                    >
                      {caritaSeleccionada.valor}
                    </span>
                    <span className="text-gray-500 text-lg">/10</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {caritaSeleccionada.nivel}
                  </h3>
                </div>
              </div>

              <p className="text-gray-600 mb-4 text-lg">
                {caritaSeleccionada.descripcion}
              </p>

              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${caritaSeleccionada.badgeClass}`}
              >
                <span className="mr-2">{caritaSeleccionada.emoji}</span>
                <span>{caritaSeleccionada.nivel}</span>
              </div>
            </div>
          </div>
        )}

        {/* Botón de reinicio */}
        <div className="text-center mt-6 flex gap-2 items-center justify-center">
          <button
            onClick={reiniciarEscala}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <Refresh />
            Elegir Otra Carita
          </button>

          {caritaSeleccionada && (
            <button
              onClick={() => window.print()}
              class="inline-flex items-center px-4 gap-2 py-2 bg-orange-600 text-gray-100 font-bold rounded-lg hover:bg-orange-800 transition-colors duration-200"
            >
              Imprimir Reporte
            </button>
          )}
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">
          Sobre la Escala de Caritas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-700">
          <div className="flex items-start gap-2">
            <Info />
            <span>
              Ideal para niños, adultos mayores y personas con dificultades de
              comunicación
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Info />
            <span>
              Las expresiones faciales son universales y fáciles de entender
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Info />
            <span>
              No requiere habilidades de lectura o comprensión numérica
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Info />
            <span>
              Validada para uso en pediatría y pacientes con discapacidad
              cognitiva
            </span>
          </div>
        </div>
      </div>

      {/* Ejemplos de uso */}
      <div className="mt-6 bg-green-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-3">
          ¿Cómo usar esta escala?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-700">
          <div className="text-center">
            <div className="text-3xl mb-2">👶</div>
            <p>Para niños pequeños que no pueden usar números</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🧓</div>
            <p>Para adultos mayores con dificultades visuales</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🗣️</div>
            <p>Cuando hay barreras de lenguaje o comunicación</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscalaCaritas;
