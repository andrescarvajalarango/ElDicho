import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ElDicho - Dichos y Refranes de Colombia",
  description:
    "Descubre, comparte y preserva los dichos y refranes tradicionales de Colombia organizados por regiones y departamentos.",
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
