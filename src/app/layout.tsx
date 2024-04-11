import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "./Providers";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "High",
  description: "High, eleve o seu elo!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <NextTopLoader
          color="#00FF8F"
          crawl
          crawlSpeed={200}
          easing="ease"
          height={3}
          initialPosition={0.08}
          shadow="0 0 10px #00FF8F,0 0 5px #00FF8F"
          showSpinner
          speed={200}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
