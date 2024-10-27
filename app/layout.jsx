import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Search } from "@/components/search";
import EditProvider from "@/components/posters/albums/edit-context";

const noto = Noto_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Swatch Frame",
  description:
    "Create custom posters with color palettes from your favorite albums, movies, or TV shows",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="nord">
      <body className={`${noto.className} flex flex-col min-h-screen`}>
        <Header />
        <Search />
        <EditProvider>{children}</EditProvider>
        <Footer />
      </body>
    </html>
  );
}
