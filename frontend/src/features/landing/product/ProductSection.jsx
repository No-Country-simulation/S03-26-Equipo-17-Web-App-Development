import { Link } from "react-router-dom";
export const Product = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-16">
      {/* HERO */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
        {/* Left */}
        <div>
          <p className="text-sm text-blue-600 font-semibold mb-2">
            VISIÓN GENERAL DEL PRODUCTO
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Diseña tu workflow
          </h1>
          <p className="text-gray-600 mb-6">
            Deja de luchar con tu software. Nexus CRM ofrece una estructura
            intuitiva que permite a tu equipo enfocarse en las relaciones, no en
            tareas repetitivas.
          </p>

          <div className="flex gap-4">
            <Link to="/register">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                Comenzar
              </button>
            </Link>
            <Link to="/about">
              <button className="border border-gray-300 px-5 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
                Saber más
              </button>
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
            alt="dashboard"
            className="rounded-xl shadow-xl"
          />

          {/* Floating Card */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg w-56">
            <p className="text-sm font-semibold mb-1">
              Diseñado para dar claridad
            </p>
            <p className="text-xs text-gray-500 mb-2">
              Una interfaz limpia con navegación intuitiva.
            </p>
            <p className="text-blue-600 font-bold text-lg">99%</p>
            <p className="text-xs text-gray-500">
              Disponibilidad que garantiza la fiabilidad de nuestra plataforma.
            </p>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="mb-20">
        <p className="text-sm text-blue-600 font-semibold mb-2">
          FUNCIONALIDADES PRINCIPALES
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Las herramientas para construir el éxito.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Bandeja de entrada centralizada",
              desc: "Unifica todas las conversaciones en correo, chat y aplicaciones de mensajería.",
            },
            {
              title: "Automatización inteligente",
              desc: "Elimina tareas rutinarias con flujos de trabajo basados en reglas.",
            },
            {
              title: "Analyticas en tiempo real",
              desc: "Rastrea el rendimiento y obtén información accionable al instante.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
        {/* Left */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Domina tus datos sin fricciones.
          </h2>
          <p className="text-gray-600 mb-6">
            Obtén información en tiempo real y optimiza tus flujos de trabajo
            con herramientas diseñadas para la claridad y la eficiencia.
          </p>

          <ul className="space-y-3">
            <li className="bg-white p-4 rounded-lg border shadow-sm">
              🔹 Arquitectura en capas
            </li>
            <li className="bg-white p-4 rounded-lg border shadow-sm">
              🔹 Búsqueda universal
            </li>
          </ul>
        </div>

        {/* Right */}
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
          alt="Panel de análisis de datos"
          className="rounded-xl shadow-xl"
        />
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Listo para optimizar tu flujo de trabajo?
        </h2>
        <p className="text-gray-600 mb-6">
          Únete a miles de equipos que ya utilizan Nexus CRM.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/register">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Comienza hoy gratis
            </button>
          </Link>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Mira una demo
          </a>
        </div>
      </div>
    </section>
  );
};
