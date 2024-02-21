import { Icons } from "./Icons";
import { navigation } from "@/config/homepage";
import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";

export const MainNav = () => {
  return (
    <>
      <MobileNav className="lg:hidden md:block flex f" />
      <main className="container lg:block px-5 md:hidden hidden">
        <div className="py-5 flex flex-row gap-[2rem] border-b border-gray-500 items-center justify-between">
          <Image src="/logo.svg" width={90} height={50} alt="logo" />
          <div className="text-xl  gap-[2rem] flex">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="text-white/50 hover:text-white hover:transition duration-300 hover:duration-300 transition ease-in-out hover:ease-in-out "
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
