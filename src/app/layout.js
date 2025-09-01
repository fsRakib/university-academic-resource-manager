import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { DataProvider } from "../context/DataContext";
import AuthProvider from "@/components/AuthProvider";
import { ResourceProvider } from "@/context/ResourceContext";

export const metadata = {
  title: "University Academic Resource Manager",
  description: "Academic resource management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-emerald-200 flex justify-center h-screen w-full overflow-hidden`}
      >
        <AuthProvider>
          <ResourceProvider>
            <DataProvider>{children}</DataProvider>
          </ResourceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
