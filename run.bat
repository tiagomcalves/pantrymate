@echo off
echo =======================================
echo        PantryMate Launcher
echo =======================================
echo.

if not exist "backend\.venv\Scripts\python.exe" (
    echo [ERRO] Ambiente virtual nao encontrado.
    echo Corre primeiro: .\setup.ps1
    pause
    exit /b 1
)

echo [pip] A instalar dependencias Python...
backend\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt --quiet
echo [pip] Dependencias ok.
echo.

if not exist "backend\db.sqlite3" (
    echo [BD] Base de dados nao encontrada. A configurar...
    echo.

    echo [1/4] makemigrations...
    pushd backend
    .\.venv\Scripts\python.exe manage.py makemigrations
    if errorlevel 1 ( echo [ERRO] makemigrations falhou. & popd & pause & exit /b 1 )

    echo.
    echo [2/4] migrate...
    .\.venv\Scripts\python.exe manage.py migrate
    if errorlevel 1 ( echo [ERRO] migrate falhou. & popd & pause & exit /b 1 )

    echo.
    echo [3/4] sample_users...
    .\.venv\Scripts\python.exe manage.py sample_users
    if errorlevel 1 ( echo [ERRO] sample_users falhou. & popd & pause & exit /b 1 )

    echo.
    echo [4/4] sample_data...
    .\.venv\Scripts\python.exe manage.py sample_data
    if errorlevel 1 ( echo [ERRO] sample_data falhou. & popd & pause & exit /b 1 )

    popd
    echo.
    echo [BD] Base de dados pronta.
) else (
    echo [BD] Base de dados ja existe. A saltar migrações.
)

echo.
echo A lançar Frontend e Backend...
start "PantryMate Frontend" /D frontend cmd /c "npm run dev & pause"
start "PantryMate Backend"  /D backend  cmd /c ".\.venv\Scripts\python.exe manage.py runserver & pause"

echo.
echo =======================================
echo   Frontend : http://localhost:5173
echo   Backend  : http://localhost:8000
echo   Admin    : http://localhost:8000/admin
echo =======================================
echo.
