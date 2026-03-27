import { Link } from "react-router-dom";
export const About = () => {
  return (
    <>
      <section class="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-20">
            <h1 class="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight mb-6">
              Nexus <span class="text-blue-600">CRM</span>
            </h1>
            <p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Conectando el futuro de las ventas. Somos el nexo inteligente que
              centraliza, automatiza y humaniza la gestión de tus clientes en
              tiempo real.
            </p>
          </div>

          <article class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 class="text-3xl font-bold text-slate-800 mb-4">
                Nuestra Misión
              </h2>
              <p class="text-slate-600 leading-relaxed mb-4">
                En Nexus CRM, nacimos con una visión clara: eliminar las
                barreras de comunicación entre las startups y sus clientes.
                Entendemos que en el ecosistema emprendedor, cada segundo
                cuenta.
              </p>
              <p class="text-slate-600 leading-relaxed">
                Hemos creado un ecosistema que permite a los equipos enfocarse
                en lo que realmente importa:
                <strong>construir relaciones sólidas y cerrar tratos</strong>,
                mientras nuestra tecnología se encarga del seguimiento.
              </p>
            </div>
            <div class="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center h-64 md:h-auto">
              <img
                src="./../../../../public/Nexus CRM logo.png"
                alt="Logotipo oficial de Nexus CRM, mostrando la marca y el símbolo de conexión"
                class="max-w-xs md:max-w-sm h-auto object-contain"
              />
            </div>
          </article>

          <div class="mb-24">
            <h2 class="text-3xl font-bold text-center text-slate-800 mb-12">
              ¿Por qué elegir Nexus?
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-slate-800 mb-3">
                  Inteligencia Real
                </h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Detectamos automáticamente leads fríos para que tu equipo
                  nunca pierda una oportunidad de cierre.
                </p>
              </div>

              <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-slate-800 mb-3">
                  Omnicanalidad
                </h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                  WhatsApp y Email integrados en una sola línea de tiempo
                  asincrónica y colaborativa.
                </p>
              </div>

              <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-slate-800 mb-3">
                  Escalabilidad
                </h3>
                <p class="text-slate-600 text-sm leading-relaxed">
                  Diseñado para startups que crecen rápido y necesitan procesos
                  simples pero robustos.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-slate-900 rounded-3xl p-10 text-white text-center">
            <h2 class="text-2xl font-bold mb-4">Nuestra Historia</h2>
            <p class="text-slate-400 max-w-2xl mx-auto">
              Nexus CRM surge de la necesidad de simplificar procesos complejos.
              Como desarrolladores y apasionados por la tecnología, vimos cómo
              las startups perdían valiosos contactos por la dispersión de
              herramientas. Decidimos construir la solución: un "nexo" robusto,
              seguro y escalable que crece al ritmo de tu negocio.
            </p>
          </div>
        </div>
      </section>

      <section class="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class=" md:flex-row md:items-center md:justify-between mb-12 pb-8">
            <div class="text-center">
              <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Equipo de trabajo
              </h2>
              <p class="mt-4 text-lg text-slate-600 leading-relaxed">
                Conozca al equipo de 6 ingenieros trabajando entre bastidores de
                Nexus CRM para construir el futuro de las ventas de las
                startups.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <article class="flex flex-col items-center text-center group">
              <div class="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                <img
                  src="url_imagen_1.jpg"
                  alt="Foto de Luis Feliz"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <a
                href="link de linkedin"
                class="block no-underline text-inherit hover:no-underline group"
                target="blank"
              >
                <h3 class="mt-6 text-xl font-semibold text-slate-900">
                  Luis Feliz
                </h3>
                <p class="text-sm text-blue-600 font-medium">
                  Frontend Developer
                </p>
              </a>
            </article>

            <article class="flex flex-col items-center text-center group">
              <div class="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                <img
                  src="url_imagen_2.jpg"
                  alt="Foto de Mateo Martínez"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <a
                href="link de linkedin"
                class="block no-underline text-inherit hover:no-underline group"
                target="blank"
              >
                <h3 class="mt-6 text-xl font-semibold text-slate-900">
                  Mateo Martínez
                </h3>
                <p class="text-sm text-blue-600 font-medium">
                  Frontend Developer
                </p>
              </a>
            </article>

            <article class="flex flex-col items-center text-center group">
              <div class="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                <img
                  src="url_imagen_3.jpg"
                  alt="Foto de Isabel Prudencio"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <a
                href="link de linkedin"
                class="block no-underline text-inherit hover:no-underline group"
                target="blank"
              >
                <h3 class="mt-6 text-xl font-semibold text-slate-900">
                  Isabel Prudencio
                </h3>
                <p class="text-sm text-blue-600 font-medium">
                  Backend Developer
                </p>
              </a>
            </article>

            <article class="flex flex-col items-center text-center group">
              <div class="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                <img
                  src="url_imagen_4.jpg"
                  alt="Foto de Mario Perez"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <a
                href="link de linkedin"
                class="block no-underline text-inherit hover:no-underline group"
                target="blank"
              >
                <h3 class="mt-6 text-xl font-semibold text-slate-900">
                  Mario Perez
                </h3>
                <p class="text-sm text-blue-600 font-medium">
                  Backend Developer
                </p>
              </a>
            </article>

            <article class="flex flex-col items-center text-center group">
              <div class="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                <img
                  src="url_imagen_5.jpg"
                  alt="Foto de Anthony Parra"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <a
                href="link de linkedin"
                class="block no-underline text-inherit hover:no-underline group"
                target="blank"
              >
                <h3 class="mt-6 text-xl font-semibold text-slate-900">
                  Anthony Parra
                </h3>
                <p class="text-sm text-blue-600 font-medium">
                  Backend Developer
                </p>
              </a>
            </article>

            <article class="flex flex-col items-center text-center group">
              <div class="w-full aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                <img
                  src="url_imagen_6.jpg"
                  alt="Foto de Michael Ziliani"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <a
                href="link de linkedin"
                class="block no-underline text-inherit hover:no-underline group"
                target="blank"
              >
                <h3 class="mt-6 text-xl font-semibold text-slate-900">
                  Michael Ziliani
                </h3>
                <p class="text-sm text-blue-600 font-medium">
                  Backend Developer
                </p>
              </a>
            </article>
          </div>
        </div>
      </section>

      <section class="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center bg-white p-12 rounded-3xl shadow-lg border border-slate-100">
          <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            ¿Estás listo para construir tu futuro?
          </h2>

          <p class="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Unase a miles de startups que están usando Nexus CRM para que sus
            operaciones escalen con estilo y eficiencia.
          </p>

          <div class="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <a
                href="#"
                class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors duration-200"
              >
                Empezar ahora
              </a>
            </Link>
            <a
              href="#"
              class="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-slate-200 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-50 shadow-sm transition-colors duration-200"
            >
              Hablar con ventas
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
