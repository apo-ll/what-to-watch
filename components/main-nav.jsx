'use client'


import { navigation } from "@/config/homepage";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

export const MainNav = () => {
  /* Using usePathname hook*/
  const pathname = usePathname();

  return (
    <>
      <main className="container lg:block mb-10 md:hidden hidden text-white">
        <div className="py-5 flex flex-row gap-[2rem]  items-center justify-between">
          <div className="text-xl gap-[2rem] flex items-center">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`${
                  pathname === item.link
                    ? "text-white  px-[16px] py-[6px] bg-[#144056]/30 hover:bg-[#144056] hover:transition transition hover:duration-300 hover:ease-in-out rounded-full"
                    : "text-white hover:text-white/50 hover:transition transition hover:duration-300 hover:ease-in-out"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <Image src="/logo.svg" width={90} height={50} alt="logo" />
        </div>
      </main>
    </>
  );
};
