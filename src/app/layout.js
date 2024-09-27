import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { DataProvider } from "../context/DataContext";
import { SessionProvider } from "next-auth/react";
import { ResourceProvider } from "@/context/ResourceContext";

export const metadata = {
  title: "Next App",
  description: "Generated by next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-emerald-200 flex justify-center h-screen w-full overflow-hidden`}
      >
        <SessionProvider>
          <ResourceProvider>
            <DataProvider>{children}</DataProvider>
          </ResourceProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
