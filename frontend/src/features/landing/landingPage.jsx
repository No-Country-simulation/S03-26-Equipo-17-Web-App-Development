import { NavMenu } from "./../../components/landingPageComponents/navMenu";
import { FooterLandingPage } from "./../../components/landingPageComponents/footer";

export const LandingPage = () => {
  return (
    <>
      {/* ----------------- Seccion Nav Menu ------------------ */}
      <NavMenu />
      {/* ----------------- Fin Seccion Nav Menu ------------------ */}

      {/* ----------------- Seccion Hero ------------------ */}
      <main class="bg-white min-h-screen flex items-center justify-center overflow-hidden">
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div class="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/60 text-slate-600 text-xs sm:text-sm font-medium mb-8">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              New: WhatsApp Direct Integration
            </div>

            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Architect your <span class="text-[#0057D9]">fluid</span>{" "}
              <span class="text-[#0057D9]">workflow</span>
            </h1>

            <p class="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
              The sophisticated CRM for startups. Manage leads with precision,
              engage in real-time chat, and unify your WhatsApp and Email into a
              single editorial workspace.
            </p>

            <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0057D9] text-white font-semibold rounded-xl shadow-blue-800/80 shadow-lg hover:bg-blue-800 transition-all duration-200">
                Get Started
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14M12 5l7 7-7 7"
                  ></path>
                </svg>
              </button>

              <button class="w-full sm:w-auto px-7 py-3.5 bg-slate-200 text-slate-900 font-semibold rounded-xl hover:bg-slate-300 transition-colors duration-200">
                Request Demo
              </button>
            </div>
          </div>

          <div class="relative w-full flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div class="absolute inset-0 bg-blue-50 blur-3xl rounded-full -z-10 opacity-70 transform translate-x-10 translate-y-10"></div>

            <img
              src="./../../../public/Imagen-modo-oscuro.png"
              alt="Interfaz oscura de Nexus CRM"
              class="w-full h-auto max-w-2xl rounded-2xl shadow-2xl shadow-slate-300/50 object-cover"
            />
          </div>
        </section>
      </main>

      {/* ----------------- Fin Seccion Hero ------------------ */}

      {/* ----------------- Seccion Post Hero ------------------ */}
      <section class="py-24 bg-slate">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-20">
            <h2 class="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Everything you need
            </h2>
            <p class="text-lg text-slate-500 font-medium">
              Core tools designed for high-performance sales teams.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article class="bg-white p-10 rounded-[2.5rem] transition-all hover:shadow-lg">
              <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-8">
                <svg
                  class="w-7 h-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 mb-4">
                Unified Inbox
              </h3>
              <p class="text-slate-500 leading-relaxed text-lg">
                Combine WhatsApp, Email, and DMs into one clean thread. Never
                switch tabs to find a conversation again.
              </p>
            </article>

            <article class="bg-white p-10 rounded-[2.5rem] transition-all hover:shadow-lg">
              <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-8">
                <svg
                  class="w-7 h-7 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 mb-4">
                Real-time Chat
              </h3>
              <p class="text-slate-500 leading-relaxed text-lg">
                Embed our lightweight chat widget on your site and convert
                visitors instantly with live support.
              </p>
            </article>

            <article class="bg-white p-10 rounded-[2.5rem] transition-all hover:shadow-lg">
              <div class="w-14 h-14 bg-slate-200 rounded-xl flex items-center justify-center mb-8">
                <svg
                  class="w-7 h-7 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 mb-4">
                Manage Leads
              </h3>
              <p class="text-slate-500 leading-relaxed text-lg">
                Simple, visual pipelines to track deals. Use AI scoring to focus
                on the leads most likely to close.
              </p>
            </article>
          </div>
        </div>
      </section>
      {/* ----------------- Fin Seccion Post Hero ------------------ */}

      {/* ----------------- Seccion pre-footer ------------------ */}
      <section className="w-full bg-white px-6 py-20">
        <div className="max-w-9xl mx-auto flex justify-center">
          <div className="bg-[#2D3135] text-white w-full max-w-[1000px] rounded-[24px] px-8 py-16 md:px-12 md:py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Start building today
            </h1>

            <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Join the 2,000+ startups scaling their sales with Nexus.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-[#0062D2] hover:bg-[#0052b3] text-white px-8 py-3.5 rounded-xl text-lg font-semibold transition-colors duration-200">
                Create Free Account
              </button>

              <button className="bg-[#4D5155] hover:bg-[#404347] text-white px-8 py-3.5 rounded-xl text-lg font-semibold transition-colors duration-200">
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* ----------------- Fin Seccion pre-footer------------------ */}

      {/* ----------------- Footer ------------------ */}
      <FooterLandingPage />
      {/* ----------------- Footer ------------------ */}
    </>
  );
};
