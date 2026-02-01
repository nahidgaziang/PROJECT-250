@echo off
echo ========================================
echo ReaDefy Database Migration
echo Adding name and registration_no columns
echo ========================================
echo.

REM Try XAMPP MySQL path first
set MYSQL_PATH=C:\xampp\mysql\bin\mysql.exe

if not exist "%MYSQL_PATH%" (
    echo ERROR: MySQL not found at %MYSQL_PATH%
    echo Please ensure XAMPP is installed or update the path in this script.
    pause
    exit /b 1
)

echo Running database migration...
"%MYSQL_PATH%" -u root < migrate-add-user-fields.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Migration completed successfully!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo ERROR: Migration failed!
    echo Please check if MySQL is running in XAMPP
    echo ========================================
)

pause
