@echo off
echo Iniciando o servidor de desenvolvimento Angular...
cd /d "%~dp0"
call C:\Program Files\nodejs\node.exe ./node_modules/@angular/cli/bin/ng serve
