import { Link } from "react-router-dom";

export const NavMenu = () => {

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <span className="text-xlmax-w-xs md:max-w-sm h-auto object-contain font-semibold text-gray-900">
            <Link to="/" className="hover:text-[#3882F6] transition">
              <img
                className="h-10 md:h-12 w-auto object-contain"
                src="/Nexus CRM logo.png"
                alt=""
              />
            </Link>
          </span>

          <ul className="hidden md:flex items-center gap-6 text-[#64748B] font-medium">
            <li>
              <Link to="/product" className="hover:text-[#3882F6] transition">
                Producto
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#3882F6] transition">
                Acerca de Nosotros
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/signin">
          <span
            href="#"
            className="text-[#64748B] hover:text-[#3882F6] transition"
          >
            Iniciar Sesión
          </span>
          </Link>
          
          <Link to="/register">
          <button className="bg-[#3882F6] text-white px-5 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition">
            Empezar
          </button>
          </Link>
          
        </div>
      </div>
    </nav>
  );
};
