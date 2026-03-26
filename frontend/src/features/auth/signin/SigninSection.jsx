import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Signin = () => {
  const [showPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(1); // 1 = código, 2 = nueva contraseña
  const [timer, setTimer] = useState(60);

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

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Nexus CRM</h1>
          <p className="text-gray-500 text-sm">Architecting fluid workflows.</p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Please enter your details to sign in.
          </p>

          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full px-4 py-2 rounded-lg border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm text-gray-600">Password</label>
                <button
                  type="button"
                  onClick={() => setOpenModal(true)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 pr-2 rounded-lg border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              Sign In
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="text-blue-600 hover:underline cursor-pointer">
              Create an account
            </span>
          </Link>
        </p>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg relative">
            {/* Close */}
            <button
              onClick={() => {
                setOpenModal(false);
                setStep(1);
              }}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h2 className="text-lg font-semibold mb-2">
                  Reset your password
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  We sent a code to your email.
                </p>

                <input
                  type="text"
                  placeholder="Enter code"
                  className="w-full px-4 py-2 mb-4 rounded-lg border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg mb-3"
                >
                  Verify Code
                </button>

                <div className="text-center text-sm text-gray-500">
                  {timer > 0 ? (
                    <p>Resend code in {timer}s</p>
                  ) : (
                    <button
                      onClick={handleResend}
                      className="text-blue-600 hover:underline"
                    >
                      Resend code
                    </button>
                  )}
                </div>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  Create new password
                </h2>

                <div className="relative mb-4">
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full px-4 py-2 pr-10 rounded-lg border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {/* icon ? */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 group">
                    <span className="text-gray-400 cursor-pointer">?</span>

                    {/* Tooltip */}
                    <div className="absolute right-0 mt-2 w-56 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
                      <p className="font-semibold mb-1">
                        Password must contain:
                      </p>
                      <ul className="space-y-1">
                        <li>• At least 8 characters</li>
                        <li>• One uppercase letter</li>
                        <li>• One lowercase letter</li>
                        <li>• One number</li>
                        <li>• One special character</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Link to="/signin">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Done
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
