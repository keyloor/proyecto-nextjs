# Catálogo de cursos con Next.js

Proyecto e Investigación #2 de IF0009 Desarrollo de Software IV, Universidad de Costa Rica.

Aplicación sencilla hecha con Next.js para aprender lo básico del framework: estructura de carpetas,
componentes, páginas, rutas, rutas dinámicas, el componente `Link`, parámetros en la URL y
reutilización de componentes. Muestra un catálogo de cursos y el detalle de cada uno.

## Integrantes

- Keylor Barrantes
- Sebastián Marín Fernández
- Juan Pablo Jiménez Vargas

## Requisitos

- [Node.js](https://nodejs.org/) 20.9 o superior. Para revisar la versión: `node --version`
- Git
- Un editor de código, por ejemplo Visual Studio Code

## Dependencias

El proyecto usa solo lo que instala `create-next-app`, sin paquetes adicionales:

- Next.js 16.4.5
- React y React DOM 19.3.0
- TypeScript 5
- ESLint 9

Todas se instalan con `npm install`.

## Cómo ejecutarlo

```bash
git clone https://github.com/keyloor/proyecto-nextjs.git
cd proyecto-nextjs
npm install
npm run dev
```

Después abrir <http://localhost:3000> en el navegador.

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run build` | Genera la versión de producción y revisa los tipos |
| `npm run lint` | Revisa el código con ESLint |

## Páginas

| Ruta | Qué muestra |
|---|---|
| `/` | Página principal |
| `/cursos` | Listado de los cursos |
| `/cursos/[id]` | Detalle de un curso, por ejemplo `/cursos/1` |
| Cualquier otra | Página 404 |

## Estructura

```
app/
├── cursos/
│   ├── [id]/page.tsx      Detalle del curso (ruta dinámica)
│   └── page.tsx           Listado de cursos
├── globals.css            Estilos globales y colores
├── layout.tsx             Estructura común con el menú
├── not-found.tsx          Página 404
└── page.tsx               Página principal
components/
├── CursoCard.tsx          Tarjeta de un curso
└── NavBar.tsx             Menú de navegación
data/cursos.ts             Datos de los cursos
types/Curso.ts             Tipo Curso
public/images/cursos/      Imágenes de los cursos
```

## Material de la práctica guiada

Los pasos de la práctica están en [PRACTICA.md](PRACTICA.md).

## Créditos de las imágenes

Imágenes de [Unsplash](https://unsplash.com), con la licencia de Unsplash:

| Imagen | Autor | Enlace |
|---|---|---|
| `react.jpg` | Juanjo Jaramillo | https://unsplash.com/photos/mZnx9429i94 |
| `typescript.jpg` | Gabriel Heinzer | https://unsplash.com/photos/g5jpH62pwes |
| `bases-de-datos.jpg` | Taylor Vick | https://unsplash.com/photos/M5tzZtFCOfs |
| `diseno-web.jpg` | Domenico Loia | https://unsplash.com/photos/hGV2TfOh0ns |