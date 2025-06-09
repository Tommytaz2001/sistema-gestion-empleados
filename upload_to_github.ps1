Write-Host "Inicializando repositorio Git..." -ForegroundColor Cyan
git init

Write-Host "Agregando archivos al repositorio..." -ForegroundColor Cyan
git add .

Write-Host "Haciendo commit inicial..." -ForegroundColor Cyan
try {
    git commit -m "Primer commit: Proyecto inicial"
    
    Write-Host "Agregando repositorio remoto..." -ForegroundColor Cyan
    # Intentar agregar el remoto, ignorar error si ya existe
    try {
        git remote add origin https://github.com/Tommytaz2001/sistema-gestion-empleados.git
    } catch {
        Write-Host "El repositorio remoto 'origin' ya existe." -ForegroundColor Yellow
    }
    
    Write-Host "Trayendo cambios del repositorio remoto (si existen)..." -ForegroundColor Cyan
    git pull origin main --allow-unrelated-histories # Permite combinar historiales no relacionados

    Write-Host "Subiendo cambios a GitHub..." -ForegroundColor Cyan
    git branch -M main # Asegurarse de que la rama es main
    git push -u origin main
    
    Write-Host "¡Éxito! El código ha sido subido a GitHub." -ForegroundColor Green
    Write-Host "Puedes verlo en: https://github.com/Tommytaz2001/sistema-gestion-empleados" -ForegroundColor Green
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host "Asegúrate de que Git está instalado y configurado correctamente." -ForegroundColor Yellow
    Write-Host "Puedes descargar Git desde: https://git-scm.com/download/win" -ForegroundColor Yellow
}
