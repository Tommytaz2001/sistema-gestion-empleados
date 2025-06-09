Write-Host "Iniciando proceso de subida a GitHub..." -ForegroundColor Cyan

# 1. Asegurar que estamos en la rama main
Write-Host "Cambiando a la rama 'main'..." -ForegroundColor Cyan
git branch -M main

# 2. Agregar todos los cambios locales, incluyendo el README.md mejorado
Write-Host "Agregando todos los archivos locales al staging area..." -ForegroundColor Cyan
git add .

# 3. Hacer un commit de los cambios locales
Write-Host "Haciendo commit de los cambios locales..." -ForegroundColor Cyan
# Verificar si hay cambios para commitear
if (-not (git diff --staged --quiet)) {
    git commit -m "Actualización de archivos del proyecto y README mejorado"
    Write-Host "Commit de cambios locales realizado." -ForegroundColor Green
} else {
    Write-Host "No hay cambios locales nuevos para hacer commit." -ForegroundColor Yellow
}

# 4. Configurar el repositorio remoto (ignorar error si ya existe)
Write-Host "Configurando repositorio remoto 'origin'..." -ForegroundColor Cyan
git remote add origin https://github.com/Tommytaz2001/sistema-gestion-empleados.git 2>$null # Suprimir error si ya existe

# 5. Traer cambios del remoto y fusionar, permitiendo historiales no relacionados
Write-Host "Intentando traer cambios del repositorio remoto y fusionar (pull)..." -ForegroundColor Cyan
git pull origin main --allow-unrelated-histories

# 6. Verificar si hubo conflicto en README.md y resolverlo tomando la versión local
Write-Host "Verificando conflictos después del pull..." -ForegroundColor Cyan
if (git status --porcelain | Select-String -Pattern "^UU README.md") {
    Write-Host "Conflicto detectado en README.md. Resolviendo tomando la versión local (--ours)..." -ForegroundColor Yellow
    git checkout --ours README.md
    git add README.md
    Write-Host "Haciendo commit de la fusión del README..." -ForegroundColor Cyan
    git commit -m "Merge con remoto, manteniendo README local actualizado"
} elseif (git status --porcelain | Select-String -Pattern "^UU") {
    Write-Host "Se detectaron conflictos de fusión en otros archivos. Por favor, resuélvelos manualmente y luego ejecuta 'git push origin main'." -ForegroundColor Red
    exit 1
} else {
    Write-Host "No se detectaron conflictos de fusión o ya estaban resueltos." -ForegroundColor Green
}

# 7. Subir los cambios finales a GitHub
Write-Host "Subiendo cambios finales a GitHub ('git push')..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "¡Éxito! El código ha sido subido a GitHub." -ForegroundColor Green
    Write-Host "Puedes verlo en: https://github.com/Tommytaz2001/sistema-gestion-empleados" -ForegroundColor Green
} else {
    Write-Host "Error durante el 'git push'. Revisa los mensajes anteriores." -ForegroundColor Red
    Write-Host "Puede que necesites resolver conflictos manualmente o asegurar que tu rama local está actualizada." -ForegroundColor Yellow
    Write-Host "Intenta ejecutar 'git status' para ver el estado actual y 'git log' para revisar los commits." -ForegroundColor Yellow
}

