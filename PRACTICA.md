# Práctica guiada: catálogo de cursos con Next.js

Material de la práctica de 30 minutos del Proyecto e Investigación #2 de IF0009.

Repositorio: <https://github.com/keyloor/proyecto-nextjs>

En esta práctica cada persona construye en su computadora un catálogo de cursos con un menú, un listado
y una página de detalle por curso. Es una versión más corta que el proyecto del repositorio: la portada es más
sencilla y no incluye la página 404 propia.

## Antes de clase

Hacer esto antes de llegar, porque ocupa internet y no hay tiempo para instalar durante la práctica.

### 1. Revisar Node.js

Abrir una terminal y escribir:

```bash
node --version
```

Tiene que salir la versión 20.9 o una superior. Si no sale o es anterior, instalar la versión LTS desde
<https://nodejs.org> y abrir la terminal de nuevo. También hace falta un editor, por ejemplo
[Visual Studio Code](https://code.visualstudio.com).

**En Windows:** si PowerShell dice que `npm.ps1` «no está firmado digitalmente», escribir `npm.cmd` y `npx.cmd`
en lugar de `npm` y `npx`, o usar la terminal Símbolo del sistema (cmd). No hace falta cambiar la configuración de la
computadora.

### 2. Crear el proyecto

En la carpeta donde se quiera guardar, por ejemplo Documentos, ejecutar este comando completo. Deja todas
las opciones elegidas y tarda unos minutos:

```bash
npx create-next-app@16.4.5 proyecto-nextjs --ts --eslint --app --no-tailwind --no-react-compiler --no-cache-components --no-src-dir --no-agents-md --no-agent-feedback --import-alias "@/*" --use-npm
```

Es normal que al final salgan avisos de paquetes obsoletos o vulnerabilidades moderadas. **No ejecutar
`npm audit fix --force`**, porque cambia las versiones del proyecto.

Si el comando hace preguntas, contestar así. Las tres en negrita son las más fáciles de contestar mal:

| Pregunta | Respuesta |
|---|---|
| Use the recommended Next.js defaults? | No, customize settings |
| TypeScript | Yes |
| Linter | ESLint |
| React Compiler | No |
| Tailwind CSS | No |
| Code inside a `src/` directory | No |
| App Router | Yes |
| **Cache Components** | **No** |
| Customize the import alias | No |
| **Include `AGENTS.md`** | **No** |
| **Help improve Next.js by letting agents prepare anonymized feedback** | **No** |

Si alguna respuesta quedó mal, lo más rápido es crear el proyecto otra vez en otra carpeta.

### 3. Comprobar que corre

```bash
cd proyecto-nextjs
npm run dev
```

Abrir <http://localhost:3000>. Tiene que verse la página de ejemplo de Next.js. Si está ocupado ese puerto,
la terminal indica otro, por ejemplo 3001. Abrir la carpeta `proyecto-nextjs` en el editor.

## Durante la práctica

Los 20 minutos se dividen en tres partes. Después de cada paso, el grupo espera a que todos lo terminen. Se
trabaja en la raíz del proyecto y el servidor de `npm run dev` se deja encendido.

| Parte | Tiempo | Qué se hace |
|---|---|---|
| 1 | 7 min | Menú compartido |
| 2 | 7 min | Datos, tarjetas y listado |
| 3 | 6 min | Detalle con ruta dinámica |

### Parte 1. Menú compartido

**Paso 1.** Abrir `app/globals.css`, borrar todo y pegar esto. Define los colores y los estilos generales.

**Archivo:** `app/globals.css`

```css
:root {
  color-scheme: light;
  --color-fondo: #f8f9fc;
  --color-superficie: #ffffff;
  --color-texto: #192436;
  --color-secundario: #536071;
  --color-primario: #175ac7;
  --color-primario-hover: #10449b;
  --color-borde: #dce1e9;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  background: var(--color-fondo);
  color: var(--color-texto);
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

a:focus-visible {
  outline: 3px solid var(--color-primario);
  outline-offset: 4px;
}

img {
  display: block;
  max-width: 100%;
}
```

**Paso 2.** Crear la carpeta `components` en la raíz y, dentro de ella, este archivo con los estilos del menú.

**Archivo:** `components/NavBar.module.css`

```css
.encabezado {
  border-bottom: 1px solid var(--color-borde);
  background: var(--color-superficie);
}

.navegacion {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px 24px;
}

.marca {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.05em;
}

.marca span { color: var(--color-primario); }

.enlaces {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
}

.enlaces a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 600;
}

.enlaces a:hover {
  background: var(--color-fondo);
  color: var(--color-primario);
}
```

**Paso 3.** En la misma carpeta, crear el componente del menú. `Link` cambia de página sin recargar todo el sitio.

**Archivo:** `components/NavBar.tsx`

```tsx
import Link from "next/link";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles.encabezado}>
      <nav className={styles.navegacion} aria-label="Navegación principal">
        <Link href="/" className={styles.marca}>
          Cursos<span aria-hidden="true">.</span>
        </Link>
        <ul className={styles.enlaces}>
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/cursos">Cursos</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
```

**Paso 4.** Abrir `app/layout.tsx`, borrar todo y pegar esto. El layout envuelve todas las páginas, así que el
menú se escribe una sola vez. `children` es el contenido de cada página.

**Archivo:** `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catálogo de cursos",
  description: "Explorá cursos de programación, bases de datos y diseño web.",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="es-CR">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
```

**Paso 5.** Abrir `app/page.tsx`, borrar todo y pegar esto. Es la página de la ruta `/`.

**Archivo:** `app/page.tsx`

```tsx
import Link from "next/link";

const Home = () => {
  return (
    <main style={{ padding: "48px 16px", textAlign: "center" }}>
      <h1>Catálogo de cursos</h1>
      <p>Práctica de Next.js de Desarrollo de Software IV.</p>
      <Link href="/cursos" style={{ color: "var(--color-primario)", fontWeight: 700 }}>
        Ver cursos
      </Link>
    </main>
  );
};

export default Home;
```

**Resultado esperado:** en <http://localhost:3000> se ve el menú arriba, el título y el enlace Ver cursos.
Ese enlace todavía da error 404, porque la página se crea en la parte 2.

### Parte 2. Datos, tarjetas y listado

**Paso 6.** Crear la carpeta `types` y este archivo. La interfaz dice qué datos tiene un curso.

**Archivo:** `types/Curso.ts`

```ts
export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
}
```

**Paso 7.** Crear la carpeta `data` y este archivo con los cuatro cursos.

**Archivo:** `data/cursos.ts`

```ts
import { Curso } from "@/types/Curso";

export const cursos: Curso[] = [
  {
    id: 1,
    nombre: "React desde cero",
    descripcion: "Componentes, props y estado para construir interfaces web.",
    imagen: "/images/cursos/react.jpg",
    precio: 25000,
  },
  {
    id: 2,
    nombre: "TypeScript práctico",
    descripcion: "Tipos, interfaces y buenas prácticas para JavaScript más seguro.",
    imagen: "/images/cursos/typescript.jpg",
    precio: 20000,
  },
  {
    id: 3,
    nombre: "Bases de datos",
    descripcion: "Modelado, consultas SQL y diseño de tablas relacionales.",
    imagen: "/images/cursos/bases-de-datos.jpg",
    precio: 30000,
  },
  {
    id: 4,
    nombre: "Diseño web",
    descripcion: "HTML, CSS, Flexbox y Grid para sitios responsivos.",
    imagen: "/images/cursos/diseno-web.jpg",
    precio: 18000,
  },
];
```

**Paso 8.** Abrir una segunda terminal en la raíz del proyecto y descargar las imágenes con este comando. Crea
la carpeta `public/images/cursos`, y lo que está en `public` se sirve desde la raíz del sitio. En macOS o Linux,
escribir `curl` en lugar de `curl.exe`.

```bash
curl.exe --create-dirs -o public/images/cursos/react.jpg https://raw.githubusercontent.com/keyloor/proyecto-nextjs/develop/public/images/cursos/react.jpg -o public/images/cursos/typescript.jpg https://raw.githubusercontent.com/keyloor/proyecto-nextjs/develop/public/images/cursos/typescript.jpg -o public/images/cursos/bases-de-datos.jpg https://raw.githubusercontent.com/keyloor/proyecto-nextjs/develop/public/images/cursos/bases-de-datos.jpg -o public/images/cursos/diseno-web.jpg https://raw.githubusercontent.com/keyloor/proyecto-nextjs/develop/public/images/cursos/diseno-web.jpg
```

Si el comando falla, descargar las cuatro imágenes desde
[la carpeta del repositorio](https://github.com/keyloor/proyecto-nextjs/tree/develop/public/images/cursos)
y guardarlas en `public/images/cursos` con esos mismos nombres.

**Paso 9.** En `components`, crear los estilos de la tarjeta.

**Archivo:** `components/CursoCard.module.css`

```css
.tarjeta {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  color: #171717;
}

.imagen {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.contenido {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  flex-grow: 1;
}

.nombre {
  font-size: 1.2rem;
}

.descripcion {
  color: #555;
  flex-grow: 1;
}

.precio {
  font-weight: bold;
}

.boton {
  align-self: flex-start;
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #0070f3;
  color: #fff;
  text-decoration: none;
}
```

**Paso 10.** En `components`, crear la tarjeta. Es un componente que recibe un curso por props y se reutiliza
para los cuatro.

**Archivo:** `components/CursoCard.tsx`

```tsx
import Image from "next/image";
import Link from "next/link";
import { Curso } from "@/types/Curso";
import styles from "./CursoCard.module.css";

interface CursoCardProps {
  curso: Curso;
}

const CursoCard = ({ curso }: CursoCardProps) => {
  return (
    <article className={styles.tarjeta}>
      <Image
        src={curso.imagen}
        alt={curso.nombre}
        width={400}
        height={250}
        className={styles.imagen}
      />
      <div className={styles.contenido}>
        <h2 className={styles.nombre}>{curso.nombre}</h2>
        <p className={styles.descripcion}>{curso.descripcion}</p>
        <p className={styles.precio}>₡{curso.precio.toLocaleString("es-CR")}</p>
        <Link href={`/cursos/${curso.id}`} className={styles.boton}>
          Ver detalle
        </Link>
      </div>
    </article>
  );
};

export default CursoCard;
```

**Paso 11.** Dentro de `app`, crear la carpeta `cursos` y estos estilos.

**Archivo:** `app/cursos/page.module.css`

```css
.contenedor {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 16px;
}

.titulo {
  margin-bottom: 24px;
}

.lista {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}
```

**Paso 12.** En `app/cursos`, crear la página. Como el archivo está en esa carpeta, Next.js crea la ruta `/cursos`
sin más configuración. `map` devuelve una tarjeta por cada curso.

**Archivo:** `app/cursos/page.tsx`

```tsx
import CursoCard from "@/components/CursoCard";
import { cursos } from "@/data/cursos";
import styles from "./page.module.css";

const CursosPage = () => {
  return (
    <main className={styles.contenedor}>
      <h1 className={styles.titulo}>Cursos</h1>
      <div className={styles.lista}>
        {cursos.map((curso) => (
          <CursoCard key={curso.id} curso={curso} />
        ))}
      </div>
    </main>
  );
};

export default CursosPage;
```

**Resultado esperado:** el enlace Cursos del menú muestra cuatro tarjetas con imagen, nombre, descripción, precio y
Ver detalle. Ese botón todavía da error 404, porque la ruta se crea en la parte 3.

### Parte 3. Detalle con ruta dinámica

**Paso 13.** Dentro de `app/cursos`, crear una carpeta llamada `[id]`, con los corchetes incluidos, y dentro de ella
estos estilos.

**Archivo:** `app/cursos/[id]/page.module.css`

```css
.contenedor {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px;
}

.volver {
  display: inline-block;
  margin-bottom: 24px;
  color: var(--color-primario);
  font-weight: 700;
}

.volver:hover {
  color: var(--color-primario-hover);
}

.detalle {
  border: 1px solid var(--color-borde);
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-superficie);
}

.imagen {
  width: 100%;
  height: 320px;
  object-fit: cover;
}

.contenido {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
}

.nombre {
  font-size: 2rem;
  line-height: 1.2;
}

.descripcion {
  color: var(--color-secundario);
  font-size: 1.1rem;
}

.precio {
  font-size: 1.4rem;
  font-weight: 700;
}
```

**Paso 14.** En `app/cursos/[id]`, crear la página del detalle.

**Archivo:** `app/cursos/[id]/page.tsx`

```tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cursos } from "@/data/cursos";
import styles from "./page.module.css";

interface DetallePageProps {
  params: Promise<{ id: string }>;
}

const DetallePage = async ({ params }: DetallePageProps) => {
  const { id } = await params;
  const curso = cursos.find((item) => item.id === Number(id));

  if (!curso) {
    notFound();
  }

  return (
    <main className={styles.contenedor}>
      <Link href="/cursos" className={styles.volver}>
        ← Volver al listado
      </Link>
      <article className={styles.detalle}>
        <Image
          src={curso.imagen}
          alt={curso.nombre}
          width={800}
          height={500}
          className={styles.imagen}
        />
        <div className={styles.contenido}>
          <h1 className={styles.nombre}>{curso.nombre}</h1>
          <p className={styles.descripcion}>{curso.descripcion}</p>
          <p className={styles.precio}>₡{curso.precio.toLocaleString("es-CR")}</p>
        </div>
      </article>
    </main>
  );
};

export default DetallePage;
```

La carpeta `[id]` atiende `/cursos/1`, `/cursos/2` y cualquier otro valor con un solo archivo. En esta versión
`params` es una promesa, por eso la página lleva `async` y `await`. El valor de la URL llega como texto y por eso se
compara con `Number(id)`. Si el curso no existe, `notFound()` muestra la página 404.

**Resultado esperado:** Ver detalle abre el curso con su imagen y precio, y Volver al listado regresa a las tarjetas.

## Cierre: comprobar el resultado

| Dirección | Qué tiene que verse |
|---|---|
| `/` | Menú, título y enlace Ver cursos |
| `/cursos` | Cuatro tarjetas |
| `/cursos/1` | Detalle de React desde cero |
| `/cursos/99` | Página 404 |

Dejar el proyecto abierto y funcionando, porque el resultado de cada persona se revisa al final.

## Si algo falla

| Qué se ve | Qué hacer |
|---|---|
| `npm.ps1` no está firmado digitalmente | Usar `npm.cmd` y `npx.cmd`, o la terminal cmd |
| `/cursos` da 404 | Revisar que el archivo sea exactamente `app/cursos/page.tsx` |
| `Module not found` con `@/...` | Revisar el nombre y la carpeta del archivo, que estén en la raíz del proyecto |
| Una imagen no carga o da error | Revisar que esté en `public/images/cursos` con el nombre exacto |
| El detalle da error con `params` | Revisar que la página tenga `async` y `await params` |
| El detalle siempre da 404 | Revisar que la carpeta se llame `[id]` y que se use `Number(id)` |
| Los cambios no aparecen | Guardar el archivo. Si sigue igual, detener con Ctrl + C y correr `npm run dev` otra vez |

Si no se logra terminar, el proyecto completo se puede clonar y ejecutar:

```bash
git clone https://github.com/keyloor/proyecto-nextjs.git proyecto-completo
cd proyecto-completo
npm install
npm run dev
```
