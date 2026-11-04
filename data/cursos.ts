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