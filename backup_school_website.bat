@echo off
:: ----------------------------
:: Backup Script for KV School
:: ----------------------------

:: Set date for backup folder/file names
set DATE=%date:~10,4%-%date:~4,2%-%date:~7,2%

:: Set backup directory
set BACKUP_DIR=D:\kvschool_backup

:: Create backup folder if it doesn't exist
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo ----------------------------
echo Backing up Project Files...
echo ----------------------------

:: Using 7-Zip to compress project folder
:: Make sure 7z.exe is in your PATH or provide full path like "C:\Program Files\7-Zip\7z.exe"
7z a -tzip "%BACKUP_DIR%\kvschoolwebsite_%DATE%.zip" "D:\kvschoolwebsite\*"

echo ----------------------------
echo Backing up MongoDB...
echo ----------------------------

:: MongoDB Atlas URI (replace with your credentials)
set MONGO_URI=mongodb+srv://kkbhardwajsharma1234_db_user:1wqdhBpQfpg5u0pe@cluster0.dxrakgd.mongodb.net/kv_school_db?retryWrites=true&w=majority

:: Run mongodump
mongodump --uri="%MONGO_URI%" --out="%BACKUP_DIR%\mongodb_%DATE%"

echo ----------------------------
echo Backup completed for %DATE%
echo Files saved in %BACKUP_DIR%
pause


