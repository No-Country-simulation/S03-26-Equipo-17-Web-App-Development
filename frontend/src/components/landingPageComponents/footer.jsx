export const FooterLandingPage = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 px-8 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">Nexus CRM</h2>
          <p className="text-sm text-gray-500">
            &copy; 2026 Nexus CRM. Architecting fluid workflows.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600">
          <a href="#" className="hover:text-[#3882F6] transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#3882F6] transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-[#3882F6] transition-colors">
            Security
          </a>
          <a href="#" className="hover:text-[#3882F6] transition-colors">
            Status
          </a>
        </nav>
      </div>
    </footer>
  );
};