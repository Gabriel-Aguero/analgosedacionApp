// src/components/EscalaOps.jsx
import { useState } from "preact/hooks";
import { ArrowLeft } from "../icons/ArrowLeft";
import { Refresh } from "../icons/Refresh";

const EscalaOps = () => {
  const [facial, setFacial] = useState(null);
  const [movimiento, setMovimiento] = useState(null);
  const [scoreTotal, setScoreTotal] = useState(0);
  const [interpretacion, setInterpretacion] = useState("Sin dolor");
  const [colorInterpretacion, setColorInterpretacion] =
    useState("text-green-600");
  const [mostrarDolorGrave, setMostrarDolorGrave] = useState(false);

  const calcularScore = () => {
    if (facial === null || movimiento === null) {
      alert("Por favor, seleccione una opción para cada criterio");
      return;
    }

    const total = facial + movimiento;
    setScoreTotal(total);

    let nuevaInterpretacion = "";
    let nuevoColor = "";
    let mostrar = false;

    if (total <= 1) {
      nuevaInterpretacion = "Sin dolor";
      nuevoColor = "text-green-600";
    } else if (total <= 3) {
      nuevaInterpretacion = "Dolor leve";
      nuevoColor = "text-yellow-600";
    } else if (total <= 5) {
      nuevaInterpretacion = "Dolor moderado";
      nuevoColor = "text-orange-600";
    } else {
      nuevaInterpretacion = "Dolor intenso";
      nuevoColor = "text-red-600";
      mostrar = true;
    }

    setInterpretacion(nuevaInterpretacion);
    setColorInterpretacion(nuevoColor);
    setMostrarDolorGrave(mostrar);
  };

  const reiniciarEscala = () => {
    setFacial(null);
    setMovimiento(null);
    setScoreTotal(0);
    setInterpretacion("Sin dolor");
    setColorInterpretacion("text-green-600");
    setMostrarDolorGrave(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Navegación */}
      <div className="mb-6">
        <a
          href="/dolor"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Escalas de Dolor
        </a>
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          Escala Conductual de Dolor (BPS)
        </h1>
        <p className="text-gray-600">
          Seleccione una opción para cada criterio para calcular el score del
          paciente.
        </p>
      </div>

      {/* Contenedor Principal */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Criterios de Evaluación
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            calcularScore();
          }}
        >
          {/* Expresión Facial */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Expresión Facial
            </h3>
            <div className="space-y-2">
              {[
                { value: 0, label: "Relajado", id: "facial-relajado" },
                {
                  value: 1,
                  label: "Parcialmente tenso",
                  id: "facial-parcial",
                },
                { value: 2, label: "Totalmente tenso", id: "facial-total" },
                { value: 3, label: "Muecas", id: "facial-muecas" },
              ].map((opcion) => (
                <div key={opcion.id} className="flex items-center">
                  <input
                    type="radio"
                    id={opcion.id}
                    name="facial"
                    value={opcion.value}
                    checked={facial === opcion.value}
                    onChange={() => setFacial(opcion.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor={opcion.id}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {opcion.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Movimiento de Miembros Superiores */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Movimiento de Miembros Superiores
            </h3>
            <div className="space-y-2">
              {[
                { value: 0, label: "Sin movimiento", id: "movimiento-sin" },
                {
                  value: 1,
                  label: "Parcialmente flexionado",
                  id: "movimiento-parcial",
                },
                {
                  value: 2,
                  label: "Totalmente flexionado",
                  id: "movimiento-total",
                },
              ].map((opcion) => (
                <div key={opcion.id} className="flex items-center">
                  <input
                    type="radio"
                    id={opcion.id}
                    name="movimiento"
                    value={opcion.value}
                    checked={movimiento === opcion.value}
                    onChange={() => setMovimiento(opcion.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor={opcion.id}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {opcion.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          {/* Resultados */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              Resultados
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Score Total</p>
                <p className="text-2xl font-bold text-blue-800">{scoreTotal}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Interpretación</p>
                <p className={`text-lg font-semibold ${colorInterpretacion}`}>
                  {interpretacion}
                </p>
              </div>
            </div>

            {mostrarDolorGrave && (
              <div className="mt-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">
                    Dolor Grave
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={reiniciarEscala}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 gap-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Refresh className="w-4 h-4" />
              Reiniciar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Calcular Score
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EscalaOps;
