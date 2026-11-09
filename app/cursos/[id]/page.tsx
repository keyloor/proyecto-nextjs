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
