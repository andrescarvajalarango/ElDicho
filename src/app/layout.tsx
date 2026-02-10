import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MejorDicho! - Cultura Popular de Colombia",
  description:
    "Descubre, comparte y preserva la cultura colombiana: dichos, recetas, juegos tipicos y tradiciones de los 33 departamentos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
