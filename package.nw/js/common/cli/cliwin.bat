@echo off

set CALLING_DIR=%CD%

cd /d %~dp0

.\node.exe .\cli.js %*

cd "%CALLING_DIR%"