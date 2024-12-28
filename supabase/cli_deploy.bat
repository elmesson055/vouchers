@echo off
echo Iniciando deploy com Supabase...

REM Verificar se o Docker está rodando
docker info > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Docker não está rodando!
    echo Por favor, inicie o Docker Desktop e tente novamente.
    pause
    exit /b 1
)

REM Limpar ambiente anterior
echo Limpando ambiente anterior...
docker compose down -v 2>nul
docker system prune -f 2>nul

REM Criar diretórios necessários
echo Criando diretórios...
if not exist "volumes" mkdir volumes
if not exist "volumes\storage" mkdir volumes\storage

REM Criar rede Docker se não existir
echo Criando rede Docker...
docker network create supabase-network 2>nul

REM Pull das imagens necessárias
echo.
echo Baixando imagens do Docker Hub...
docker compose pull

REM Aguardar um pouco
timeout /t 5 /nobreak > nul

REM Iniciar os serviços com docker-compose
echo.
echo Iniciando serviços Supabase...
docker compose up -d

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Aguardando serviços iniciarem...
    timeout /t 10 /nobreak > nul
    
    echo.
    echo Supabase iniciado com sucesso!
    echo.
    echo URLs importantes:
    echo Studio: http://localhost:3000
    echo API: http://localhost:8000
    echo Meta: http://localhost:8080
    echo.
    echo Credenciais padrão:
    echo Database Host: db
    echo Database Port: 5432
    echo Database User: postgres
    echo Database Password: postgres
    echo Database Name: postgres
    
    REM Importar schema inicial
    echo.
    echo Importando schema inicial...
    docker cp migrations/20231209000000_initial_schema.sql supabase-db:/tmp/
    docker exec supabase-db psql -U postgres -d postgres -f /tmp/20231209000000_initial_schema.sql
    
    if %ERRORLEVEL% EQU 0 (
        echo Schema importado com sucesso!
    ) else (
        echo Erro ao importar schema.
        echo Verifique os logs acima para mais detalhes.
    )
) else (
    echo.
    echo Erro ao iniciar Supabase.
    echo Verifique os logs acima para mais detalhes.
)

echo.
echo Para parar os serviços, execute:
echo docker compose down

echo.
echo Pressione qualquer tecla para sair...
pause > nul
