@echo off
setlocal

:: ========== CONFIG ==========
set BACKUP_DIR=D:\kvschool_backup
set RESTORE_DIR=D:\kvschool_restore
set MONGO_URI="mongodb+srv://kkbhardwajsharma1234_db_user:1wqdhBpQfpg5u0pe@cluster0.dxrakgd.mongodb.net/kv_school_db?retryWrites=true&w=majority"
set PROJECT_BACKUP_FILE=kvschoolwebsite_2025-11-13.zip
set MONGO_BACKUP_FOLDER=mongodb_2025-11-13
:: ============================

:: Create restore folder if not exist
if not exist "%RESTORE_DIR%" mkdir "%RESTORE_DIR%"

echo.
echo 🔁 Restoring project files...
"C:\Program Files\7-Zip\7z.exe" x "%BACKUP_DIR%\%PROJECT_BACKUP_FILE%" -o"%RESTORE_DIR%" -y

echo.
echo 🗄️ Restoring MongoDB database...
mongorestore --uri=%MONGO_URI% "%BACKUP_DIR%\%MONGO_BACKUP_FOLDER%"

echo.
echo ✅ Restore completed successfully!
pause














@REM PROJECT_BACKUP_FILE → aapke latest .zip ka exact file name

@REM MONGO_BACKUP_FOLDER → MongoDB backup folder ka name (e.g., mongodb_2025-11-13)

@REM MONGO_URI → agar restore dusre MongoDB cluster par karna ho to yahan URI badal do

@REM RESTORE_DIR → jahan extract karna chahte ho project






