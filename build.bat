@ECHO OFF
MODE CON COLS=80 LINES=20

ECHO ========================================
ECHO.
ECHO     [[ Build dist folder to zip ]]
ECHO            Author : soohyun
ECHO. 
ECHO ========================================

cd "%~dp0"
REM From folder path
SET DIST_FOLDER=dist
REM to folder path
SET BUILD_FOLDER=build
REM compress file name 
SET MODULE_NAME=calendar

REM get _MY_DATETIME
CALL :SETDATETIME
SET MODULE_NAME="%MODULE_NAME%_%_TODAY%_%1.zip"

REM bandizip compress
bandizip.exe c %BUILD_FOLDER%\%MODULE_NAME% %DIST_FOLDER%

ECHO.
ECHO        Done.
ECHO. 
ECHO ========================================

REM close
GOTO :EOF

REM =============================
REM functional
:SETDATETIME
SET _DATE_FORMAT=%DATE%
REM  result ->2023-03-02
SET _DATE_FORMAT=%_DATE_FORMAT:-=%
REM  result ->20230302
SET _TODAY=%_DATE_FORMAT%
REM =============================