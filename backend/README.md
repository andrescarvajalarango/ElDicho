# ElDicho - Backend API

Backend de la plataforma social de dichos y refranes colombianos, construido con **FastAPI** (Python).

## Tecnologías

| Tecnología | Uso |
|---|---|
| **FastAPI** | Framework web async de alto rendimiento |
| **Uvicorn** | Servidor ASGI para producción |
| **SQLAlchemy 2.0** | ORM async para base de datos |
| **Alembic** | Migraciones de base de datos |
| **Pydantic v2** | Validación de datos |
| **JWT (PyJWT)** | Autenticación con tokens |
| **bcrypt** | Hash seguro de contraseñas |
| **slowapi** | Rate limiting por IP |
| **SQLite** (dev) / **PostgreSQL** (prod) | Bases de datos |

---

## Requisitos previos

### 1. Instalar Python 3.11 o superior

**Windows:**
1. Ve a [python.org/downloads](https://www.python.org/downloads/)
2. Descarga Python 3.11+ (o 3.12, 3.13)
3. **IMPORTANTE:** Marca la casilla ✅ "Add Python to PATH" durante la instalación
4. Verifica en una terminal: `python --version`

**macOS:**
```bash
# Opción 1: Desde python.org
# Descarga el instalador de https://www.python.org/downloads/

# Opción 2: Con Homebrew (si lo tienes instalado)
brew install python@3.12
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3.12 python3.12-venv python3-pip
```

### 2. Verificar instalación

Abre una terminal y ejecuta:
```bash
python3 --version   # Debe mostrar 3.11 o superior
# En Windows puede ser solo:
python --version
```

---

## Instalación paso a paso

### Paso 1: Abre una terminal y navega al backend

```bash
cd backend
```

### Paso 2: Crea un entorno virtual

Un entorno virtual es una copia aislada de Python para este proyecto. Así no afectas otros proyectos.

**macOS / Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
py -3.12 -m venv venv
venv\Scripts\activate.bat
```

> Sabrás que el entorno está activo porque verás `(venv)` al inicio de tu terminal.

### Paso 3: Instala las dependencias

```bash
pip install -r requirements.txt
```

Esto instalará FastAPI, SQLAlchemy, y todas las librerías necesarias.

### Paso 4: Configura las variables de entorno

```bash
# Copia el archivo de ejemplo
cp .env.example .env
```

Luego abre `.env` con cualquier editor de texto y cambia `SECRET_KEY` por algo seguro:

```bash
# Genera una clave segura con este comando:
python -c "import secrets; print(secrets.token_hex(32))"
```

Copia el resultado y pégalo en `SECRET_KEY=` dentro del archivo `.env`.

### Paso 5: Crea la base de datos y carga datos iniciales

```bash
python scripts/seed.py
```

Esto crea la base de datos SQLite (`eldicho.db`) con:
- 33 departamentos de Colombia
- 8 usuarios de prueba
- 41 dichos colombianos con likes y comentarios

**Usuarios de prueba** (la contraseña de todos es `ElDicho2024!`):
| Usuario | Nombre | Región |
|---|---|---|
| juancho_paisa | Juan Carlos Gómez | Antioquia |
| la_costena | María del Carmen | Atlántico |
| el_cachaco | Andrés Felipe Rojas | Bogotá D.C. |
| la_valluna | Carolina Valencia | Valle del Cauca |
| el_santandereano | Pedro Luis Mantilla | Santander |
| la_opita | Luz Dary Trujillo | Huila |
| el_llanero | Jorge Eliécer Parra | Meta |
| la_narinense | Sandra Patricia Jurado | Nariño |

### Paso 6: Inicia el servidor

```bash
uvicorn app.main:app --reload --port 8000
```

El servidor estará disponible en: **http://localhost:8000**

---

## Documentación interactiva

FastAPI genera documentación automática de la API:

- **Swagger UI**: http://localhost:8000/docs (interfaz interactiva para probar endpoints)
- **ReDoc**: http://localhost:8000/redoc (documentación en formato más legible)

---

## Endpoints de la API

Todos los endpoints están bajo el prefijo `/api/v1`.

### Autenticación

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Registrar usuario | No |
| POST | `/api/v1/auth/login` | Iniciar sesión | No |
| POST | `/api/v1/auth/refresh` | Renovar token | No |

### Usuarios

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/v1/users/me` | Mi perfil | Sí |
| PATCH | `/api/v1/users/me` | Actualizar mi perfil | Sí |
| GET | `/api/v1/users/{username}` | Perfil público | No |

### Dichos

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/v1/dichos` | Listar dichos (paginado) | No |
| POST | `/api/v1/dichos` | Crear dicho | Sí |
| GET | `/api/v1/dichos/{id}` | Ver un dicho | No |
| DELETE | `/api/v1/dichos/{id}` | Eliminar dicho propio | Sí |
| POST | `/api/v1/dichos/{id}/like` | Dar/quitar like | Sí |
| POST | `/api/v1/dichos/{id}/comment` | Comentar | Sí |
| POST | `/api/v1/dichos/{id}/share` | Compartir | Sí |

**Parámetros de consulta para `GET /api/v1/dichos`:**
- `departamentoId` - Filtrar por departamento
- `page` - Número de página (default: 1)
- `limit` - Resultados por página (default: 20, max: 100)

### Departamentos

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/v1/departamentos` | Listar departamentos | No |

### Health Check

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Estado del servidor |

---

## Ejemplo de uso con curl

### 1. Iniciar sesión
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "juancho_paisa", "password": "ElDicho2024!"}'
```

Respuesta:
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer"
}
```

