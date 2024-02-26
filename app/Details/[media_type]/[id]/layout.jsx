
import { Urbanist } from "next/font/google";
import { Providers } from "@/config/providers";
import { Slide } from "@/styles/slide";



const urbanist = Urbanist({ subsets: ["latin"] });

export default function DetailsLayout({children}) {
    return (
        <section className={`${urbanist.className} bg-[#0e100f] text-white antialiased `}>
                {children}
        </section>
    );
}