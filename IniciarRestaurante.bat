@echo off
chcp 65001 >nul
title Restaurante - Iniciar Servidores
echo ============================================
echo   RESTAURANTE - INICIO DE SERVIDORES
echo ============================================
echo.

curl -s -o nul http://localhost:8080 2>nul && (set BACKEND_UP=1) || (set BACKEND_UP=0)
curl -s -o nul http://localhost:5173 2>nul && (set FRONTEND_UP=1) || (set FRONTEND_UP=0)

if "%BACKEND_UP%"=="1" (
    echo  [OK]  Backend ya esta corriendo en :8080
) else (
    echo  [..]  Iniciando Backend en :8080 ...
    start "Backend :8080" cmd /k ""cd /d "%~dp0bakendProyecto" && mvnw.cmd spring-boot:run""
)

if "%FRONTEND_UP%"=="1" (       
    echo  [OK]  Frontend ya esta corriendo en :5173
) else (
    echo  [..]  Iniciando Frontend en :5173 ...
    start "Frontend :5173" cmd /k ""cd /d "%~dp0frontend" && npm run dev""
)

echo.
echo  Abriendo el navegador en http://localhost:5173 ...
timeout /t 3 /nobreak >nul
start http://localhost:5173

echo.
echo  Listo. Si el telefono necesita entrar, usa la IP local del PC.
echo  Cierra esta ventana cuando quieras.
pause