### 2. Crear un dicho (con token)
```bash
curl -X POST http://localhost:8000/api/v1/dichos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_ACCESS_TOKEN" \
  -d '{
    "text": "El que es buen gallo, en cualquier gallinero canta",
    "meaning": "El talento se demuestra en cualquier lugar",
    "departamento_id": "ID_DEL_DEPARTAMENTO"
  }'
```

### 3. Listar dichos de un departamento
```bash
curl "http://localhost:8000/api/v1/dichos?departamentoId=ID_DEL_DEPARTAMENTO&page=1&limit=10"
```

---

## Seguridad implementada

| Medida | Descripción |
|---|---|
| **JWT con refresh tokens** | Tokens de acceso de corta vida + tokens de renovación |
| **bcrypt** | Hash de contraseñas con sal automática |
| **Rate limiting** | 60 peticiones/minuto por IP (configurable) |
| **CORS** | Solo orígenes permitidos (configurable) |
| **Security headers** | X-Content-Type-Options, X-Frame-Options, HSTS, etc. |
| **Validación Pydantic** | Validación estricta de todos los datos de entrada |
| **SQL Injection protegido** | SQLAlchemy usa queries parametrizadas |
| **Trusted Host** | Protección contra ataques de header Host |
| **Cascade deletes** | Integridad referencial en la base de datos |

---

## Producción

### Usar PostgreSQL en producción

1. Instala PostgreSQL en tu servidor
2. Crea la base de datos:
   ```sql
   CREATE DATABASE eldicho;
   CREATE USER eldicho_user WITH PASSWORD 'tu_password_seguro';
   GRANT ALL PRIVILEGES ON DATABASE eldicho TO eldicho_user;
   ```
3. Cambia `DATABASE_URL` en `.env`:
   ```
   DATABASE_URL=postgresql+asyncpg://eldicho_user:tu_password_seguro@localhost:5432/eldicho
   ```

### Ejecutar con Gunicorn (producción)

```bash
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
```

- `-w 4`: 4 workers (ajusta según los núcleos de tu CPU: `2 * num_cores + 1`)
- `-k uvicorn.workers.UvicornWorker`: worker async para máximo rendimiento

### Docker (opcional)

Crea un `Dockerfile` en la carpeta `backend/`:
```dockerfile
FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]
```

```bash
docker build -t eldicho-backend .
docker run -p 8000:8000 --env-file .env eldicho-backend
```

---

## Migraciones de base de datos

Cuando modifiques los modelos, genera una migración:

```bash
# Generar migración automática
alembic revision --autogenerate -m "descripcion del cambio"

# Aplicar migraciones
alembic upgrade head

# Ver historial de migraciones
alembic history
```

---

## Estructura del proyecto

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── auth.py          # Registro, login, refresh token
│   │       │   ├── departamentos.py # Listado de departamentos
│   │       │   ├── dichos.py        # CRUD de dichos + likes/comments/shares
│   │       │   └── users.py         # Perfil de usuario
│   │       └── router.py            # Agregador de rutas
│   ├── core/
│   │   ├── config.py                # Configuración con pydantic-settings
│   │   ├── database.py              # Engine y sesiones async
│   │   └── security.py              # JWT, bcrypt, dependencias de auth
│   ├── middleware/
│   │   ├── rate_limiter.py          # Rate limiting con slowapi
│   │   └── security_headers.py      # Headers de seguridad HTTP
│   ├── models/
│   │   ├── user.py                  # Modelo User
│   │   ├── departamento.py          # Modelo Departamento
│   │   ├── dicho.py                 # Modelo Dicho
│   │   └── interactions.py          # Modelos Like, Comment, Share
│   ├── schemas/
│   │   ├── auth.py                  # Schemas de autenticación
│   │   ├── departamento.py          # Schemas de departamentos
│   │   ├── dicho.py                 # Schemas de dichos
│   │   └── user.py                  # Schemas de usuarios
│   └── main.py                      # Punto de entrada de la app
├── alembic/                         # Migraciones de DB
├── scripts/
│   └── seed.py                      # Script para poblar datos iniciales
├── tests/                           # Tests
├── .env.example                     # Variables de entorno de ejemplo
├── alembic.ini                      # Configuración de Alembic
├── requirements.txt                 # Dependencias de Python
└── README.md                        # Este archivo
```

---

## Comandos útiles

```bash
# Activar entorno virtual
source venv/bin/activate          # macOS/Linux
.\venv\Scripts\Activate.ps1       # Windows PowerShell

# Iniciar servidor en desarrollo
uvicorn app.main:app --reload --port 8000

# Ejecutar seed
python scripts/seed.py

# Ejecutar tests
pytest

# Generar migración
alembic revision --autogenerate -m "descripcion"

# Aplicar migraciones
alembic upgrade head

# Ver logs del servidor
uvicorn app.main:app --reload --port 8000 --log-level debug
```

---

## Solución de problemas comunes

### "python" no se reconoce como comando
- **Windows**: Reinstala Python marcando "Add to PATH"
- **macOS/Linux**: Usa `python3` en vez de `python`

### Error al instalar bcrypt
```bash
# Linux: instala las herramientas de compilación
sudo apt install build-essential libffi-dev

# macOS: instala Xcode command line tools
xcode-select --install
```

### Error "Permission denied" al activar venv (macOS/Linux)
```bash
chmod +x venv/bin/activate
source venv/bin/activate
```

### Error de PowerShell al activar venv (Windows)
```powershell
# Ejecuta esto una vez como administrador:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Puerto 8000 ya está en uso
```bash
# Usa otro puerto
uvicorn app.main:app --reload --port 8001
```
