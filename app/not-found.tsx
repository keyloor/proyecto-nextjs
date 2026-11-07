import Link from "next/link";
import styles from "./not-found.module.css";

const NotFound = () => {
  return (
    <main className={styles.contenedor}>
      <p className={styles.codigo}>404</p>
      <h1 className={styles.titulo}>Página no encontrada</h1>
      <p className={styles.mensaje}>
        El curso o la página que buscás no existe en el catálogo.
      </p>
      <Link href="/cursos" className={styles.boton}>
        Ver todos los cursos
      </Link>
    </main>
  );
};

export default NotFound;
