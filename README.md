# Mate Tracker - Next.js + Supabase

Una aplicación para organizar quién trae qué para el mate, migrada de PHP a Next.js con Supabase como base de datos.

## 🚀 Características

- **Frontend moderno**: Next.js 14 con App Router
- **Base de datos**: Supabase (PostgreSQL)
- **Estilos**: Tailwind CSS
- **TypeScript**: Tipado completo
- **Responsive**: Funciona en móviles y desktop
- **Deploy**: Listo para Vercel

## 📋 Funcionalidades

- ✅ Formulario para que cada persona seleccione su nombre y qué va a llevar
- ✅ Lista diaria de quién lleva qué
- ✅ Ranking de puntos acumulados
- ✅ Prevención de duplicados (mismo item por la misma persona en el mismo día)
- ✅ Interface moderna y responsive
- ✅ Estados de carga y manejo de errores

## 🛠️ Setup del Proyecto

### 1. Clonar y configurar

```bash
cd mate-tracker-nextjs
npm install
```

### 2. Configurar Supabase

1. Ve a [Supabase](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a Settings > API para obtener tus credenciales
4. Copia las credenciales al archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_proyecto_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### 3. Configurar la base de datos

1. Ve al editor SQL de Supabase (SQL Editor en el dashboard)
2. Ejecuta el contenido del archivo `sql/setup.sql`
3. Esto creará las tablas y configuraciones necesarias

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📊 Estructura de la Base de Datos

### Tabla `users`

- `id`: Primary key
- `nombre`: Nombre del usuario (único)
- `puntos`: Puntos acumulados
- `created_at`, `updated_at`: Timestamps

### Tabla `mate_entries`

- `id`: Primary key
- `nombre`: Nombre del usuario
- `item`: Item que va a llevar (Mate, Yerba, Termo, Comida)
- `fecha`: Fecha de la entrada (por defecto hoy)
- `created_at`: Timestamp

## 🌐 Deploy en Vercel

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno en Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy automático en cada push

## 🔄 Migración desde PHP

Los datos originales estaban en `data.json` con esta estructura:

```json
{
  "listaDiaria": {
    "Facundo": ["Mate", "Yerba"],
    "Ana": ["Termo"]
  },
  "ranking": {
    "Facundo": 2,
    "Mateo": 0,
    "Ana": 1,
    "Axel": 0
  }
}
```

La nueva estructura en Supabase normaliza estos datos en dos tablas relacionales.

## 🎨 Componentes

- **MateForm**: Formulario principal para seleccionar nombre e item
- **ListaDiariaComponent**: Muestra la lista del día actual
- **RankingComponent**: Muestra el ranking de puntos con medallas
- **API Routes**: `/api/mate` para GET y POST

## 🔐 Seguridad

- RLS (Row Level Security) habilitado en Supabase
- Políticas de acceso público configuradas
- Validación de datos en el servidor
- Prevención de duplicados

## 🐛 Troubleshooting

### Error de conexión a Supabase

- Verifica que las variables de entorno estén correctas
- Asegúrate de que el proyecto de Supabase esté activo

### Error en las tablas

- Ejecuta nuevamente el script `sql/setup.sql`
- Verifica que las políticas RLS estén configuradas

### Error de build

- Ejecuta `npm run build` para verificar errores
- Revisa que todos los tipos TypeScript sean correctos

## 📱 Próximas mejoras

- [ ] Autenticación de usuarios
- [ ] Historial de días anteriores
- [ ] Notificaciones push
- [ ] Modo dark
- [ ] Exportar estadísticas
- [ ] Agregar más tipos de items

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
