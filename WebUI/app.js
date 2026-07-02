const apiBase = "http://127.0.0.1:8000";
let chatHistory = [];

async function loadProfiles() {
  try {
    const res = await fetch(apiBase + "/profiles");
    const data = await res.json();
    const select = document.getElementById("model");

    // Limpia opciones previas
    select.innerHTML = "";

    if (data.profiles && data.profiles.length > 0) {
      data.profiles.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p;
        opt.textContent = p;
        select.appendChild(opt);
      });
    } else {
      const opt = document.createElement("option");
      opt.textContent = "No hay modelos";
      select.appendChild(opt);
    }
  } catch (err) {
    console.error("Error cargando perfiles:", err);
    const select = document.getElementById("model");
    select.innerHTML = "<option>Error al cargar perfiles</option>";
  }
}

async function sendMessage(){
  const message = document.getElementById("message").value;
  const model = document.getElementById("model").value;
  if (!message) return;
  chatHistory.push({ user: message, bot: "💭 Calculando..." });
  renderChat();
  try {
    const res = await fetch(apiBase + "/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, model })
    });
    const data = await res.json();
    chatHistory.push({ user: message, bot: data.response });
    renderChat();
    document.getElementById("message").value = "";
  } catch (err) {
    console.error("[!] Error enviando mensaje:", err);
  }
}

async function saveConversation() {
  if (chatHistory.length === 0) return;
  const last = chatHistory[chatHistory.length - 1];
  const model = document.getElementById("model").value;

  try {
    await fetch(apiBase + "/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, user: last.user, bot: last.bot })
    });
    alert("[Ok] Conversación guardada en logs/" + model + ".json");
  } catch (err) {
    console.error("[!] Error guardando conversación:", err);
  }
}

function renderChat() {
  const chatDiv = document.getElementById("chat");
  chatDiv.innerHTML = "";
  chatHistory.forEach(c => {
    chatDiv.innerHTML += `
      <div id="chat-container">
        <div class="message user"><b>Tú:</b> ${c.user}</div>
        <div class="message bot"><b>Bot:</b> ${c.bot}</div>
      </div>`;
  });
  chatDiv.scrollTop = chatDiv.scrollHeight; // scroll automático
}

// Espera a que el DOM esté listo antes de enganchar eventos y cargar perfiles
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sendBtn").addEventListener("click", sendMessage);
  document.getElementById("saveBtn").addEventListener("click", saveConversation);
  loadProfiles();
});
