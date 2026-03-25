import { NavMenu } from "./../../components/landingPageComponents/navMenu";
import { FooterLandingPage } from "./../../components/landingPageComponents/footer";

export const LandingPage = () => {
  return (
    <>
    {/* ----------------- Seccion Nav Menu ------------------ */}
    <NavMenu />
    {/* ----------------- Fin Seccion Nav Menu ------------------ */}

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