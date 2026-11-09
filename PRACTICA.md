# Práctica guiada: catálogo de cursos con Next.js

Repositorio: <https://github.com/keyloor/proyecto-nextjs>

Cada persona construye en su computadora un catálogo con un menú, un listado y una página de detalle por curso.
Son 8 archivos cortos. Es una versión más simple que el proyecto del repositorio.

## Antes de clase

1. Tener un editor, por ejemplo [Visual Studio Code](https://code.visualstudio.com), y Node.js 20.9 o superior.
   Se revisa con `node --version`. Si falta, instalar la versión LTS desde <https://nodejs.org>.
2. En la carpeta donde se quiera guardar, crear el proyecto. Tarda unos minutos:

   ```bash
   npx create-next-app@16.4.5 proyecto-nextjs --ts --eslint --app --no-tailwind --no-react-compiler --no-cache-components --no-src-dir --no-agents-md --no-agent-feedback --import-alias "@/*" --use-npm
   ```

3. Entrar y encenderlo. En <http://localhost:3000> tiene que verse la página de ejemplo de Next.js:

   ```bash
   cd proyecto-nextjs
   npm run dev
   ```

En Windows, si PowerShell dice que `npm.ps1` no está firmado digitalmente, escribir `npm.cmd` y `npx.cmd`.
Si el comando hace preguntas, responder Yes a TypeScript y App Router, ESLint como linter y No a todo lo demás.
Los avisos de paquetes al instalar son normales. No correr `npm audit fix --force`.

## Parte 1. Menú compartido

**Paso 1.** Abrir `app/globals.css`, borrar todo y pegar los estilos de toda la práctica.

**Archivo:** `app/globals.css`

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Arial, sans-serif; background: #f8f9fc; color: #192436; }
a { color: #175ac7; font-weight: 700; text-decoration: none; }
nav { display: flex; gap: 24px; padding: 16px 24px;
  background: #ffffff; border-bottom: 1px solid #dce1e9; }
main { max-width: 900px; margin: 0 auto; padding: 32px 16px; }
h1 { margin-bottom: 16px; }
.lista { display: grid; gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
.tarjeta { display: flex; flex-direction: column; gap: 8px;
  padding: 16px; background: #ffffff;
  border: 1px solid #dce1e9; border-radius: 8px; }
```

**Paso 2.** Crear la carpeta `components` en la raíz y, dentro, el menú. `Link` cambia de página sin recargar el sitio.

**Archivo:** `components/NavBar.tsx`

```tsx
import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
      <Link href="/">Inicio</Link>
      <Link href="/cursos">Cursos</Link>
    </nav>
  );
};

export default NavBar;
```

**Paso 3.** Abrir `app/layout.tsx`, borrar todo y pegar esto. El layout envuelve todas las páginas, así que el menú se
escribe una sola vez. `children` es el contenido de cada página.

**Archivo:** `app/layout.tsx`

```tsx
import type { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import "./globals.css";

const RootLayout = ({ children }: { children: ReactNode }) => {
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

**Paso 4.** Abrir `app/page.tsx`, borrar todo y pegar esto. Es la página de la ruta `/`.

**Archivo:** `app/page.tsx`

```tsx
const Home = () => {
  return (
    <main>
      <h1>Catálogo de cursos</h1>
      <p>Práctica de Next.js</p>
    </main>
  );
};

export default Home;
```

**Resultado:** en <http://localhost:3000> se ve el menú y el título. El enlace Cursos todavía da 404.

## Parte 2. Listado

**Paso 5.** Crear la carpeta `data` y este archivo. La interfaz dice qué datos tiene un curso.

**Archivo:** `data/cursos.ts`

```ts
export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

export const cursos: Curso[] = [
  { id: 1, nombre: "React", precio: 25000,
    descripcion: "Componentes y props." },
  { id: 2, nombre: "TypeScript", precio: 20000,
    descripcion: "Tipos e interfaces." },
  { id: 3, nombre: "Bases de datos", precio: 30000,
    descripcion: "Tablas y consultas SQL." },
];
```

**Paso 6.** En `components`, crear la tarjeta. Es un componente que recibe un curso por props y se reutiliza.

**Archivo:** `components/CursoCard.tsx`

```tsx
import Link from "next/link";
import type { Curso } from "@/data/cursos";

const CursoCard = ({ curso }: { curso: Curso }) => {
  return (
    <article className="tarjeta">
      <h2>{curso.nombre}</h2>
      <p>₡{curso.precio}</p>
      <Link href={`/cursos/${curso.id}`}>Ver detalle</Link>
    </article>
  );
};

export default CursoCard;
```

**Paso 7.** Dentro de `app`, crear la carpeta `cursos` y este archivo. Por estar ahí, Next.js crea la ruta `/cursos`.
`map` devuelve una tarjeta por cada curso.

**Archivo:** `app/cursos/page.tsx`

```tsx
import CursoCard from "@/components/CursoCard";
import { cursos } from "@/data/cursos";

const CursosPage = () => {
  return (
    <main>
      <h1>Cursos</h1>
      <div className="lista">
        {cursos.map((curso) => (
          <CursoCard key={curso.id} curso={curso} />
        ))}
      </div>
    </main>
  );
};

export default CursosPage;
```

**Resultado:** el enlace Cursos muestra tres tarjetas. Ver detalle todavía da 404.

## Parte 3. Detalle con ruta dinámica

**Paso 8.** Dentro de `app/cursos`, crear una carpeta llamada `[id]`, con los corchetes, y dentro este archivo. Esa carpeta
atiende `/cursos/1`, `/cursos/2` y cualquier otro valor. `params` es una promesa, por eso se usa `await`. El valor llega
como texto, por eso se compara con `Number(id)`.

**Archivo:** `app/cursos/[id]/page.tsx`

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { cursos } from "@/data/cursos";

interface Props {
  params: Promise<{ id: string }>;
}

const DetallePage = async ({ params }: Props) => {
  const { id } = await params;
  const curso = cursos.find((item) => item.id === Number(id));

  if (!curso) {
    notFound();
  }

  return (
    <main>
      <h1>{curso.nombre}</h1>
      <p>{curso.descripcion}</p>
      <p>₡{curso.precio}</p>
      <Link href="/cursos">Volver al listado</Link>
    </main>
  );
};

export default DetallePage;
```

## Comprobar

| Dirección | Qué tiene que verse |
|---|---|
| `/` | Menú y título |
| `/cursos` | Tres tarjetas |
| `/cursos/1` | Detalle de React |
| `/cursos/99` | Página 404 |

Dejar el proyecto abierto y funcionando, porque el resultado de cada persona se revisa al final.

## Si algo falla

| Qué se ve | Qué hacer |
|---|---|
| `npm.ps1` no está firmado | Usar `npm.cmd` y `npx.cmd`, o la terminal cmd |
| `/cursos` da 404 | Revisar que el archivo sea `app/cursos/page.tsx` |
| `Module not found` con `@/...` | Revisar el nombre y la carpeta del archivo |
| El detalle siempre da 404 | Revisar que la carpeta se llame `[id]`, con corchetes |
| Los cambios no aparecen | Guardar el archivo. Si sigue igual, Ctrl + C y `npm run dev` otra vez |

Si no se logra terminar, el proyecto completo se puede clonar con
`git clone https://github.com/keyloor/proyecto-nextjs.git`, y después `npm install` y `npm run dev`.
