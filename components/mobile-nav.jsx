"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Icons } from "./Icons";
import { home } from "@/config/homepage";
import Link from "next/link";

export function MobileNav({ className }) {
  const container = useRef();
  let hello;
  useGSAP(
    (contextSafe) => {
      hello = gsap.fromTo(
        ".box",
        { x: "-100%" },
        { x: 0, duration: 0.5, paused: true, ease: "power2.inOut" },
      );
      return () => {
        hello.kill();
      };
    },
    { scope: container },
  );

  return (
    <div ref={container} className={className}>
      <div className="w-full  p-4 ">
        <div className="flex flex-row px-4 pt-4 items-center justify-between">
          <Icons.logo color="white" />
          <button
            onClick={() => hello.play()}
            className="border-2 px-4 py-1 rounded-full border-white hover:bg-white/20 hover:transition transition"
          >
            <h1 className="flex flex-row gap-2">
              Menu <Icons.menu className="fill-white" />
            </h1>
          </button>
        </div>
      </div>

      {/* Drawer */}

      <div className="box absolute  w-full h-full p-4 bg-white text-black rounded-xl">
        <div className="flex flex-row px-4 pt-4 justify-between">
          <Icons.logo color="black" />
          <button
            onClick={() => hello.reverse()}
            className="border-2 px-4 py-1 rounded-full border-black hover:bg-white/20 hover:transition transition"
          >
            <h1 className="flex flex-row gap-2">
              Menu <Icons.close className="fill-black" />
            </h1>
          </button>
        </div>
        <div className="flex flex-col font-medium text-lg gap-4 mt-4 px-4">
          {home.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={() => hello.reverse()}
              className="hover:text-black/50 hover:transition transition focus:underline focus:decoration-2"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
