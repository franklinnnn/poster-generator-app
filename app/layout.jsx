import "./globals.css";
import { Noto_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Search } from "@/components/search";
import { Footer } from "@/components/footer";
import EditProvider from "@/components/posters/albums/edit-context";

const noto = Noto_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Swatch Frame",
  description:
    "Create custom posters with color palettes from your favorite albums",
  keywords: "album posters, custom posters, color palettes, music art, design",
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  openGraph: {
    title: "Swatch Frame",
    description:
      "Create custom posters with color palettes from your favorite albums.",
    url: "https://yourwebsite.com", // Update with your actual URL
    images: [
      {
        url: "https://yourwebsite.com/path/to/image.jpg", // Update with your image URL
        width: 800,
        height: 600,
        alt: "Swatch Frame Poster Example",
      },
    ],
    type: "website",
    siteName: "Swatch Frame",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swatch Frame",
    description:
      "Create custom posters with color palettes from your favorite albums.",
    image: "https://yourwebsite.com/path/to/image.jpg", // Update with your image URL
  },
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
