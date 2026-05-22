# AirTrackMP API - Documentación Completa

## Índice

1. [Introducción](#introducción)
2. [Autenticación JWT](#autenticación-jwt)
3. [Endpoints](#endpoints)
   - [Auth](#auth-apiauth)
   - [User](#user-apiuser)
   - [Node](#node-apinodes)
   - [Measurement](#measurement-apimeasurements)
   - [Alert](#alert-apialert)
   - [Prediction](#prediction-apiprediction)
4. [Modelos de Datos](#modelos-de-datos)
5. [Permisos por Endpoint](#permisos-por-endpoint)

---

## Introducción

API RESTful para el sistema de monitoreo de calidad del aire AirTrackMP. Recopila y procesa datos de material particulado (PM2.5/PM10) de sensores IoT.

**URL Base**: `http://localhost:8080`

**Tech Stack**:
- Spring Boot 4.0.5 / Java 21
- Spring Security + JWT
- PostgreSQL

---

## Autenticación JWT

### Flujo de Autenticación

1. **Registro**: `POST /api/auth/register` → Retorna JWT token
2. **Login**: `POST /api/auth/login` → Retorna JWT token
3. **Uso**: Incluir header `Authorization: Bearer <token>` en requests protegidos

### Header de Autorización

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Características del Token

- **Duración**: 24 horas (86400000 ms)
- **Contenido**: Username (email) y role
- **Algoritmo**: HS256

---

## Endpoints

### Auth (`/api/auth`)

#### POST /api/auth/register

Registrar un nuevo usuario.

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

**Roles disponibles**: `USER`, `ADMIN`

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
- `User not found` - Email no registrado
- `Invalid password` - Contraseña incorrecta

---

### User (`/api/user`)

#### POST /api/user

Crear usuario.

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
```json
"User deleted successfully"
```

---

### Node (`/api/nodes`)

#### POST /api/nodes

Crear nodo IoT.

**Requiere**: ADMIN

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

**Requiere**: ADMIN

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

#### GET /api/nodes/{nodeId}

Obtener nodo por ID.

**Requiere**: ADMIN

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

---

#### PUT /api/nodes/{nodeId}

Actualizar nodo.

**Requiere**: ADMIN

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

**Requiere**: ADMIN

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

#### POST /api/measurements

Crear medición.

**Requiere**: Público

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

**Response** (200):
```json
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
```

**Nota**: El campo `recordedAt` es opcional. Si no se envía, se usa la fecha/hora actual.

---

#### POST /api/measurements/bulk

Crear múltiples mediciones.

**Requiere**: Público

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
  },
  {
    "nodeId": 1,
    "pm25": 24.0,
    "pm10": 44.0,
    "temperature": 23.0,
    "humidity": 64.0,
    "recordedAt": "2026-05-17T14:30:00"
  }
]
```

**Response** (200):
```json
[
  {
    "id": 1,
    "pm25": 20.0,
    "pm10": 40.0,
    "temperature": 21.0,
    "humidity": 60.0,
    "recordedAt": "2026-05-17T14:00:00",
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
  },
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

---

#### GET /api/measurements

Listar todas las mediciones.

**Requiere**: Público

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
    "node": { ... }
  }
]
```

---

#### GET /api/measurements/node/{nodeId}/latest

Obtener últimas mediciones de un nodo.

**Requiere**: Público

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

Obtener mediciones de un nodo con filtro de fecha.

**Requiere**: Público

**Parámetros Query**:
| Param | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| from | String | No | Fecha inicio (ISO 8601) |
| to | String | No | Fecha fin (ISO 8601) |

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

---

#### GET /api/measurements/node/{nodeId}/average

Obtener promedios agrupados por período.

**Requiere**: Público

**Parámetros Query**:
| Param | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| from | String | Sí | Fecha inicio (ISO 8601) |
| to | String | Sí | Fecha fin (ISO 8601) |
| groupBy | String | Sí | Grupo: `hour`, `day`, `minute` |

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

#### POST /api/alert

Crear alerta.

**Requiere**: ADMIN

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

Obtener alertas de un nodo.

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

Obtener alerta por medición.

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

Actualizar alerta.

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
```json
"Alert deleted successfully"
```

---

### Prediction (`/api/prediction`)

#### POST /api/prediction

Crear predicción.

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
| password | String | Contraseña encriptada (BCrypt) |
| role | String | Rol: `USER`, `ADMIN` |
| deleted | Boolean | Soft delete flag |
| createdAt | LocalDateTime | Fecha de creación |

---

### Node

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Integer | ID único |
| name | String | Nombre del nodo |
| location | String | Ubicación textual |
| latitude | Float | Latitud geográfica |
| longitude | Float | Longitud geográfica |
| status | Enum | ACTIVE, INACTIVE, MAINTENANCE, OFFLINE, CALIBRATION |
| deleted | Boolean | Soft delete flag |
| createdAt | LocalDateTime | Fecha de creación |

---

### Measurement

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Integer | ID único |
| pm25 | Float | Concentración PM2.5 (µg/m³) |
| pm10 | Float | Concentración PM10 (µg/m³) |
| temperature | Float | Temperatura (°C) |
| humidity | Float | Humedad relativa (%) |
| recordedAt | LocalDateTime | Fecha/hora de la medición |
| node | Node | Nodo que generó la medición |

---

### Alert

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Integer | ID único |
| type | String | Tipo de alerta |
| message | String | Mensaje descriptivo |
| deleted | Boolean | Soft delete flag |
| createdAt | LocalDateTime | Fecha de creación |
| node | Node | Nodo asociado |
| measurement | Measurement | Medición que generó la alerta |

---

### Prediction

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | Integer | ID único |
| predictedPm25 | Float | Predicción PM2.5 (µg/m³) |
| predictedPm10 | Float | Predicción PM10 (µg/m³) |
| riskLevel | String | Nivel de riesgo: LOW, MODERATE, HIGH, CRITICAL |
| predictionTime | LocalDateTime | Hora de la predicción |
| createdAt | LocalDateTime | Fecha de creación |
| node | Node | Nodo asociado |

---

## Permisos por Endpoint

| Endpoint | Público | Autenticado | ADMIN |
|----------|---------|-------------|-------|
| POST /api/auth/register | ✓ | | |
| POST /api/auth/login | ✓ | | |
| GET /api/user | | ✓ | |
| POST /api/user | | ✓ | |
| GET /api/user/{id} | | ✓ | |
| PUT /api/user/{id} | | ✓ | |
| DELETE /api/user/{id} | | ✓ | |
| GET /api/nodes | | | ✓ |
| POST /api/nodes | | | ✓ |
| GET /api/nodes/{id} | | | ✓ |
| PUT /api/nodes/{id} | | | ✓ |
| PUT /api/nodes/{id}/delete | | | ✓ |
| GET /api/measurements | ✓ | | |
| POST /api/measurements | ✓ | | |
| POST /api/measurements/bulk | ✓ | | |
| GET /api/measurements/node/{id}/latest | ✓ | | |
| GET /api/measurements/node/{id} | ✓ | | |
| GET /api/measurements/node/{id}/average | ✓ | | |
| GET /api/alert | | ✓ | |
| POST /api/alert | | | ✓ |
| GET /api/alert/node/{id} | | ✓ | |
| GET /api/alert/measurement/{id} | | ✓ | |
| PUT /api/alert/{id} | | ✓ | |
| DELETE /api/alert/{id} | | ✓ | |
| GET /api/prediction | | ✓ | |
| POST /api/prediction | | ✓ | |
| GET /api/prediction/node/{id} | | ✓ | |
| GET /api/prediction/{id} | | ✓ | |
| PUT /api/prediction/{id} | | ✓ | |
| DELETE /api/prediction/{id} | | ✓ | |

---

## Ejemplo: Uso del Script Python para IoT

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
Sent: {'pm10': 11.23, 'pm25': 13.45, 'temperature': 29.12, 'humidity': 64.34} | Status: 200
```

El script envía datos cada 10 segundos con valores que varían ligeramente:
- PM2.5: 0 - 500 µg/m³
- PM10: 0 - 500 µg/m³
- Temperatura: -20 - 50 °C
- Humedad: 0 - 100 %

---

## Códigos de Respuesta HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Request exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Delete exitoso |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido o ausente |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no existe |
| 500 | Internal Server Error - Error del servidor |

---

## Formato de Fechas

La API usa formato ISO 8601: `YYYY-MM-DDTHH:MM:SS`

Ejemplos:
- `2026-05-17T14:30:00`
- `2026-05-17T10:00:00`

---

*Documentación generada para AirTrackMP Backend v0.0.1-SNAPSHOT*