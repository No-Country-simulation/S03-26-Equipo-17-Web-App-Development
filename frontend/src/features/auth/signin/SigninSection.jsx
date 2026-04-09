import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { validateEmail } from "../../../utils/validations/validationEmail";
import { validatePassword } from "../../../utils/validations/validationPassword";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [showPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(60);
  const [setLoading] = useState(false);
  const [setServerError] = useState("");
  const navigate = useNavigate();
  

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // reglas password login
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // nueva contraseña modal
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRules, setNewPasswordRules] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // contador
  useEffect(() => {
    if (timer > 0 && openModal) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, openModal]);

  const handleResend = () => {
    setTimer(60);
  };

  // LOGIN
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    if (name === "email") {
      const error = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: error }));
    }

    if (name === "password") {
      const rules = validatePassword(value);
      setPasswordRules(rules);

      const hasError = Object.values(rules).some((r) => !r);

      setErrors((prev) => ({
        ...prev,
        password: hasError ? "Contraseña inválida" : "",
      }));
    }
  };

  // NUEVA PASSWORD (MODAL)
  const handleNewPasswordChange = (e) => {
    const value = e.target.value;

    setNewPassword(value);

    const rules = validatePassword(value);
    setNewPasswordRules(rules);
  };

  const isValid =
    values.email && values.password && !errors.email && !errors.password;

  const isNewPasswordValid = Object.values(newPasswordRules).every(
    (rule) => rule,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        },
      );

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken); // También te lo devuelve
        localStorage.setItem("isLoggedIn", "true");

        console.log("Token recibido:", data.accessToken);
        navigate("./../../../protected-routes/dashboard/dashboard.jsx")
      } else {
        throw new Error(data.message || "Credenciales incorrectas");
      }

      // Swagger dice que "devuelve los tokens de acceso"
      localStorage.setItem("accessToken", data.accessToken); // Revisa en Swagger el nombre exacto del campo del token
      localStorage.setItem("isLoggedIn", "true");

      window.location.href = "/dashboard"; // O usa navigate de react-router-dom
    } catch (err) {
      //setServerError(err.message);
    } finally {
      //setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Nexus <span className="text-blue-600">CRM</span>
          </h1>
          <p className="text-gray-500 text-sm">
            Diseña flujos de trabajo inteligentes.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-xl text-center font-semibold text-gray-900 mb-2">
            Bienvenido de nuevo
          </h2>
          <p className="text-gray-500 text-sm mb-6 text-center">
            Por favor, ingresa tus datos para iniciar sesión.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                name="email"
                value={values.email}
                onChange={handleChange}
                type="email"
                placeholder="nombre@gmail.com"
                className={`w-full px-4 py-2 rounded-lg border bg-gray-100 focus:outline-none focus:ring-2 
                ${errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm text-gray-600">Contraseña</label>
                <button
                  type="button"
                  onClick={() => setOpenModal(true)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <input
                name="password"
                value={values.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-4 py-2 rounded-lg border bg-gray-100 focus:outline-none focus:ring-2 
                ${errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
              />

              {/* checklist */}
              {values.password && (
                <div className="text-sm mt-2 space-y-1">
                  <p
                    className={
                      passwordRules.length ? "text-green-600" : "text-red-500"
                    }
                  >
                    • Mínimo 8 caracteres
                  </p>
                  <p
                    className={
                      passwordRules.uppercase
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    • Una letra mayúscula
                  </p>
                  <p
                    className={
                      passwordRules.lowercase
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    • Una letra minúscula
                  </p>
                  <p
                    className={
                      passwordRules.number ? "text-green-600" : "text-red-500"
                    }
                  >
                    • Un número
                  </p>
                  <p
                    className={
                      passwordRules.special ? "text-green-600" : "text-red-500"
                    }
                  >
                    • Un carácter especial
                  </p>
                </div>
              )}
            </div>

            {/* Button */}
            <button
              disabled={!isValid}
              className={`w-full py-2 rounded-lg font-medium transition
              ${
                isValid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Iniciar sesión
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No tienes una cuenta?{" "}
          <Link to="/register">
            <span className="text-blue-600 hover:underline cursor-pointer">
              Crear una cuenta
            </span>
          </Link>
        </p>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg relative">
            <button
              onClick={() => {
                setOpenModal(false);
                setStep(1);
              }}
              className="absolute top-3 right-4 text-gray-500"
            >
              ✕
            </button>

            {step === 1 && (
              <>
                <h2 className="text-lg font-semibold mb-2">
                  Recuperar contraseña
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Ingresa el código enviado a tu correo.
                </p>

                <input className="w-full px-4 py-2 mb-4 rounded-lg border bg-gray-100" />

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg mb-3"
                >
                  Verificar código
                </button>

                <div className="text-center text-sm text-gray-500">
                  {timer > 0 ? (
                    <p>Reenviar en {timer}s</p>
                  ) : (
                    <button onClick={handleResend} className="text-blue-600">
                      Reenviar código
                    </button>
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-lg font-semibold mb-4">Nueva contraseña</h2>

                <input
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  type="password"
                  className="w-full px-4 py-2 rounded-lg border bg-gray-100"
                />

                {/* checklist modal */}
                {newPassword && (
                  <div className="text-sm mt-2 space-y-1">
                    <p
                      className={
                        newPasswordRules.length
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      • Mínimo 8 caracteres
                    </p>
                    <p
                      className={
                        newPasswordRules.uppercase
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      • Una mayúscula
                    </p>
                    <p
                      className={
                        newPasswordRules.lowercase
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      • Una minúscula
                    </p>
                    <p
                      className={
                        newPasswordRules.number
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      • Un número
                    </p>
                    <p
                      className={
                        newPasswordRules.special
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      • Un símbolo
                    </p>
                  </div>
                )}

                <Link to="/signin">
                  <button
                    disabled={!isNewPasswordValid}
                    className={`w-full mt-4 py-2 rounded-lg
                    ${
                      isNewPasswordValid
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Hecho
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
