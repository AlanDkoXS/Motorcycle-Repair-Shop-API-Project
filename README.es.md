# API Taller de Motocicletas

## Descripción General
API REST desarrollada para gestionar un taller de reparación de motocicletas. Permite a los clientes agendar citas para reparaciones y al personal gestionar el estado de las mismas.

## Tecnologías Utilizadas
- Node.js
- TypeScript
- Express.js
- PostgreSQL
- TypeORM
- JWT para autenticación
- BCrypt para encriptación
- Express Validator

## Estructura del Proyecto
```
src/
├── app.ts                 # Punto de entrada de la aplicación
├── config/               # Configuraciones globales
├── data/                # Capa de datos y modelos
├── domain/              # Lógica de dominio y DTOs
└── presentation/        # Controladores y rutas
```

## Modelos de Datos

### Usuario (User)
```typescript
{
  id: string (UUID)
  name: string
  email: string
  password: string (encriptado)
  role: enum ['employee', 'client']
  status: enum ['available', 'disabled']
}
```

### Reparación (Repair)
```typescript
{
  id: string (UUID)
  date: Date
  motorsNumber: string
  description: string
  status: enum ['pending', 'completed', 'canceled']
  userId: string (UUID)
}
```

## Endpoints

### Autenticación
- **POST /api/v1/auth/login**
  - Autenticación de usuarios
  - Body: `{ email: string, password: string }`
  - Respuesta: `{ user: UserData, token: string }`

### Usuarios
- **GET /api/v1/users**
  - Obtener lista de usuarios
  - Requiere: Token de autenticación

- **GET /api/v1/users/:id**
  - Obtener usuario por ID
  - Requiere: Token de autenticación

- **POST /api/v1/users**
  - Crear nuevo usuario
  - Body: `{ name, email, password, role }`
  - Validaciones:
    - Nombre: 3-80 caracteres
    - Email: Formato válido y único
    - Password: 10-16 caracteres, mayúsculas, minúsculas y caracteres especiales

- **PATCH /api/v1/users/:id**
  - Actualizar usuario
  - Body: `{ name?, email? }`
  - Requiere: Token de autenticación

- **DELETE /api/v1/users/:id**
  - Deshabilitar usuario
  - Requiere: Token de autenticación

### Reparaciones
- **GET /api/v1/repairs**
  - Listar reparaciones pendientes
  - Requiere: Token de autenticación (role: employee)

- **GET /api/v1/repairs/:id**
  - Obtener reparación específica
  - Requiere: Token de autenticación (role: employee)

- **POST /api/v1/repairs**
  - Crear nueva reparación
  - Body: `{ date, motorsNumber, description, userId }`
  - Requiere: Token de autenticación (role: client)
  - Validaciones:
    - Fecha: Formato ISO 8601
    - Número de motor: String no vacío
    - Descripción: Mínimo 10 caracteres
    - UserId: UUID válido

- **PATCH /api/v1/repairs/:id**
  - Marcar reparación como completada
  - Requiere: Token de autenticación (role: employee)

- **DELETE /api/v1/repairs/:id**
  - Cancelar reparación
  - Requiere: Token de autenticación
  - Validación: No se puede cancelar si está completada

## Seguridad

### Autenticación
- Implementación JWT (JSON Web Tokens)
- Tokens con expiración configurable
- Encriptación de contraseñas con BCrypt

### Autorización
- Sistema de roles (client/employee)
- Middleware de validación de roles
- Protección de rutas sensibles

### Validaciones
- Validación de entrada con Express Validator
- Sanitización de datos
- Validación de UUIDs
- Prevención de inyección SQL mediante TypeORM

## Variables de Entorno
```env
PORT=3100
USERNAME_DATABASE=
PASSWORD_DATABASE=
DATABASE=
PORT_DATABASE=
HOST_DATABASE=
JWT_SEED=
JWT_EXPIRE_IN=3h
```

## Configuración del Proyecto

### Instalación
```bash
npm install
```

### Ejecución en Desarrollo
```bash
npm run dev
```

### Construcción para Producción
```bash
npm run build
```

### Ejecución en Producción
```bash
npm start
```

## Características Adicionales

### Error Handling
- Sistema centralizado de manejo de errores
- Errores personalizados con códigos HTTP apropiados
- Logging de errores para debugging

### Validación y Sanitización
- Validación robusta de datos de entrada
- Sanitización de inputs para prevenir XSS
- Validación de tipos con TypeScript

### Base de Datos
- Migraciones automáticas con TypeORM
- Relaciones entre entidades
- Índices optimizados

## Mejores Prácticas Implementadas
1. Arquitectura en capas
2. Principios SOLID
3. Manejo seguro de contraseñas
4. Validación completa de datos
5. Control de acceso basado en roles
6. Logging y monitoreo
7. Clean Code y estándares de TypeScript
