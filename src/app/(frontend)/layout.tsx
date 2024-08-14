import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "../_shared/libs/styled-components/registry";
import MainContainer from "../_shared/components/Container";
import Header from "../_shared/components/Header/Header";
import { Footer } from "../_shared/components/Footer";
import { Toaster } from "react-hot-toast";
import { AuthWatcher } from "./auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rater",
  description: "Teste Técnico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#121212" }} className={inter.className}>
        <StyledComponentsRegistry>
          <Header />
          <MainContainer>{children}</MainContainer>
          <Footer />
          <Toaster />
          <AuthWatcher />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
