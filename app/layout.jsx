import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Swatch Frame",
  description:
    "Create custom posters with color palettes from your favorite albums, movies, or TV shows",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="nord">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
