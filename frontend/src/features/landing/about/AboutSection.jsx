import { Link } from "react-router-dom";
export const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <article className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight mb-6">
              Nexus <span className="text-blue-600">CRM</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Conectando el futuro de las ventas. Somos el nexo inteligente que
              centraliza, automatiza y humaniza la gestión de tus clientes en
              tiempo real.
            </p>
          </div>

          {/* Misión de Nexus */}
          <article className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Nuestra Misión
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                En Nexus CRM, nacimos con una visión clara: eliminar las
                barreras de comunicación entre las startups y sus clientes.
                Entendemos que en el ecosistema emprendedor, cada segundo
                cuenta.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Hemos creado un ecosistema que permite a los equipos enfocarse
                en lo que realmente importa:
                <strong>construir relaciones sólidas y cerrar tratos</strong>,
                mientras nuestra tecnología se encarga del seguimiento.
              </p>
            </div>

            {/* Logo de Nexus CRM */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center h-64 md:h-auto">
              <img
                src="./../../../../public/Nexus CRM logo.png"
                alt="Logotipo oficial de Nexus CRM, mostrando la marca y el símbolo de conexión"
                className="max-w-xs md:max-w-sm h-auto object-contain"
              />
            </div>
          </article>

          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
              ¿Por qué elegir Nexus?
            </h2>
            {/* Las cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Inteligencia Real
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Detectamos automáticamente leads fríos para que tu equipo
                  nunca pierda una oportunidad de cierre.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Omnicanalidad
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  WhatsApp y Email integrados en una sola línea de tiempo
                  asincrónica y colaborativa.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Escalabilidad
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Diseñado para startups que crecen rápido y necesitan procesos
                  simples pero robustos.
                </p>
              </div>
            </div>
          </div>

          {/* Historia */}
          <div className="bg-slate-900 rounded-3xl p-10 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Nexus CRM surge de la necesidad de simplificar procesos complejos.
              Como desarrolladores y apasionados por la tecnología, vimos cómo
              las startups perdían valiosos contactos por la dispersión de
              herramientas. Decidimos construir la solución: un "nexo" robusto,
              seguro y escalable que crece al ritmo de tu negocio.
            </p>
          </div>
        </article>
      </section>

      {/* Equipo de trabajo */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className=" md:flex-row md:items-center md:justify-between mb-12 pb-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Equipo de trabajo
              </h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Conozca al equipo de 6 ingenieros trabajando entre bastidores de
                Nexus CRM para construir el futuro de las ventas de las
                startups.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Luis Feliz */}
            <a
              href="https://www.linkedin.com/in/luis-antonio-feliz/"
              className="block no-underline text-inherit group"
              target="blank"
            >
              <article className="flex flex-col items-center text-center group">
                <div className="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src="./../../../../public/Equipo/Foto de Luis Feliz.JPG"
                    alt="Foto de Luis Feliz"
                    className="w-full h-full object-cover group-hover:scale-105 hover:no-underline transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  Luis Feliz
                </h3>
                <p className="text-sm text-blue-600 font-medium">
                  Frontend Developer
                </p>
              </article>
            </a>

            {/* Mateo Martinez */}
            <a
              href="https://www.linkedin.com/in/mateo-mart%C3%ADnez-92205b336/"
              className="block no-underline text-inherit hover:no-underline group"
              target="blank"
            >
              <article className="flex flex-col items-center text-center group">
                <div className="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src="./../../../../public/Equipo/Foto de Mateo Martinez.jpeg"
                    alt="Foto de Mateo Martínez"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  Mateo Martínez
                </h3>
                <p className="text-sm text-blue-600 font-medium">
                  Frontend Developer
                </p>
              </article>
            </a>

            {/* Isabel Prudencio */}
            <a
              href="https://www.linkedin.com/in/isabel-prudencio-nina-18615181/"
              className="block no-underline text-inherit hover:no-underline group"
              target="blank"
            >
              <article className="flex flex-col items-center text-center group">
                <div className="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src="./../../../../public/Equipo/Foto de Isabel Prudencio.jpeg"
                    alt="Foto de Isabel Prudencio"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  Isabel Prudencio
                </h3>
                <p className="text-sm text-blue-600 font-medium">
                  Backend Developer
                </p>
              </article>
            </a>

            {/* Mario Perez */}
            <a
              href="https://www.linkedin.com/in/mario-hamming/"
              className="block no-underline text-inherit hover:no-underline group"
              target="blank"
            >
              <article className="flex flex-col items-center text-center group">
                <div className="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src="./../../../../public/Equipo/Foto de Mario Perez.jpeg"
                    alt="Foto de Mario Perez"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  Mario Perez
                </h3>
                <p className="text-sm text-blue-600 font-medium">
                  Backend Developer
                </p>
              </article>
            </a>

            {/* Anthony Parra */}
            <a
              href="https://www.linkedin.com/in/anthony-se/"
              className="block no-underline text-inherit hover:no-underline group"
              target="blank"
            >
              <article className="flex flex-col items-center text-center group">
                <div className="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src="./../../../../public/Equipo/Foto de Anthony Parra.jpeg"
                    alt="Foto de Anthony Parra"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  Anthony Parra
                </h3>
                <p className="text-sm text-blue-600 font-medium">
                  Backend Developer
                </p>
              </article>
            </a>

            {/* Michael Ziliani */}
            <a
              href="https://www.linkedin.com/in/michael-ziliani/"
              className="block no-underline text-inherit hover:no-underline group"
              target="blank"
            >
              <article className="flex flex-col items-center text-center group">
                <div className="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                  <img
                    src="./../../../../public/Equipo/Foto de Michael Ziliani.png"
                    alt="Foto de Michael Ziliani"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  Michael Ziliani
                </h3>
                <p className="text-sm text-blue-600 font-medium">
                  Backend Developer
                </p>
              </article>
            </a>
          </div>
        </div>
      </section>

      {/* Listo para empezar */}
      <section className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-white p-12 rounded-3xl shadow-lg border border-slate-100">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            ¿Estás listo para construir tu futuro?
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Unase a miles de startups que están usando Nexus CRM para que sus
            operaciones escalen con estilo y eficiencia.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <span className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors duration-200">
                Empezar ahora
              </span>
            </Link>
            <Link
              to="/signin"
              href="#"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-slate-200 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-50 shadow-sm transition-colors duration-200"
            >
              Hablar con ventas
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
