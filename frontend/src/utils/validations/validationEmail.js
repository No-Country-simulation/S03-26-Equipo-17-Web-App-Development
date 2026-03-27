export const validateEmail = (email) => {
  if (!email) return "El email es obligatorio";

  // solo gmail + formato correcto + sin doble punto
  const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!regex.test(email)) {
    return "Debe ser un correo Gmail válido";
  }

  // evitar cosas como ".."
  if (email.includes("..")) {
    return "El correo no puede tener puntos consecutivos";
  }

  return "";
};