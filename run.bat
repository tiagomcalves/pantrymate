@echo off
echo Launching Frontend and Backend services
start "PantryMate Frontend" /D frontend cmd /c "npm run dev"
start "PantryMate Backend" /I /D backend python manage.py runserver
