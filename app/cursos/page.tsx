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