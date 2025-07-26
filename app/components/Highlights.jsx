"use client";
import gsap from "gsap";
import React, { use, useEffect } from "react";
import { rightImg, watchImg } from "../utils";
import { useGSAP } from "@gsap/react";
import VideoCareousel from "./VideoCareousel";

export default function Highlights() {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, y: 0 });
    gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
  }, []);

  return (
    <section
      id="highlight"
      className="overflow-hidden h-full common-padding bg-zinc-900"
    >
      <div className="screen-max-width ">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">
            Get The Highlights
          </h1>

          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watchImg" className="ml-2" />
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="rightImg" className="ml-2" />
            </p>
          </div>
        </div>

        <VideoCareousel />
      </div>
    </section>
  );
}
