import { Geist, Geist_Mono, Orbitron, Poppins } from "next/font/google";
import { Poppins, Orbitron } from 'next/font/google';
import { Uncial_Antiqua } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const uncial_antiqua = Uncial_Antiqua({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-uncial_antiqua',
  weight: "400"
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${orbitron.variable} ${uncial_antiqua.variable} antialiased gradient`} >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
