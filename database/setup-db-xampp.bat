@echo off
echo ========================================
echo ReaDefy Database Setup (XAMPP Version)
echo ========================================
echo.
echo This script will create the database schema.
echo Make sure XAMPP MySQL is running!
echo.
pause

:: Set common XAMPP MySQL path
set MYSQL_PATH=C:\xampp\mysql\bin\mysql.exe

:: Check if MySQL exists at the default path
if not exist "%MYSQL_PATH%" (
    echo ERROR: MySQL not found at %MYSQL_PATH%
    echo Please update MYSQL_PATH in this script to match your XAMPP installation.
    echo.
    pause
    exit /b 1
)

echo Running SQL script...
"%MYSQL_PATH%" -u root -e "CREATE DATABASE IF NOT EXISTS readefy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
"%MYSQL_PATH%" -u root readefy_db < schema.sql

if %errorlevel% == 0 (
    echo.
    echo ========================================
    echo ✓ Database created successfully!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo ✗ Database creation failed!
    echo Make sure XAMPP MySQL is running.
    echo ========================================
)

echo.
pause
