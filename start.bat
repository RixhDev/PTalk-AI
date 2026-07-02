@echo off
REM ============================================
REM  Script de arranque de PTalk AI en Windows 10/11
REM  	Permite levantar la API REST(FastAPI) y la WebUI (http.server)
REM ============================================

set BASE_DIR=%~dp0

REM Activar entorno virtual si existe
if exist "%BASE_DIR%venv\Scripts\activate.bat" (
	call "%BASE_DIR%venv\Scripts\activate.bat"
)
	
	REM 1. Esto levanta la API en una ventana separada
	start "PTalk API" cmd /k "cd /d %BASE_DIR% && python main.py"
	
	REM 2. Igualmente con WebUI, corre en otra ventana separada para mantener orden
	start "PTalk WebUI" cmd /k "cd /d %BASE_DIR%WebUI && python -m http.server 5501"
	
	echo [OK] Todo listo. Abre http://127.0.0.1:5501/index.html en tu navegador.
	pause
	
