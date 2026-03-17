// app.js
import { generatePassword, evaluateStrength } from "./generator.js";

const passwordOutput = document.getElementById("passwordOutput");
const copyBtn = document.getElementById("copyBtn");
const lengthInput = document.getElementById("lengthInput");
const lengthValue = document.getElementById("lengthValue");
const upperCheck = document.getElementById("upperCheck");
const numbersCheck = document.getElementById("numbersCheck");
const symbolsCheck = document.getElementById("symbolsCheck");
const generateBtn = document.getElementById("generateBtn");
const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");
const historyList = document.getElementById("historyList");
const saveBtn = document.getElementById("saveBtn");
const clearHistBtn = document.getElementById("clearHistBtn");

const STORAGE_KEY = "pw_history_v1";
let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

// actualizar UI inicial
lengthValue.textContent = lengthInput.value;
renderHistory();

// eventos
lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});

generateBtn.addEventListener("click", () => {
  const pw = generatePassword(parseInt(lengthInput.value, 10), {
    upper: upperCheck.checked,
    numbers: numbersCheck.checked,
    symbols: symbolsCheck.checked
  });
  passwordOutput.value = pw;
  updateStrength(pw);
});

copyBtn.addEventListener("click", async () => {
  const val = passwordOutput.value;
  if (!val) return;
  try {
    await navigator.clipboard.writeText(val);
    copyBtn.textContent = "✅";
    setTimeout(()=> copyBtn.textContent = "📋", 900);
  } catch (e) {
    alert("Error al copiar (tu navegador quizá no permite clipboard).");
  }
});

saveBtn.addEventListener("click", () => {
  const pw = passwordOutput.value;
  if (!pw) return;
  history.unshift({ pw, created: Date.now() });
  if (history.length > 20) history = history.slice(0,20);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  renderHistory();
});

clearHistBtn.addEventListener("click", () => {
  if (!confirm("¿Borrar historial?")) return;
  history = [];
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
});

function updateStrength(pw) {
  const evalRes = evaluateStrength(pw);
  strengthText.textContent = `${evalRes.label} (${evalRes.score})`;
  strengthBar.style.setProperty("--w", `${evalRes.score}%`);
  // Actualizar la barra visual
  strengthBar.style.setProperty("background", getGradient(evalRes.score));
  strengthBar.style.width = `${evalRes.score}%`;
}

function getGradient(score) {
  if (score < 45) return "linear-gradient(90deg,#f97316,#f43f5e)"; // naranja-rojo
  if (score < 75) return "linear-gradient(90deg,#facc15,#10b981)"; // amarillo-verde
  return "linear-gradient(90deg,#34d399,#059669)"; // verde
}

function renderHistory() {
  historyList.innerHTML = "";
  if (!history.length) {
    historyList.innerHTML = "<li style='color:var(--muted)'>Sin elementos</li>";
    return;
  }
  history.forEach((item, idx) => {
    const li = document.createElement("li");
    const date = new Date(item.created);
    const time = date.toLocaleString();
    li.innerHTML = `<span>${item.pw}</span>
      <div style="display:flex; gap:6px;">
        <button class="small-btn" data-idx="${idx}" data-action="copy">Copiar</button>
        <button class="small-btn" data-idx="${idx}" data-action="delete">Borrar</button>
      </div>`;
    historyList.appendChild(li);
  });

  // delegación de eventos en la lista (más eficiente)
  historyList.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(btn.dataset.idx, 10);
      const action = btn.dataset.action;
      if (action === "copy") {
        navigator.clipboard.writeText(history[idx].pw).then(()=> {
          btn.textContent = "✔️";
          setTimeout(()=> btn.textContent = "Copiar", 700);
        });
      } else if (action === "delete") {
        history.splice(idx,1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        renderHistory();
      }
    });
  });
}

// generar una contraseña al cargar
generateBtn.click();
