# ElDicho - Dichos y Refranes de Colombia

Plataforma social y cultural para preservar y difundir los dichos y refranes tradicionales de Colombia, organizados por regiones y departamentos.

## Stack Tecnologico

- **Frontend:** Next.js 16 + React 19 + TypeScript
- **Estilos:** Tailwind CSS 4
- **Base de datos:** SQLite via libSQL
- **ORM:** Prisma 7 con adapter libSQL
- **Mapa:** SVG interactivo de Colombia con 33 departamentos

## Comenzar

```bash
# Instalar dependencias
npm install

# Generar el cliente Prisma
npx prisma generate

# Crear la base de datos y aplicar migraciones
npx prisma migrate deploy

# Sembrar datos de ejemplo
npm run db:seed

# Iniciar el servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

**Nota:** El proyecto requiere un archivo `.env` en la raíz con:
```env
DATABASE_URL="file:./prisma/dev.db"
```

## Funcionalidades

- Mapa interactivo de Colombia con hover y click por departamento
- Feed de dichos estilo red social con likes, comentarios y compartir
- Filtrado por departamento via el mapa
- Crear nuevos dichos asociados a departamentos
- Publicacion anonima opcional
- Diseno responsive y moderno con identidad cultural colombiana

## Estructura del Proyecto

```
src/
  app/
    api/            # Rutas API REST
      departamentos/
      dichos/
        [id]/like/
        [id]/comment/
        [id]/share/
    page.tsx        # Pagina principal
    layout.tsx      # Layout global
    globals.css     # Estilos globales
  components/
    ColombiaMap.tsx  # Mapa SVG interactivo
    DichoCard.tsx    # Card tipo post social
    DichoFeed.tsx    # Feed de dichos
    CreateDichoModal.tsx
    Header.tsx
  lib/
    prisma.ts       # Cliente Prisma singleton
    types.ts        # Tipos TypeScript
    departamentos.ts # Data de departamentos
prisma/
  schema.prisma     # Esquema de base de datos
  migrations/       # Migraciones SQL
scripts/
  create-db.mjs     # [Deprecado] Crear tablas - usar Prisma migrate
  seed.mjs          # [Deprecado] Seed data - incompatible con Windows
  seed-sqlite.ts    # Script de seed compatible con todas las plataformas
```

## Modelo de Datos

- **User** - Usuarios de la plataforma
- **Departamento** - 33 departamentos de Colombia con codigo y region
- **Dicho** - Dichos/refranes con texto, significado, autor, departamento
- **Like** - Likes de usuarios a dichos
- **Comment** - Comentarios en dichos
- **Share** - Compartidos/republicaciones
