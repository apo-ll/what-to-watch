import { Urbanist } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/globalicons.css";

import { Slide } from "@/styles/slide";
import { MainNav } from "@/components/main-nav";
import { Providers } from "@/config/providers";


const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.className} bg-[#0e100f] text-white antialiased`}
      >
        <MainNav />
        <Providers>
            <Slide>{children}</Slide>
        </Providers>
      </body>
    </html>
  );
}
