import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/essentials/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";
import ErrorForWebSocket from "@/components/ErrorForWebSocket";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <ErrorForWebSocket></ErrorForWebSocket>
         
          {children}
        </body>
      </Providers>
    </html>
  );
}
