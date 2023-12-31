import Button from "@/components/Button";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import PageLayout from "@/components/layouts/PageLayout";
import Providers from "@/utils/provider";

const glysa = localFont({
  src: "../../public/fonts/Glysa.otf",
  variable: "--font-glysa",
});

const lexendDeca = localFont({
  src: "../../public/fonts/LexendDeca-VariableFont_wght.ttf",
  variable: "--font-lexend-deca",
});

export const metadata: Metadata = {
  title: "Contacts",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${glysa.variable} ${lexendDeca.variable}`}>
      <body className="bg-grey-100 text-white-primary mx-auto w-full min-h-screen">
        <Providers>
          <PageLayout>{children}</PageLayout>
          {modal}
        </Providers>
      </body>
    </html>
  );
}
