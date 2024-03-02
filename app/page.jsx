import  HomeCarousel from "@/components/carousel-home";
import Image from "next/image";


export default function Home() {
  return (
    <>
    <main className="container">
      <div className="border-2 border-slate-50 w-full h-[600px] rounded-3xl mb-16">

      </div>
      <section className="flex flex-col gap-5 mb-20">
        <h1 className="text-2xl text-white ">Trending</h1>
        <HomeCarousel />
      </section>

      
    </main>
    </>
  )
}
