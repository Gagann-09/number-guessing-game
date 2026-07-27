@echo off
title Number Guessing Dashboard

cd /d "%~dp0"

echo ========================================
echo Starting Number Guessing Dashboard...
echo ========================================

start cmd /c "cd backend && uvicorn app:app --reload"

timeout /t 3 /nobreak > nul

start http://127.0.0.1:8000

exit