start "PantryMate Backend" /I /D backend python manage.py runserver
start "PantryMate Frontend" /D frontend cmd /c "npm run dev"