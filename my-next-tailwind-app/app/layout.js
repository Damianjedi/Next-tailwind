import "./globals.css";

export const metadata = {
  title: "To-Do List App",
  description: "Aplikacja do zarządzania zadaniami w Next.js i Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
