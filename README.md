# PTalk AI
PTalk AI es una interfaz web sencilla para interactuar con modelos locales de Ollama, usando **qwen2.5**.  
El objetivo es ofrecer un chat estilo WebUI con historial, guardado en JSON y perfiles seleccionables.

---

## 🚀 Requisitos
- **Python 3.10+**.
- **FastAPI** y dependencias (`pip install fastapi uvicorn`).
- **Ollama** instalado y corriendo en tu sistema.
- Navegador web moderno (Chrome, Firefox, Edge).

---
## Estructura
PTalk AI/
├── main.py          # API con FastAPI
├── logs/            # Carpeta donde se guardan las conversaciones
│   └── tars-bot.json
├── WebUI/           # Interfaz web
│   ├── index.html
│   ├── style.css
│   └── app.js
└── start.sh         # Script de arranque rápido

## ⚙️ How to use (GNU/Linux)

 **1. Clonar el repositorio**
   ```bash
   git clone https://github.com/tuusuario/PTalk-AI.git
   cd PTalk-AI
  ```
**2. Crear y activar un entorno virtual (recomendado)**
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```
**3. Instalar dependencias (necesario)**
  ```bash
  pip install fastapi uvicorn
  ```
o desde otra terminal:
  ```bash
  sudo apt install python3-fastapi && sudo apt install python3-uvicorn
  ```
**4. Arrancar todo con el script dedicado**
  ```bash
  ./start.sh
  ```
### Entonces...
La API REST se levanta en:
http://127.0.0.1:8000

La WebUI se levanta en(Entorno principal de uso):
http://127.0.0.1:5501/index.html

## ⚙️ How to use (Windows)
**1. Clonar el repositorio**
  ```powershell
  git clone https://github.com/RixhDev/PTalk-AI.git
  cd PTalk-AI
  ```
  Crear y activar un entorno virtual (recomendado)
  ```powershell
  python -m venv venv
  venv\Scripts\activate
  ```
**2.Instalar dependencias**

  ```powershell
  pip install fastapi uvicorn
  ```
Arrancar todo con el script dedicado

  ```powershell
  start.bat
  ```
La API se levanta en: http://127.0.0.1:8000

La WebUI se levanta en: http://127.0.0.1:5501/index.html

# Funcionalidades
Selección de perfiles: el menú desplegable muestra los modelos disponibles (tars-bot, qwen2.5, etc.).

Chat estilo burbuja: mensajes diferenciados para usuario y bot.

Indicador de estado: aparece “💭 Calculando...” mientras el modelo procesa la respuesta [Desde luego no responde 'pensando' si el modelo no puede hacerlo ;) ].

Guardado de conversaciones: cada interacción se almacena en logs/<modelo>.json para poder reutilizarlo.

Scroll automático: el chat baja solo al último mensaje.
