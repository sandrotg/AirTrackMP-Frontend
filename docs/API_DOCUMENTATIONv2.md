# AirTrackMP API — Documentación Completa

## Índice

1. [Introducción](#introducción)
2. [Autenticación JWT](#autenticación-jwt)
3. [Roles](#roles)
4. [Endpoints](#endpoints)
   - [Auth](#auth-apiauth)
   - [User](#user-apiuser)
   - [Node](#node-apinodes)
   - [Measurement](#measurement-apimeasurements)
   - [Alert](#alert-apialert)
   - [Prediction](#prediction-apiprediction)
5. [Modelos de Datos](#modelos-de-datos)
6. [Permisos por Endpoint](#permisos-por-endpoint)
7. [Simulador IoT](#simulador-iot)
8. [Códigos de Respuesta HTTP](#códigos-de-respuesta-http)
9. [Formato de Fechas](#formato-de-fechas)

---

## Introducción

API RESTful para el sistema de monitoreo de calidad del aire **AirTrackMP**. Recopila y procesa datos de material particulado (PM2.5/PM10) de sensores IoT usando una arquitectura basada en eventos con Kafka.

**URL Base**: `http://localhost:8080`

**Tech Stack**:
- Spring Boot 4.0.5 / Java 21, Spring Security + JWT, PostgreSQL, Kafka
- Servicio ML: Flask + scikit-learn (`ml-service/`, puerto `5000`)

---

## Autenticación JWT

### Flujo

1. **Registro**: `POST /api/auth/register` → Retorna JWT
2. **Login**: `POST /api/auth/login` → Retorna JWT
3. **Uso**: Header `Authorization: Bearer <token>` en requests protegidos

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Características del Token

- **Duración**: 24 horas (86400000 ms)
- **Contenido**: email (username) y role
- **Algoritmo**: HS256

---

## Roles

| Rol | Descripción |
|-----|-------------|
| `USER` | Usuario regular con acceso de lectura |
| `NODE` | Nodo IoT — solo puede crear mediciones |
| `ADMIN` | Administración completa del sistema |

- `USER` y `ADMIN` se crean vía `POST /api/auth/register`
- `NODE` se crea exclusivamente vía `POST /api/auth/register-node` (requiere `ADMIN`)

---

## Endpoints

### Auth (`/api/auth`)

---

#### POST /api/auth/register

Registrar un nuevo usuario (`USER` o `ADMIN`).

**Requiere**: Público

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
```

**Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Notas**:
- El rol `NODE` es rechazado — debe usarse `/api/auth/register-node`
- Si el email ya existe retorna error

---

#### POST /api/auth/login

Iniciar sesión.

**Requiere**: Público

**Request**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores**:
- `User not found` — Email no registrado
- `Invalid password` — Contraseña incorrecta

---

#### POST /api/auth/register-node

Registrar un usuario con rol `NODE` (solo para sensores IoT).

**Requiere**: `ADMIN`

**Request**:
```json
{
  "name": "Node-001-Sensor",
  "email": "node001@airtrackmp.com",
  "password": "nodePassword123"
}
```

**Response** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Nota**: El rol se fuerza a `NODE` ignorando cualquier valor enviado en `role`.

---

### User (`/api/user`)

---

#### POST /api/user

Crear un nuevo usuario.

**Requiere**: Autenticado

**Request**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secure123",
  "role": "USER"
}
```

**Response** (200):
```json
{
  "id": 2,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "USER",
  "deleted": false,
  "createdAt": "2026-05-17T10:30:00"
}
```

---

#### GET /api/user

Listar todos los usuarios.

**Requiere**: Autenticado

**Response** (200):
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "ADMIN",
    "deleted": false,
    "createdAt": "2026-05-16T08:00:00"
  }
]
```

---

#### GET /api/user/{userId}

Obtener usuario por ID.

**Requiere**: Autenticado

**Response** (200):
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "ADMIN",
  "deleted": false,
  "createdAt": "2026-05-16T08:00:00"
}
```

---

#### PUT /api/user/{userId}

Actualizar usuario.

**Requiere**: Autenticado

**Request**:
```json
{
  "name": "John Updated",
  "email": "johnnew@example.com",
  "password": "newpassword",
  "role": "ADMIN"
}
```

**Response** (200):
```json
{
  "id": 1,
  "name": "John Updated",
  "email": "johnnew@example.com",
  "role": "ADMIN",
  "deleted": false,
  "createdAt": "2026-05-16T08:00:00"
}
```

---

#### DELETE /api/user/{userId}

Eliminar usuario (soft delete).

**Requiere**: Autenticado

**Response** (200):
```
"User deleted successfully"
```

---

### Node (`/api/nodes`)

---

#### POST /api/nodes

Crear un nodo IoT.

**Requiere**: `ADMIN`

**Request**:
```json
{
  "name": "Node-001",
  "location": "Zona Centro",
  "latitude": 19.4326,
  "longitude": -99.1332,
  "status": "ACTIVE"
}
```

**Response** (200):
```json
{
  "id": 1,
  "name": "Node-001",
  "location": "Zona Centro",
  "latitude": 19.4326,
  "longitude": -99.1332,
  "status": "ACTIVE",
  "deleted": false,
  "createdAt": "2026-05-17T12:00:00"
}
```

**Statuses disponibles**: `ACTIVE`, `INACTIVE`, `MAINTENANCE`, `OFFLINE`, `CALIBRATION`

---

#### GET /api/nodes

Listar todos los nodos.

**Requiere**: `ADMIN`

**Response** (200):
```json
[
  {
    "id": 1,
    "name": "Node-001",
    "location": "Zona Centro",
    "latitude": 19.4326,
    "longitude": -99.1332,
    "status": "ACTIVE",
    "deleted": false,
    "createdAt": "2026-05-17T12:00:00"
  }
]
```

---

#### PUT /api/nodes/{nodeId}

Actualizar nodo.

**Requiere**: `ADMIN`

**Request**:
```json
{
  "name": "Node-001-Updated",
  "location": "Zona Norte",
  "latitude": 19.4500,
  "longitude": -99.1500,
  "status": "MAINTENANCE"
}
```

**Response** (200):
```json
{
  "id": 1,
  "name": "Node-001-Updated",
  "location": "Zona Norte",
  "latitude": 19.4500,
  "longitude": -99.1500,
  "status": "MAINTENANCE",
  "deleted": false,
  "createdAt": "2026-05-17T12:00:00"
}
```

---

#### PUT /api/nodes/{nodeId}/delete

Eliminar nodo (soft delete).

**Requiere**: `ADMIN`

**Response** (200):
```json
{
  "id": 1,
  "name": "Node-001",
  "location": "Zona Centro",
  "latitude": 19.4326,
  "longitude": -99.1332,
  "status": "ACTIVE",
  "deleted": true,
  "createdAt": "2026-05-17T12:00:00"
}
```

---

### Measurement (`/api/measurements`)

---

#### POST /api/measurements

Encolar una nueva medición (procesada asincrónicamente vía Kafka).

**Requiere**: `NODE`

**Request**:
```json
{
  "nodeId": 1,
  "pm25": 25.5,
  "pm10": 45.0,
  "temperature": 22.5,
  "humidity": 65.0,
  "recordedAt": "2026-05-17T14:30:00"
}
```

**Response** (202):
```
"Measurement queued successfully"
```

**Nota**: `recordedAt` es opcional — si se omite se usa la fecha/hora actual. El endpoint retorna inmediatamente; la persistencia ocurre en el consumidor Kafka.

---

#### POST /api/measurements/bulk

Encolar múltiples mediciones.

**Requiere**: `NODE`

**Request**:
```json
[
  {
    "nodeId": 1,
    "pm25": 20.0,
    "pm10": 40.0,
    "temperature": 21.0,
    "humidity": 60.0,
    "recordedAt": "2026-05-17T14:00:00"
  },
  {
    "nodeId": 1,
    "pm25": 22.0,
    "pm10": 42.0,
    "temperature": 22.0,
    "humidity": 62.0,
    "recordedAt": "2026-05-17T14:15:00"
  }
]
```

**Response** (202):
```
"Measurements queued"
```

---

#### POST /api/measurements/bulk/{nodeId}

Encolar múltiples mediciones para un nodo específico (el `nodeId` se toma del path).

**Requiere**: `NODE`

**Request**:
```json
[
  {
    "pm25": 20.0,
    "pm10": 40.0,
    "temperature": 21.0,
    "humidity": 60.0,
    "recordedAt": "2026-05-17T14:00:00"
  },
  {
    "pm25": 22.0,
    "pm10": 42.0,
    "temperature": 22.0,
    "humidity": 62.0,
    "recordedAt": "2026-05-17T14:15:00"
  }
]
```

**Response** (202):
```
"Measurements queued"
```

**Nota**: A diferencia de `/bulk`, este endpoint no requiere `nodeId` en cada item — se hereda del path.

---

#### GET /api/measurements

Listar todas las mediciones.

**Requiere**: Autenticado

**Response** (200):
```json
[
  {
    "id": 1,
    "pm25": 25.5,
    "pm10": 45.0,
    "temperature": 22.5,
    "humidity": 65.0,
    "recordedAt": "2026-05-17T14:30:00",
    "node": {
      "id": 1,
      "name": "Node-001",
      "location": "Zona Centro",
      "latitude": 19.4326,
      "longitude": -99.1332,
      "status": "ACTIVE",
      "deleted": false,
      "createdAt": "2026-05-17T12:00:00"
    }
  }
]
```

---

#### GET /api/measurements/node/{nodeId}/latest

Obtener las últimas mediciones de un nodo.

**Requiere**: Autenticado

**Response** (200):
```json
[
  {
    "id": 3,
    "pm25": 24.0,
    "pm10": 44.0,
    "temperature": 23.0,
    "humidity": 64.0,
    "recordedAt": "2026-05-17T14:30:00",
    "node": { ... }
  },
  {
    "id": 2,
    "pm25": 22.0,
    "pm10": 42.0,
    "temperature": 22.0,
    "humidity": 62.0,
    "recordedAt": "2026-05-17T14:15:00",
    "node": { ... }
  }
]
```

---

#### GET /api/measurements/node/{nodeId}

Obtener mediciones de un nodo con filtro opcional de fechas.

**Requiere**: Autenticado

**Parámetros Query**:
| Param | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| from | String (ISO 8601) | No | Fecha inicio |
| to | String (ISO 8601) | No | Fecha fin |

**Ejemplo**:
```
GET /api/measurements/node/1?from=2026-05-17T14:00:00&to=2026-05-17T15:00:00
```

**Response** (200):
```json
[
  {
    "id": 3,
    "pm25": 24.0,
    "pm10": 44.0,
    "temperature": 23.0,
    "humidity": 64.0,
    "recordedAt": "2026-05-17T14:30:00",
    "node": { ... }
  }
]
```

**Nota**: Sin `from`/`to` retorna todas las mediciones del nodo.

---

#### GET /api/measurements/node/{nodeId}/average

Obtener promedios agrupados por período.

**Requiere**: Autenticado

**Parámetros Query**:
| Param | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| from | String (ISO 8601) | Sí | Fecha inicio |
| to | String (ISO 8601) | Sí | Fecha fin |
| groupBy | String | Sí | Agrupación: `hour`, `day`, `minute` |

**Ejemplo**:
```
GET /api/measurements/node/1/average?from=2026-05-17T10:00:00&to=2026-05-17T18:00:00&groupBy=hour
```

**Response** (200):
```json
[
  {
    "period": "2026-05-17T10:00:00",
    "avgPm25": 20.5,
    "avgPm10": 38.2,
    "avgTemperature": 21.5,
    "avgHumidity": 62.0
  },
  {
    "period": "2026-05-17T11:00:00",
    "avgPm25": 22.3,
    "avgPm10": 40.1,
    "avgTemperature": 22.8,
    "avgHumidity": 64.5
  }
]
```

---

### Alert (`/api/alert`)

---

#### POST /api/alert

Crear una alerta manualmente.

**Requiere**: `ADMIN`

**Request**:
```json
{
  "nodeId": 1,
  "measurementId": 1,
  "type": "PM25_HIGH",
  "message": "Nivel de PM2.5 superior al umbral permitido"
}
```

**Response** (200):
```json
{
  "id": 1,
  "type": "PM25_HIGH",
  "message": "Nivel de PM2.5 superior al umbral permitido",
  "deleted": false,
  "createdAt": "2026-05-17T15:00:00",
  "node": { ... },
  "measurement": { ... }
}
```

**Nota**: Las alertas también se generan automáticamente desde el consumidor Kafka cuando una medición supera umbrales de riesgo (ver `RiskLevelCalculator`).

---

#### GET /api/alert

Listar todas las alertas.

**Requiere**: Autenticado

**Response** (200):
```json
[
  {
    "id": 1,
    "type": "PM25_HIGH",
    "message": "Nivel de PM2.5 superior al umbral permitido",
    "deleted": false,
    "createdAt": "2026-05-17T15:00:00",
    "node": { ... },
    "measurement": { ... }
  }
]
```

---

#### GET /api/alert/node/{nodeId}

Obtener alertas de un nodo específico.

**Requiere**: Autenticado

**Response** (200):
```json
[
  {
    "id": 1,
    "type": "PM25_HIGH",
    "message": "Nivel de PM2.5 superior al umbral permitido",
    "deleted": false,
    "createdAt": "2026-05-17T15:00:00",
    "node": { ... },
    "measurement": { ... }
  }
]
```

---

#### GET /api/alert/measurement/{measurementId}

Obtener la alerta asociada a una medición.

**Requiere**: Autenticado

**Response** (200):
```json
{
  "id": 1,
  "type": "PM25_HIGH",
  "message": "Nivel de PM2.5 superior al umbral permitido",
  "deleted": false,
  "createdAt": "2026-05-17T15:00:00",
  "node": { ... },
  "measurement": { ... }
}
```

---

#### PUT /api/alert/{alertId}

Actualizar una alerta.

**Requiere**: Autenticado

**Request**:
```json
{
  "nodeId": 1,
  "measurementId": 1,
  "type": "PM25_CRITICAL",
  "message": "Nivel crítico de PM2.5"
}
```

**Response** (200):
```json
{
  "id": 1,
  "type": "PM25_CRITICAL",
  "message": "Nivel crítico de PM2.5",
  "deleted": false,
  "createdAt": "2026-05-17T15:00:00",
  "node": { ... },
  "measurement": { ... }
}
```

---

#### DELETE /api/alert/{alertId}

Eliminar alerta.

**Requiere**: Autenticado

**Response** (200):
```
"Alert deleted successfully"
```

---

### Prediction (`/api/prediction`)

---

#### POST /api/prediction

Crear una predicción manualmente.

**Requiere**: Autenticado

**Request**:
```json
{
  "nodeId": 1,
  "predictedPm25": 28.5,
  "predictedPm10": 50.2,
  "riskLevel": "MODERATE",
  "predictionTime": "2026-05-18T10:00:00"
}
```

**Response** (200):
```json
{
  "id": 1,
  "predictedPm25": 28.5,
  "predictedPm10": 50.2,
  "riskLevel": "MODERATE",
  "predictionTime": "2026-05-18T10:00:00",
  "createdAt": "2026-05-17T16:00:00",
  "node": { ... }
}
```

**Niveles de riesgo**: `LOW`, `MODERATE`, `HIGH`, `CRITICAL`

---

#### POST /api/prediction/generate/node/{nodeId}

Generar una predicción automática desde la última medición del nodo usando el servicio ML.

**Requiere**: Autenticado

**Response** (200):
```json
{
  "id": 1,
  "predictedPm25": 28.5,
  "predictedPm10": 50.2,
  "riskLevel": "MODERATE",
  "predictionTime": "2026-05-18T10:00:00",
  "createdAt": "2026-05-17T16:00:00",
  "node": { ... }
}
```

**Nota**: Este endpoint consulta el servicio ML (`/predict`) con la última medición del nodo, calcula el nivel de riesgo y persiste la predicción.

---

#### GET /api/prediction

Listar todas las predicciones.

**Requiere**: Autenticado

**Response** (200):
```json
[
  {
    "id": 1,
    "predictedPm25": 28.5,
    "predictedPm10": 50.2,
    "riskLevel": "MODERATE",
    "predictionTime": "2026-05-18T10:00:00",
    "createdAt": "2026-05-17T16:00:00",
    "node": { ... }
  }
]
```

---

#### GET /api/prediction/node/{nodeId}

Obtener predicciones de un nodo.

**Requiere**: Autenticado

**Response** (200):
```json
[
  {
    "id": 1,
    "predictedPm25": 28.5,
    "predictedPm10": 50.2,
    "riskLevel": "MODERATE",
    "predictionTime": "2026-05-18T10:00:00",
    "createdAt": "2026-05-17T16:00:00",
    "node": { ... }
  }
]
```

---

#### GET /api/prediction/{predictionId}

Obtener predicción por ID.

**Requiere**: Autenticado

**Response** (200):
```json
{
  "id": 1,
  "predictedPm25": 28.5,
  "predictedPm10": 50.2,
  "riskLevel": "MODERATE",
  "predictionTime": "2026-05-18T10:00:00",
  "createdAt": "2026-05-17T16:00:00",
  "node": { ... }
}
```

---

#### PUT /api/prediction/{predictionId}

Actualizar predicción.

**Requiere**: Autenticado

**Request**:
```json
{
  "nodeId": 1,
  "predictedPm25": 30.0,
  "predictedPm10": 55.0,
  "riskLevel": "HIGH",
  "predictionTime": "2026-05-18T12:00:00"
}
```

**Response** (200):
```json
{
  "id": 1,
  "predictedPm25": 30.0,
  "predictedPm10": 55.0,
  "riskLevel": "HIGH",
  "predictionTime": "2026-05-18T12:00:00",
  "createdAt": "2026-05-17T16:00:00",
  "node": { ... }
}
```

---

#### DELETE /api/prediction/{predictionId}

Eliminar predicción.

**Requiere**: Autenticado

**Response** (204): Sin contenido

---

## Modelos de Datos

### User

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Integer | ID único |
| name | String | Nombre del usuario |
| email | String | Email (usado como username) |
| password | String | Contraseña encriptada (BCrypt) — oculto en respuestas |
| role | String | Rol: `USER`, `ADMIN`, `NODE` |
| deleted | Boolean | Soft delete flag |
| createdAt | LocalDateTime | Fecha de creación |

### Node

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Integer | ID único |
| name | String | Nombre del nodo |
| location | String | Ubicación textual |
| latitude | Float | Latitud geográfica |
| longitude | Float | Longitud geográfica |
| status | Enum | `ACTIVE`, `INACTIVE`, `MAINTENANCE`, `OFFLINE`, `CALIBRATION` |
| deleted | Boolean | Soft delete flag |
| createdAt | LocalDateTime | Fecha de creación |

### Measurement

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Integer | ID único |
| pm25 | Float | Concentración PM2.5 (µg/m³) |
| pm10 | Float | Concentración PM10 (µg/m³) |
| temperature | Float | Temperatura (°C) |
| humidity | Float | Humedad relativa (%) |
| recordedAt | LocalDateTime | Fecha/hora de la medición |
| node | Node | Nodo que generó la medición (objeto completo) |

### Alert

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Integer | ID único |
| type | String | Tipo de alerta (ej. `PM25_HIGH`, `PM25_CRITICAL`) |
| message | String | Mensaje descriptivo |
| deleted | Boolean | Soft delete flag |
| createdAt | LocalDateTime | Fecha de creación |
| node | Node | Nodo asociado (objeto completo) |
| measurement | Measurement | Medición que generó la alerta (objeto completo) |

### Prediction

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Integer | ID único |
| predictedPm25 | Float | Predicción PM2.5 (µg/m³) |
| predictedPm10 | Float | Predicción PM10 (µg/m³) |
| riskLevel | String | Nivel de riesgo: `LOW`, `MODERATE`, `HIGH`, `CRITICAL` |
| predictionTime | LocalDateTime | Hora de la predicción |
| createdAt | LocalDateTime | Fecha de creación del registro |
| node | Node | Nodo asociado (objeto completo) |

---

## Permisos por Endpoint

| Endpoint | Público | Autenticado | NODE | ADMIN |
|----------|---------|-------------|------|-------|
| POST /api/auth/register | ✓ | | | |
| POST /api/auth/login | ✓ | | | |
| POST /api/auth/register-node | | | | ✓ |
| POST /api/user | | ✓ | | |
| GET /api/user | | ✓ | | |
| GET /api/user/{userId} | | ✓ | | |
| PUT /api/user/{userId} | | ✓ | | |
| DELETE /api/user/{userId} | | ✓ | | |
| POST /api/nodes | | | | ✓ |
| GET /api/nodes | | | | ✓ |
| PUT /api/nodes/{nodeId} | | | | ✓ |
| PUT /api/nodes/{nodeId}/delete | | | | ✓ |
| POST /api/measurements | | | ✓ | |
| POST /api/measurements/bulk | | | ✓ | |
| POST /api/measurements/bulk/{nodeId} | | | ✓ | |
| GET /api/measurements | | ✓ | | |
| GET /api/measurements/node/{nodeId}/latest | | ✓ | | |
| GET /api/measurements/node/{nodeId} | | ✓ | | |
| GET /api/measurements/node/{nodeId}/average | | ✓ | | |
| POST /api/alert | | | | ✓ |
| GET /api/alert | | ✓ | | |
| GET /api/alert/node/{nodeId} | | ✓ | | |
| GET /api/alert/measurement/{measurementId} | | ✓ | | |
| PUT /api/alert/{alertId} | | ✓ | | |
| DELETE /api/alert/{alertId} | | ✓ | | |
| POST /api/prediction | | ✓ | | |
| POST /api/prediction/generate/node/{nodeId} | | ✓ | | |
| GET /api/prediction | | ✓ | | |
| GET /api/prediction/node/{nodeId} | | ✓ | | |
| GET /api/prediction/{predictionId} | | ✓ | | |
| PUT /api/prediction/{predictionId} | | ✓ | | |
| DELETE /api/prediction/{predictionId} | | ✓ | | |

---

## Simulador IoT

El archivo `Node Simulation/node.py` permite simular un nodo IoT enviando datos a la API.

### Configuración

Editar el archivo y descomentar/configurar la variable `URL`:

```python
URL = "http://localhost:8080/api/measurements"
```

### Ejecución

```bash
cd "Node Simulation"
python node.py
```

### Output esperado

```
Sent: {'pm10': 11.23, 'pm25': 13.45, 'temperature': 29.12, 'humidity': 64.34} | Status: 202
```

El script envía datos cada 10 segundos con valores que varían ligeramente:
- PM2.5: 0–500 µg/m³
- PM10: 0–500 µg/m³
- Temperatura: −20–50 °C
- Humedad: 0–100 %

**Nota**: El simulador requiere autenticación. Usar un token JWT con rol `NODE` en el header `Authorization`.

---

## Códigos de Respuesta HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK — Request exitosa |
| 201 | Created — Recurso creado |
| 202 | Accepted — Request encolada (procesamiento asíncrono) |
| 204 | No Content — Delete exitoso |
| 400 | Bad Request — Datos inválidos |
| 401 | Unauthorized — Token inválido o ausente |
| 403 | Forbidden — Sin permisos |
| 404 | Not Found — Recurso no existe |
| 500 | Internal Server Error — Error del servidor |

---

## Formato de Fechas

La API usa formato ISO 8601: `YYYY-MM-DDTHH:MM:SS`

Ejemplos:
- `2026-05-17T14:30:00`
- `2026-05-17T10:00:00`

---

*Documentación generada para AirTrackMP Backend v0.0.1-SNAPSHOT*
