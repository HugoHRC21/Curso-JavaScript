const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>/?";

/**
 * Genera contraseña con las opciones recibidas.
 * @param {number} length
 * @param {object} options {upper:bool, numbers:bool, symbols:bool}
 * @returns {string}
 */
export function generatePassword(length = 16, options = { upper:true, numbers:true, symbols:true }) {
  let pool = LOWER;
  if (options.upper) pool += UPPER;
  if (options.numbers) pool += NUMBERS;
  if (options.symbols) pool += SYMBOLS;

  if (!pool.length) return "";

  // Asegurar inclusión mínima: si se eligieron categorías, incluir al menos 1 de cada
  const requiredChars = [];
  if (options.upper) requiredChars.push(randomChar(UPPER));
  if (options.numbers) requiredChars.push(randomChar(NUMBERS));
  if (options.symbols) requiredChars.push(randomChar(SYMBOLS));
  // Always include at least one lowercase
  requiredChars.push(randomChar(LOWER));

  const remaining = Math.max(0, length - requiredChars.length);
  let result = requiredChars.join("");

  for (let i = 0; i < remaining; i++) {
    result += randomChar(pool);
  }

  // Mezclar para no dejar los requeridos siempre al principio
  return shuffleString(result).slice(0, length);
}

function randomChar(str) {
  return str.charAt(Math.floor(Math.random() * str.length));
}

function shuffleString(s) {
  const arr = s.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

/**
 * Calcula una estimación simple de fuerza.
 * Retorna {score:0..100, label: "Débil"/"Media"/"Fuerte"}
 */
export function evaluateStrength(password) {
  if (!password) return { score: 0, label: "—" };

  let score = 0;
  const len = password.length;

  // longitud
  score += Math.min(40, len * 2); // hasta 40 puntos por longitud

  // presencia de tipos
  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^A-Za-z0-9]/.test(password)) score += 20;

  // penalizar repeticiones muy largas
  if (/(.)\1\1/.test(password)) score -= 10;

  score = Math.max(0, Math.min(100, Math.round(score)));

  let label = "Débil";
  if (score >= 75) label = "Fuerte";
  else if (score >= 45) label = "Media";

  return { score, label };
}
