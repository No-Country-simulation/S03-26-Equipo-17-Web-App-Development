export const FooterLandingPage = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 px-8 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left */}
        <h2 className="text-lg font-semibold text-gray-900">
          Nexus CRM
        </h2>

        {/* Right */}
        <p className="text-sm text-gray-500">
          © 2026 Nexus CRM. Todos los derechos reservados.
        </p>

      </div>
    </footer>
  );
};