# PCB PCA Frontend Test

## Descripción
Este es un proyecto frontend moderno desarrollado con React y TypeScript, utilizando Vite como bundler. El proyecto sigue una arquitectura limpia y modular, organizada en capas (presentación, aplicación, dominio e infraestructura).

### Características Principales
- Framework: React 18 con TypeScript
- Estilizado: TailwindCSS para estilos
- Gestión de estado: Zustand
- Formularios: React Hook Form con validación Zod
- Enrutamiento: React Router DOM
- UI Components: Lucide React para iconos
- Herramientas de desarrollo: ESLint, Prettier, y configuración completa de TypeScript

## Estructura del Proyecto
```
├── src/
│   ├── application/     # Lógica de aplicación y casos de uso
│   ├── domain/         # Entidades y reglas de negocio
│   ├── infrastructure/ # Implementaciones de servicios externos
│   ├── presentation/   # Componentes y páginas de la UI
│   ├── shared/         # Utilidades y componentes compartidos
│   ├── App.tsx         # Componente principal de la aplicación
│   └── main.tsx        # Punto de entrada de la aplicación
├── public/             # Archivos estáticos
├── index.html          # Template HTML
├── package.json        # Dependencias y scripts
├── tsconfig.json       # Configuración de TypeScript
├── vite.config.ts      # Configuración de Vite
├── tailwind.config.js  # Configuración de TailwindCSS
└── postcss.config.js   # Configuración de PostCSS
```

## Requisitos Previos
- Node.js (versión recomendada: 18.x o superior)
- Yarn (versión 1.22.x o superior)

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd pcb-pca-front-test
```

2. Instalar dependencias:
```bash
yarn install
```

## Scripts Disponibles

- `yarn dev`: Inicia el servidor de desarrollo
- `yarn build`: Construye la aplicación para producción
- `yarn preview`: Previsualiza la versión de producción localmente
- `yarn lint`: Ejecuta el linter para verificar el código

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`

## Construcción para Producción

Para construir la aplicación para producción:

```bash
yarn build
```

Los archivos de producción se generarán en el directorio `dist/`

## Convenciones de Código

- Utilizamos ESLint y Prettier para mantener la consistencia del código
- Seguimos las mejores prácticas de TypeScript
- Implementamos Clean Architecture para una mejor organización del código
- Utilizamos TailwindCSS para los estilos

## Estructura de Carpetas

### application/
Contiene la lógica de aplicación, casos de uso y servicios de aplicación.

### domain/
Define las entidades principales y las reglas de negocio del dominio.

### infrastructure/
Implementa servicios externos, APIs y configuraciones de infraestructura.

### presentation/
Contiene los componentes de UI, páginas y la lógica de presentación.

### shared/
Almacena utilidades, hooks personalizados y componentes compartidos. 