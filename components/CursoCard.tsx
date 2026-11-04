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