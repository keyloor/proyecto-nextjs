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
