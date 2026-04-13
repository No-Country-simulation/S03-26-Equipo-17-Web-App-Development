import { useState } from "react";
import { validateEmail } from "../../../utils/validations/validationEmail";
import { validatePassword } from "../../../utils/validations/validationPassword";
import { Link } from "react-router-dom";

export const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 1. Validamos el email
    const emailError = validateEmail(formData.email);
    const isEmailValid = formData.email !== "" && emailError === "";

    // 2. Validamos la contraseña
    const passwordStatus = validatePassword(formData.password);
    const isPasswordValid = Object.values(passwordStatus).every(Boolean);

    // 3. Verificamos que no haya campos vacíos
    const allFieldsFilled = Object.values(formData).every(
        (val) => val.trim() !== "",
    );

    // 4. Creamos la variable que usará el botón
    const isButtonDisabled = !(
        allFieldsFilled &&
        isEmailValid &&
        isPasswordValid
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Filtramos solo los campos que pide tu DTO de Spring Boot
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (!response.ok)
                throw new Error(data.message || "Error en el registro");

            console.log("Usuario registrado con éxito:", data);
            alert("¡Cuenta creada con éxito! Ya puedes iniciar sesión.");

        } catch (err) {
            setServerError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Contenedor principal con centrado total */}
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans antialiased">
                {/* Card de Registro */}
                <main className="w-full max-w-lg bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-100">
                    {/* Cabecera */}
                    <header className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                            Cree su cuenta
                        </h1>
                        <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-sm mx-auto">
                            Empiece a gestionar sus relaciones con precisión editorial.
                        </p>
                    </header>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <InputField
                            label="Nombre"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                        />
                        <InputField
                            label="Apellido"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                        />
                        {/* <InputField
                            label="Nombre de Usuario"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="jdoe88"
                        /> */}

                        {/* Email con error visual (image_9.png) */}
                        <InputField
                            label="Correo Electrónico"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={formData.email !== "" && emailError}
                            placeholder="name@company.com"
                        />

                        {/* Password con puntos de validación (image_9.png) */}
                        <InputField
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={formData.password !== "" && !isPasswordValid}
                            placeholder="••••••••"
                        />

                        {/* Requerimientos de contraseña dinámicos */}
                        {formData.password !== "" && (
                            <ul className="space-y-1.5 pt-1 pl-1">
                                {[
                                    { key: "length", label: "Mínimo 8 caracteres" },
                                    { key: "uppercase", label: "Una letra mayúscula" },
                                    { key: "lowercase", label: "Una letra minúscula" },
                                    { key: "number", label: "Un número" },
                                    { key: "special", label: "Un carácter especial" },
                                ].map((req) => (
                                    <li
                                        key={req.key}
                                        className={`text-[13px] flex items-center transition-colors ${passwordStatus[req.key]
                                                ? "text-green-600"
                                                : "text-red-500"
                                            }`}
                                    >
                                        <span className="text-xl mr-2 leading-none">•</span>
                                        {req.label}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {serverError && (
                            <p className="text-red-500 text-xs mt-2 text-center">
                                {serverError}
                            </p>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full px-8 py-4 rounded-xl text-white shadow-md transition-all active:scale-[0.98] ${isButtonDisabled
                                        ? "bg-slate-300 cursor-not-allowed shadow-none"
                                        : "bg-[#0055D4] hover:bg-blue-800"
                                    }`}
                            >
                                Crear Cuenta
                            </button>
                        </div>
                    </form>

                    {/* Footer del Card */}
                    <footer className="mt-10 pt-8 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-600">
                            Already have an account?{" "}
                            <Link
                                to="/signin"
                                className="text-[#0055D4] hover:underline transition-all"
                            >
                                Sign In
                            </Link>
                        </p>
                    </footer>
                </main>
            </div>
        </>
    );
};;

const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
}) => (
    <div className="w-full">
        <label
            htmlFor={name}
            className="block text-sm font-bold text-slate-800 mb-2"
        >
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-5 py-4 rounded-xl outline-none transition-all border-2 ${error
                ? "bg-red-50 border-red-400 focus:ring-4 focus:ring-red-100"
                : "bg-[#E9EEF2] border-transparent focus:bg-white focus:border-[#0055D4] focus:ring-4 focus:ring-blue-100"
                }`}
        />
        {typeof error === "string" && error && (
            <p className="mt-2 text-[13px] text-red-500 tracking-tight">
                {error}
            </p>
        )}
    </div>
);