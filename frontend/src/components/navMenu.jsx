function NavMenu() {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT SIDE (Logo + Links juntos) */}
        <div className="flex items-center gap-10">
          <span className="text-xl font-semibold text-gray-900">
            Nexus CRM
          </span>

          <ul className="hidden md:flex items-center gap-6 text-[#64748B] font-medium">
            <li>
              <a
                href="#"
                className="hover:text-[#3882F6] transition"
              >
                Product
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#3882F6] transition"
              >
                About
              </a>
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE (Actions) */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-[#64748B] hover:text-[#3882F6] transition"
          >
            Sign In
          </a>

          <button className="bg-[#3882F6] text-white px-5 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>

      </div>
    </nav>
  );
}

export default NavMenu;