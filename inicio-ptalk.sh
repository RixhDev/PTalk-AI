#!/bin/bash

# Ruta base del proyecto
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

# 1. Levantar la API en segundo plano
cd "$BASE_DIR"
echo "[INFO] Iniciando API en http://127.0.0.1:8000 ..."
python3 main.py &

# 2. Levantar la WebUI en segundo plano
cd "$BASE_DIR/WebUI"
echo "[INFO] Iniciando WebUI en http://127.0.0.1:5501/index.html ..."
python3 -m http.server 5501 &

# 3. Mensaje final
echo "[OK] Todo listo. Abre http://127.0.0.1:5501/index.html en tu navegador."
