Read-Host "Make sure you have npm and python installed BEFORE running this script"
Write-Output ":: Setting up Python environment"
cd backend
python -m venv .venv
Write-Output ":: Activating Virtual Environment"
.venv/Scripts/Activate.ps1
Write-Output ":: Installing requirements"
python -m pip install -r requirements.txt --require-virtualenv
python -m pip list --require-virtualenv
deactivate
Write-Output ":: Setting up Frontend with npm"
cd ../frontend
npm install
cd ..
Write-Output ":: Everything should be set"
Write-Output ":: run.bat should run correctly now"