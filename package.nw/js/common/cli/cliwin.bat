@echo off

set CALLING_DIR=%CD%

cd /d %~dp0

.\node.exe .\package.nw\js\common\cli\index.js %*

cd "%CALLING_DIR%"