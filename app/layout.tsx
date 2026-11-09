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
