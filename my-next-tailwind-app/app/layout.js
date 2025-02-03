import { ProjectProvider } from "@/app/context/ProjectContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProjectProvider>{children}</ProjectProvider>
      </body>
    </html>
  );
}
