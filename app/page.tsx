import Link from "next/link";
import styles from "./page.module.css";

const Home = () => {
  return (
    <main className={styles.inicio}>
      <section className={styles.portada} aria-labelledby="titulo-inicio">
        <div>
          <p className={styles.etiqueta}>Desarrollo y tecnología</p>
          <h1 id="titulo-inicio">Tu próximo paso empieza con algo nuevo.</h1>
          <p className={styles.descripcion}>
            Explorá cursos de programación, bases de datos y diseño web.
            Encontrá un tema que te interese y conocé qué podés aprender.
          </p>
          <Link href="/cursos" className={styles.boton}>
            Explorar cursos <span aria-hidden="true">→</span>
          </Link>
        </div>
        <aside className={styles.guia} aria-labelledby="titulo-guia">
          <p className={styles.etiqueta}>Una idea para empezar</p>
          <h2 id="titulo-guia">Seguí tu curiosidad.</h2>
          <ol className={styles.pasos}>
            <li>Explorá los temas del catálogo.</li>
            <li>Elegí el curso que te llame la atención.</li>
            <li>Revisá su descripción y precio en el detalle.</li>
          </ol>
        </aside>
      </section>
      <p className={styles.nota}>
        Catálogo de ejemplo para la práctica de Next.js de Desarrollo de Software IV.
      </p>
    </main>
  );
};

export default Home;
